import { StudentStatusEntity } from '../student-status.entity';
import { PickType } from '@nestjs/swagger';

export class StudentStatusCreateDto extends PickType(StudentStatusEntity, [
  'studentId',
  'familyIncome',
  'familyScholarship',
  'numberOfAdultsInTheFamily',
  'numberOfChildrenInTheFamily',
  'perCapitaIncome',
  'collegeEducatedFamilyMembers',
  'benefitsReceived',
  'computerAndDigitalEquipment',
  'clothingSize',
  'shoeSize',
]) {}
