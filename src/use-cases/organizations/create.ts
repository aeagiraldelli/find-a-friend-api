import { hash } from 'bcryptjs';

import { OrganizationRepository } from '@/repositories/@types';
import { CreateOrganizationParams, CreateOrganizationResponse } from './@types';
import { EmailRegisteredError } from './errors';

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) { }

  async exec(params: CreateOrganizationParams): Promise<CreateOrganizationResponse> {
    const { address, cep, email, name, password, whatsapp_phone } = params;

    const registeredOrg = await this.organizationRepository.findByEmail(email);

    if (registeredOrg) {
      throw new EmailRegisteredError();
    }

    const passwordHash = await hash(password, 6);

    const organization = await this.organizationRepository.create({
      address,
      cep,
      email,
      name,
      whatsapp_phone,
      password_hash: passwordHash,
    });

    return { organization };
  }
}