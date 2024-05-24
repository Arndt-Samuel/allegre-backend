import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentAddressEntity } from './student-address.entity';
import { FindAddressService } from 'src/find-address';
import { StudentAddressCreateDto, StudentAddressUpdateDto } from './dto';

@Injectable()
export class StudentAddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findAddressService: FindAddressService,
  ) {}

  async list(data: { studentId: string }): Promise<StudentAddressEntity[]> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentAddress.findMany({
      where: data,
    });
  }

  async create(data: StudentAddressCreateDto): Promise<StudentAddressEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    if (!data.address_zip) {
      throw new BadRequestException('ZIP is required');
    }

    const address = await this.findAddressService.getAddressByZip(
      data.address_zip,
    );
    data.address_street = address.logradouro;
    data.address_city = address.localidade;
    data.address_state = address.uf;
    data.address_neighborhood = address.bairro;

    return this.prisma.studentAddress.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentAddressUpdateDto,
  ): Promise<StudentAddressEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentAddress.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    if (data.address_zip) {
      const address = await this.findAddressService.getAddressByZip(
        data.address_zip,
      );
      data.address_street = address.logradouro;
      data.address_city = address.localidade;
      data.address_state = address.uf;
      data.address_neighborhood = address.bairro;
    }

    return this.prisma.studentAddress.update({
      where: { id },
      data,
    });
  }
}
