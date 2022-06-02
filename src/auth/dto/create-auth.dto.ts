import { PartialType, PickType } from '@nestjs/swagger';
import { CoreMutationOutput } from 'src/common/dto/core-mutation-output.dto';
// import { User } from 'src/users/entities/user.entity';
import { User } from 'src/users/schemas/user.schema';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
export class NewWalletDTO extends PickType(User, ['password']) {}

export class RestoreWalletDTO {
  password: string;
  passPhase: string;
}

export class LoginDto extends PartialType(
  PickType(User, ['UUID', 'password']),
) {}

export class SocialLoginDto {
  provider: string;
  access_token: string;
}
export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
export class ForgetPasswordDto {
  email: string;
}
export class VerifyForgetPasswordDto {
  email: string;
  token: string;
}
export class ResetPasswordDto {
  email: string;
  token: string;
  password: string;
}

export class NewAccResponse {
  statusCode: number;
  message?: string;
  UUID: string;
  token: string;
  numberWallets?: number;
}
export class CoreResponse extends CoreMutationOutput {}
export class VerifyOtpDto {
  otp_id: string;
  code: string;
  phone_number: string;
}
export class OtpResponse {
  id: string;
  message: string;
  success: boolean;
  phone_number: string;
  provider: string;
  is_contact_exist: boolean;
}
export class OtpDto {
  phone_number: string;
}
export class OtpLoginDto {
  otp_id: string;
  code: string;
  phone_number: string;
  name?: string;
  email?: string;
}
