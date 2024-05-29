import { StudentAddressEntity } from '../student-address.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class StudentAddressFindDto extends IntersectionType(
  PaginationDto,
  PartialType(
    PickType(StudentAddressEntity, [
      'id',
      'studentId',
      'address_street',
      'address_neighborhood',
      'address_city',
      'address_state',
      'address_zip',
    ]),
  ),
) {}
