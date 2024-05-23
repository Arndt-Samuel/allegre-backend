import { IsOptional, IsString } from 'class-validator';
import { StudentStatusEntity } from '../student-status.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class StudentStatusUpdateDto extends PickType(StudentStatusEntity, [
  'familyScholarship',
  'perCapitaIncome',
  'benefitsReceived',
  'computerAndDigitalEquipment',
  'clothingSize',
  'shoeSize',
]) {
  @ApiPropertyOptional({
    description: 'Student family income',
  })
  @IsString()
  @IsOptional()
  familyIncome: string;

  @ApiPropertyOptional({
    description: 'The number of adult the student has is in the family',
  })
  @IsString()
  @IsOptional()
  numberOfAdultsInTheFamily: string;

  @ApiPropertyOptional({
    description: 'The number of children the student has is in the family',
  })
  @IsString()
  @IsOptional()
  numberOfChildrenInTheFamily: string;

  @ApiPropertyOptional({
    description: 'Number of family members of the student with college',
  })
  @IsString()
  @IsOptional()
  collegeEducatedFamilyMembers: string;
}
