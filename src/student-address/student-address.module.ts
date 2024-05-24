import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentAddressService } from './student-address.service';
import { StudentAddressController } from './student-address.controller';
import { FindAddressModule } from 'src/find-address';

@Module({
  imports: [DatabaseModule, FindAddressModule],
  providers: [StudentAddressService],
  controllers: [StudentAddressController],
  exports: [StudentAddressService],
})
export class StudentAddressModule {}
