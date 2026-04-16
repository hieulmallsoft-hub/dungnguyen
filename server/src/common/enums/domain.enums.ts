export enum UserRole {
  ADMIN = 'ADMIN',
  RECRUITER = 'RECRUITER',
  CANDIDATE = 'CANDIDATE'
}

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  PENDING = 'pending'
}

export enum CompanyMemberRole {
  OWNER = 'owner',
  HR = 'hr',
  RECRUITER = 'recruiter'
}

export enum CompanyStatus {
  VERIFIED = 'verified',
  PENDING = 'pending',
  REVIEW = 'review',
  FLAGGED = 'flagged',
  ARCHIVED = 'archived'
}

export enum CompanyPlan {
  STARTER = 'Starter',
  GROWTH = 'Growth',
  ENTERPRISE = 'Enterprise'
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  INTERN = 'intern',
  REMOTE = 'remote',
  SHIFT = 'shift',
  CONTRACT = 'contract'
}

export enum JobStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed'
}

export enum ExperienceLevel {
  NONE = 'none',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior'
}

export enum ApplicationStatus {
  APPLIED = 'applied',
  REVIEWING = 'reviewing',
  INTERVIEWED = 'interviewed',
  REJECTED = 'rejected',
  HIRED = 'hired'
}

export enum CandidateSkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum ReportSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum ReportStatus {
  OPEN = 'open',
  REVIEWING = 'reviewing',
  RESOLVED = 'resolved'
}
