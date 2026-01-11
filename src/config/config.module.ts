import { Module } from '@nestjs/common';
import { EnvModule } from './env.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [EnvModule, DatabaseModule],
})
export class AppConfigModule {}
