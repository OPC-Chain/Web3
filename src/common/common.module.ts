import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from './common.service';
import { Configure, ConfigureSchema } from './schemas/configure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Configure.name, schema: ConfigureSchema },
    ]),
  ],
  controllers: [],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
