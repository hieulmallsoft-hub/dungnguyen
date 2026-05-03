# Backend Database Schema

This backend uses PostgreSQL through TypeORM. The canonical schema is defined by
the entities exported from `src/database/entities/index.ts`.

For a clean production database, apply `migrations/0001_initial_schema.sql`
instead of enabling `TYPEORM_SYNCHRONIZE=true`.

## Required tables

These tables are required by the current API code:

| Table | Purpose |
| --- | --- |
| `users` | Login accounts, admin/recruiter/candidate roles |
| `refresh_tokens` | Refresh-token sessions |
| `audit_logs` | Admin and operational audit history |
| `companies` | Employer/company profiles |
| `company_members` | User-to-company membership links |
| `jobs` | Job postings |
| `job_categories` | Job category dictionary |
| `job_job_categories` | Job-to-category links |
| `skills` | Skill dictionary |
| `job_skills` | Job-to-skill links |
| `job_views` | Job view tracking |
| `saved_jobs` | Candidate saved jobs |
| `candidate_profiles` | Candidate profile records |
| `candidate_skills` | Candidate-to-skill links |
| `candidate_experiences` | Candidate work experience |
| `candidate_educations` | Candidate education records |
| `candidate_projects` | Candidate project records |
| `candidate_certificates` | Candidate certificate records |
| `resumes` | Uploaded or linked resume files |
| `applications` | Job applications |
| `conversations` | Candidate/recruiter conversations |
| `messages` | Conversation messages |
| `notifications` | User notifications |
| `reports` | Abuse/fraud/operational reports |

## Admin area

The current admin API does not use separate `admin_*` tables. Admin endpoints
read the main tables above and compute dashboard metrics at request time.

For example:

- `/api/admin/dashboard` reads `users`, `companies`, `jobs`, `applications`,
  `reports`, `audit_logs`, and `job_job_categories`.
- `/api/admin/users` reads `users`, `company_members`, and `candidate_profiles`.
- `/api/admin/jobs` reads `jobs`, `job_job_categories`, and `applications`.
- `/api/admin/categories` reads `job_categories`, `job_job_categories`, `jobs`,
  and `job_skills`.

## Legacy or unused tables

Tables with names such as `admin_jobs`, `admin_users`,
`admin_dashboard_metrics`, `admin_activity_feed`, and other `admin_*` tables are
not created or queried by this backend. They can exist in an imported database,
but they are legacy/unused for the current code.

Do not drop legacy tables from a shared or production database without a backup
and a final data check. If this project owns the database fully, the clean schema
is the required table list above.
