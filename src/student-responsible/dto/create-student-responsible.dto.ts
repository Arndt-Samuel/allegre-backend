import { StudentResponsibleEntity } from '../student-responsible.entity';
import { PickType } from '@nestjs/swagger';

export class StudentResponsibleCreateDto extends PickType(
  StudentResponsibleEntity,
  [
    'studentId',
    'name',
    'rg',
    'cpf',
    'nis',
    'gender',
    'ethnicity',
    'dateOfBirth',
    'birth_state',
    'born_city',
    'current_job',
    'primary_phone',
    'secondary_phone',
    'education_level',
  ],
) {}
