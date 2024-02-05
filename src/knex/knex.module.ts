import { Global, Module } from '@nestjs/common';
import { EcommerceProvider } from './eCommerceProvider';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EcommerceProvider],
  exports: [EcommerceProvider],
})
export class KnexModule {}
