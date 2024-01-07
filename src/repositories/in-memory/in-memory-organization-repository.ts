import { Organization, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

import { OrganizationRepository } from '../@types';

export class InMemoryOrganizationRepository implements OrganizationRepository {

  private orgs: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org: Organization = {
      id: data.id ? data.id : randomUUID(),
      address: data.address,
      cep: data.cep,
      created_at: new Date(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      whatsapp_phone: data.whatsapp_phone
    };

    this.orgs.push(org);

    return org;
  }

  async findById(organization_id: string): Promise<Organization | null> {
    const org = this.orgs.find(el => el.id === organization_id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.orgs.find(org => org.email === email);

    if (!organization) {
      return null;
    }

    return organization;
  }
}