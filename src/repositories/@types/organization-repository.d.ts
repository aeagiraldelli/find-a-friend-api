import { Organization, Prisma } from '@prisma/client';

export interface OrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findById(organization_id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
}