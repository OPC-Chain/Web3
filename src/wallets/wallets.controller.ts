import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewWalletDTO } from './dto/create-wallet.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';
// import { GetTagsDto, TagPaginator } from './dto/get-tags.dto';
import {
  NewWalletResponse,
  WalletList,
  WalletResult,
} from './dto/get-wallets.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() newWalletDTO: NewWalletDTO,
  ): Promise<NewWalletResponse> {
    return this.walletService.create(req.user.userId, newWalletDTO.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req): Promise<WalletList> {
    return this.walletService.getAll(req.user.userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagsService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagsService.update(+id, updateTagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagsService.remove(+id);
  // }
}
