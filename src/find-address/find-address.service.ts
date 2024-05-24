import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FindAddressService {
  private readonly urlCorreios: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.urlCorreios = this.configService.get<string>('URL_CEP_CORREIOS');
  }

  async getAddressByZip(zip: string): Promise<any> {
    const url = this.urlCorreios.replace('{ZIP}', zip);
    const response = await firstValueFrom(this.httpService.get(url));
    if (response.data.erro) {
      throw new BadRequestException('Invalid ZIP');
    }
    return response.data;
  }
}
