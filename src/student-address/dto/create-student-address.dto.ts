import { StudentAddressEntity } from '../student-address.entity';
import { PickType } from '@nestjs/swagger';

export class StudentAddressCreateDto extends PickType(StudentAddressEntity, [
  'studentId',
  'address_street',
  'address_number',
  'address_complement',
  'address_neighborhood',
  'address_city',
  'address_state',
  'address_zip',
]) {}
