require('reflect-metadata');

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { GUARDS_METADATA } = require('@nestjs/common/constants');
const { ForbiddenException, UnauthorizedException } = require('@nestjs/common');
const { sign } = require('jsonwebtoken');
const { JwtAuthGuard } = require('../dist/common/auth/jwt-auth.guard');
const { ROLES_KEY } = require('../dist/common/auth/roles.decorator');
const { RolesGuard } = require('../dist/common/auth/roles.guard');
const { UserRole, UserStatus, JobStatus } = require('../dist/common/enums/domain.enums');
const { ApplicationsController } = require('../dist/modules/applications/applications.controller');
const { ApplicationsService } = require('../dist/modules/applications/applications.service');
const { HomeService } = require('../dist/modules/home/home.service');

function createExecutionContext(request) {
  return {
    switchToHttp: () => ({
      getRequest: () => request
    }),
    getHandler: () => undefined,
    getClass: () => undefined
  };
}

function createConfig(values) {
  return {
    get: (key) => values[key]
  };
}

function createRepo(initial = []) {
  const rows = [...initial];

  return {
    rows,
    create: (value) => value,
    findOne: async ({ where }) =>
      rows.find((row) => Object.entries(where).every(([key, value]) => row[key] === value)) || null,
    find: async () => rows,
    count: async () => rows.length,
    save: async (value) => {
      const row = { id: value.id || `id-${rows.length + 1}`, ...value };
      rows.push(row);
      return row;
    }
  };
}

test('JwtAuthGuard rejects missing bearer token and accepts signed access token', () => {
  const guard = new JwtAuthGuard(createConfig({ JWT_ACCESS_SECRET: 'test-access-secret' }));

  assert.throws(
    () => guard.canActivate(createExecutionContext({ headers: {} })),
    UnauthorizedException
  );

  const token = sign({ sub: 'user-1', email: 'admin@example.com', role: UserRole.ADMIN }, 'test-access-secret');
  const request = { headers: { authorization: `Bearer ${token}` } };

  assert.equal(guard.canActivate(createExecutionContext(request)), true);
  assert.equal(request.user.sub, 'user-1');
  assert.equal(request.user.role, UserRole.ADMIN);
});

test('RolesGuard blocks non-admin access to admin-only routes', () => {
  const reflector = {
    getAllAndOverride: () => [UserRole.ADMIN]
  };
  const guard = new RolesGuard(reflector);

  assert.throws(
    () => guard.canActivate(createExecutionContext({ user: { role: UserRole.CANDIDATE } })),
    ForbiddenException
  );

  assert.equal(guard.canActivate(createExecutionContext({ user: { role: UserRole.ADMIN } })), true);
});

test('application status endpoint is protected by jwt, roles guard, and admin/recruiter roles', () => {
  const handler = ApplicationsController.prototype.updateStatus;
  const guards = Reflect.getMetadata(GUARDS_METADATA, handler) || [];
  const roles = Reflect.getMetadata(ROLES_KEY, handler) || [];

  assert.ok(guards.includes(JwtAuthGuard));
  assert.ok(guards.includes(RolesGuard));
  assert.deepEqual(roles, [UserRole.ADMIN, UserRole.RECRUITER]);
});

test('application apply creates candidate, resume, application, notification, and audit rows', async () => {
  const jobRepo = createRepo([
    { id: 'job-1', title: 'Backend Developer', createdById: 'recruiter-1' }
  ]);
  const userRepo = createRepo();
  const candidateRepo = createRepo();
  const resumeRepo = createRepo();
  const applicationRepo = createRepo();
  const notificationRepo = createRepo();
  const auditLogRepo = createRepo();

  const service = new ApplicationsService(
    applicationRepo,
    jobRepo,
    userRepo,
    candidateRepo,
    resumeRepo,
    notificationRepo,
    auditLogRepo
  );

  const result = await service.create(
    {
      jobId: 'job-1',
      fullName: 'Nguyen Van A',
      email: 'a@example.com',
      phone: '0900000000',
      message: 'Interested'
    },
    {
      filename: 'cv.pdf',
      originalname: 'CV.pdf',
      mimetype: 'application/pdf',
      size: 1234
    }
  );

  assert.equal(result.message, 'Ứng tuyển thành công.');
  assert.equal(userRepo.rows[0].role, UserRole.CANDIDATE);
  assert.equal(userRepo.rows[0].status, UserStatus.ACTIVE);
  assert.equal(candidateRepo.rows.length, 1);
  assert.equal(resumeRepo.rows.length, 1);
  assert.equal(applicationRepo.rows.length, 1);
  assert.equal(notificationRepo.rows.length, 1);
  assert.equal(auditLogRepo.rows[0].action, 'application.create');
});

test('home-data combines static data with published jobs and live counts', async () => {
  const jobRepo = {
    find: async () => [
      {
        id: 'job-1',
        title: 'Backend Developer',
        status: JobStatus.PUBLISHED,
        companyId: 'company-1',
        company: { id: 'company-1', name: 'SHG', logoUrl: null },
        tags: [],
        requirements: [],
        benefits: []
      }
    ]
  };
  const companyRepo = {
    find: async () => [{ id: 'company-1', name: 'SHG', industry: 'HR', city: 'Ha Noi', logoUrl: null }]
  };
  const candidateRepo = {
    count: async () => 3
  };
  const jobsService = {
    mapPublicJob: (job) => ({ id: job.id, title: job.title })
  };

  const service = new HomeService(jobRepo, companyRepo, candidateRepo, jobsService);
  const result = await service.getHomeData();

  assert.equal(result.jobs.length, 1);
  assert.equal(result.jobs[0].title, 'Backend Developer');
  assert.equal(result.quickStats[0].value, '1+');
  assert.equal(result.quickStats[2].value, '3+');
});
