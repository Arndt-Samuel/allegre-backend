import { Module } from '@nestjs/common';
import { FindAddressService } from './find-address.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [FindAddressService],
  exports: [FindAddressService],
})
export class FindAddressModule {}
