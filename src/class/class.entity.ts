import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Class as ClassModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { OrganizationEntity } from 'src/organization/organization.entity';

export class ClassEntity implements ClassModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Class name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Class logo URL',
  })
  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({
    description: 'Class Organization UUID',
  })
  @IsUUID()
  organizationId: string;

  @ApiPropertyOptional({
    description: 'Class Organization Object',
    type: () => OrganizationEntity,
  })
  @IsOptional()
  @Type(() => OrganizationEntity)
  organization?: OrganizationEntity;
}
