import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SingInDto, SingInResponseDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated info',
    type: () => SingInResponseDto,
  })
  async singIn(
    @Body()
    data: SingInDto,
  ): Promise<SingInResponseDto> {
    return this.authService.signIn(data);
  }
}
