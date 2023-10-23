import { IsString, IsUrl, IsOptional, Length } from 'class-validator';

export class OrganizationCreateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @Length(14)
  @IsString()
  cnpj: string;

  @Length(13)
  @IsOptional()
  @IsString()
  phone: string;
}
