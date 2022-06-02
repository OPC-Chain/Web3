import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { LoginDto, NewWalletDTO, NewAccResponse } from './dto/create-auth.dto';
import { WalletService } from 'src/wallets/wallets.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private readonly walletService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, walletService: WalletService);
    createWallet(newWallet: NewWalletDTO, restore?: string): Promise<NewAccResponse>;
    login(loginInput: LoginDto): Promise<NewAccResponse>;
    checkPassword(userId: string, password: string): Promise<true | {
        statusCode: number;
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map