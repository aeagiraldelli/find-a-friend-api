import { Organization } from '@prisma/client';

export type CreateOrganizationParams = {
  name: string;
  email: string;
  cep: string;
  address: string;
  whatsapp_phone: string;
  password: string;
}

export type CreateOrganizationResponse = {
  organization: Organization;
}