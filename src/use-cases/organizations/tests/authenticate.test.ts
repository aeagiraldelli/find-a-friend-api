import { OrganizationRepository } from '@/repositories/@types';
import { AuthenticateUseCase } from '../authenticate';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors';

describe('Authenticate use case test', () => {
  let organizationRepo: OrganizationRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    organizationRepo = new InMemoryOrganizationRepository();
    sut = new AuthenticateUseCase(organizationRepo);
  });

  it('should be able to authenticate', async () => {
    const email = 'petfriendly@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    await organizationRepo.create({
      address: 'Fake Address',
      cep: '11111-111',
      email,
      name: 'Pet Friendly',
      password_hash,
      whatsapp_phone: '11 11111-1111',
    });

    const { organization } = await sut.exec({ email, password });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.exec({ email: 'pet@email.com', password: '123456' }))
      .rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'petfriendly@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    await organizationRepo.create({
      address: 'Fake Address',
      cep: '11111-111',
      email,
      name: 'Pet Friendly',
      password_hash,
      whatsapp_phone: '11 11111-1111',
    });

    await expect(() => sut.exec({ email, password: '12345' }))
      .rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});