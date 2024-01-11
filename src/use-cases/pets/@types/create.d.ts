import {
  EnvironmentType, Pet, PetAge,
  PetDependencyLevel, PetEnergyLevel, PetSize
} from '@prisma/client';

export type CreatePetUseCaseParams = {
  name: string;
  description?: string;
  age: PetAge;
  size: PetSize;
  energyLevel: PetEnergyLevel;
  dependencyLevel: PetDependencyLevel;
  environmentType: EnvironmentType;
  pictures: string[];
  requirementsForAdoption: string[];
  organizationId: string;
}

export type CreatePetUseCaseResponse = {
  pet: Pet
}