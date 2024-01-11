import { OrganizationRepository } from '@/repositories/@types';
import { AuthenticateOrganizationParam, AuthenticateOrganizationResponse } from './@types';
import { InvalidCredentialsError } from './errors';
import { compare } from 'bcryptjs';

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) { }

  async exec(params: AuthenticateOrganizationParam): Promise<AuthenticateOrganizationResponse> {
    const { email, password } = params;

    const organization = await this.organizationRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await compare(password, organization.password_hash);

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}