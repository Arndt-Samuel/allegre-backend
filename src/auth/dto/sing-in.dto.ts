import { UserEntity } from 'src/user/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class SingInDto extends PickType(UserEntity, [
  'password',
  'email',
  'organizationId',
]) {}

export class SingInResponseDto {
  @ApiProperty({
    description: 'Authenticated user info',
    type: () => UserEntity,
  })
  user: UserEntity;

  @ApiProperty({
    description: 'JWT Access Token',
  })
  accessToken: string;
}
