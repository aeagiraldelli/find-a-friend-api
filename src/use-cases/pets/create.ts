import { PetRepository } from '@/repositories/@types';
import { CreatePetUseCaseParams, CreatePetUseCaseResponse } from './@types/create';

export class CreatePetUseCase {

  constructor(private petRepository: PetRepository) { }

  async exec(params: CreatePetUseCaseParams): Promise<CreatePetUseCaseResponse> {
    const { age, dependencyLevel,
      energyLevel, environmentType,
      name, organizationId, pictures,
      requirementsForAdoption, size,
      description } = params;

    const pet = await this.petRepository.create({
      age,
      dependency_level: dependencyLevel,
      energy_level: energyLevel,
      environment_type: environmentType,
      name,
      size,
      description,
      pictures,
      requirements_for_adoption: requirementsForAdoption,
      organization_id: organizationId,
    });

    return { pet };
  }
}