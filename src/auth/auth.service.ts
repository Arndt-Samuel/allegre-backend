import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SingInDto, SingInResponseDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(data: SingInDto): Promise<SingInResponseDto> {
    const user = await this.userService.findByEmail(
      data.email,
      data.organizationId,
    );
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = {
      id: user.id,
      organizationId: user.organizationId,
      role: user.role,
    };

    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
