import { IsOptional, IsString } from 'class-validator';
import { StudentAddressEntity } from '../student-address.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class StudentAddressUpdateDto extends PickType(StudentAddressEntity, [
  'address_street',
  'address_number',
  'address_complement',
  'address_neighborhood',
  'address_city',
  'address_state',
]) {
  @ApiPropertyOptional({
    description: 'student address zip',
  })
  @IsString()
  @IsOptional()
  address_zip: string;
}
