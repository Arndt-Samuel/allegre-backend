import { ClassEntity } from '../class.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ClassUpdateDto extends PickType(ClassEntity, ['logoUrl']) {
  @ApiPropertyOptional({
    description: 'Class name',
  })
  @IsString()
  @IsOptional()
  name: string;
}
