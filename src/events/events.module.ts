import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { EventGateway } from './events.gateway';
@Module({
  imports: [ConnectionModule],
  providers: [EventGateway],
})
export class EventsModule { }