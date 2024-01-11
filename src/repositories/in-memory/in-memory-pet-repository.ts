import { Prisma, Pet } from '@prisma/client';
import { randomUUID } from 'crypto';

import { PetRepository } from '../@types';

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      age: data.age,
      created_at: new Date(),
      dependency_level: data.dependency_level,
      description: data.description ? data.description : null,
      energy_level: data.energy_level,
      environment_type: data.environment_type,
      organization_id: data.organization_id,
      size: data.size,
      pictures: data.pictures ? data.pictures as string[] : [],
      requirements_for_adoption: data.requirements_for_adoption ? data.requirements_for_adoption as string[] : [],
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(pet_id: string): Promise<Pet | null> {
    const pet = this.pets.find(el => el.id === pet_id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findByOrganization(organization_id: string, page: number): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => {
      return pet.organization_id === organization_id;
    }).slice((page - 1) * 20, page * 20);

    return pets;
  }
}