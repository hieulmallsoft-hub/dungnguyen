import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyMemberRole, CompanyPlan, CompanyStatus } from '../../common/enums/domain.enums';
import { UserEntity } from './user.entity';

@Entity({ name: 'companies' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ name: 'logo_url', type: 'varchar', nullable: true })
  logoUrl!: string | null;

  @Column({ type: 'varchar', nullable: true })
  website!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', nullable: true })
  address!: string | null;

  @Column({ type: 'varchar', nullable: true })
  city!: string | null;

  @Column({ type: 'varchar', nullable: true })
  industry!: string | null;

  @Column({ name: 'company_size', type: 'varchar', nullable: true })
  companySize!: string | null;

  @Column({ type: 'enum', enum: CompanyPlan, default: CompanyPlan.STARTER })
  plan!: CompanyPlan;

  @Column({ type: 'enum', enum: CompanyStatus, default: CompanyStatus.PENDING })
  status!: CompanyStatus;

  @Column({ name: 'created_by' })
  createdById!: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

@Entity({ name: 'company_members' })
export class CompanyMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'company_id' })
  companyId!: string;

  @ManyToOne(() => CompanyEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company!: CompanyEntity;

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ name: 'role_in_company', type: 'enum', enum: CompanyMemberRole })
  roleInCompany!: CompanyMemberRole;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
