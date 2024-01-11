import { Organization } from '@prisma/client';

export type AuthenticateOrganizationParam = {
  email: string;
  password: string;
}

export type AuthenticateOrganizationResponse = {
  organization: Organization
}