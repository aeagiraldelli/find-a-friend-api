import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { CreateOrganizationUseCase } from '../create';
import { EmailRegisteredError } from '../errors';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory';
import { OrganizationRepository } from '@/repositories/@types';

describe('Organization create use case', () => {
  let repository: OrganizationRepository;
  let sut: CreateOrganizationUseCase;

  beforeEach(() => {
    repository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationUseCase(repository);
  });

  it('should be able to create a organization', async () => {
    const { organization } = await sut.exec({
      address: 'Nome da rua',
      cep: '12345-678',
      email: 'org@email.com',
      name: 'Pet Friendly',
      password: '123456',
      whatsapp_phone: '+551111111111'
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.exec({
      address: 'Nome da rua',
      cep: '12345-678',
      email: 'org@email.com',
      name: 'Pet Friendly',
      password: '123456',
      whatsapp_phone: '+551111111111'
    });

    const isPwdHashed = await compare('123456', organization.password_hash);

    expect(isPwdHashed).toBe(true);
  });

  it('should not be able to register an orgranization with same e-mail twice', async () => {
    const organization = {
      address: 'Nome da rua',
      cep: '12345-678',
      email: 'org@email.com',
      name: 'Pet Friendly',
      password: '123456',
      whatsapp_phone: '+551111111111'
    };

    await sut.exec(organization);

    await expect(() => sut.exec(organization)).rejects.toBeInstanceOf(EmailRegisteredError);
  });
});