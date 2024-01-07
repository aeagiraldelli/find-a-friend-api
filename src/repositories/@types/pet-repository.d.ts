import { Pet, Prisma } from '@prisma/client';

export interface PetRepository {
  create(data: Prisma.PetCreateInput, organization_id: string): Promise<Pet>;
  findById(pet_id: string): Promise<Pet | null>;
  findByOrganization(organization_id: string, page: number): Promise<Pet[]>
}