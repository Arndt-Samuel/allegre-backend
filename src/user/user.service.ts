import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserCreateDto } from './dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        organization: true,
      },
    });
  }

  async create(data: UserCreateDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  }
}
