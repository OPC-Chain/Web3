import { CoreMutationOutput } from 'src/common/dto/core-mutation-output.dto';
import { User } from 'src/users/schemas/user.schema';
declare const NewWalletDTO_base: import("@nestjs/common").Type<Pick<User, "password">>;
export declare class NewWalletDTO extends NewWalletDTO_base {
}
export declare class RestoreWalletDTO {
    password: string;
    passPhase: string;
}
declare const LoginDto_base: import("@nestjs/common").Type<Partial<Pick<User, keyof User>>>;
export declare class LoginDto extends LoginDto_base {
}
export declare class SocialLoginDto {
    provider: string;
    access_token: string;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare class ForgetPasswordDto {
    email: string;
}
export declare class VerifyForgetPasswordDto {
    email: string;
    token: string;
}
export declare class ResetPasswordDto {
    email: string;
    token: string;
    password: string;
}
export declare class NewAccResponse {
    statusCode: number;
    message?: string;
    UUID: string;
    token: string;
    numberWallets?: number;
}
export declare class CoreResponse extends CoreMutationOutput {
}
export declare class VerifyOtpDto {
    otp_id: string;
    code: string;
    phone_number: string;
}
export declare class OtpResponse {
    id: string;
    message: string;
    success: boolean;
    phone_number: string;
    provider: string;
    is_contact_exist: boolean;
}
export declare class OtpDto {
    phone_number: string;
}
export declare class OtpLoginDto {
    otp_id: string;
    code: string;
    phone_number: string;
    name?: string;
    email?: string;
}
export {};
//# sourceMappingURL=create-auth.dto.d.ts.map