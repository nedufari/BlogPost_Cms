import { Controller,Post,Patch,Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { FinallyResetPasswordDto, Logindto, RequestOtpResendDto, SendPasswordResetLinkDto, VerifyOtpDto } from "src/common/common.dto";

@Controller('user')
export class UserController{
    adminservice: any;
    constructor(private readonly userservice:UserService){}

    @Post('/register')
    async Registeradmin(@Body()dto:CreateUserDto):Promise<{message:string}>{
        return await this.userservice.createUser(dto)
    }

    @Post('/verify-email')
    async Verify_email(@Body()dto:VerifyOtpDto):Promise<{isValid:boolean; accessToken:any}>{
        return await this.userservice.SuperAdminverifyEmail(dto)
    }

 

    @Post('/resend-verification-link')
    async resendVerificationLink(@Body()dto:RequestOtpResendDto):Promise<{message:string}>{
        return await this.userservice.ResendExpiredOtp(dto)

    }

    @Post('/send-password-reset-link')
    async sendPasswordResetLink (@Body()dto:SendPasswordResetLinkDto):Promise<{message:string}>{
        return await this.userservice.AdminsendPasswordResetLink(dto)
    }

    @Patch('/reset-password')
    async ResetPassword(@Body()dto:FinallyResetPasswordDto):Promise<{message:string}>{
        return await this.userservice.AdminfinallyResetPassword(dto)

    }

    @Post('/login')
    async Login(@Body()dto:Logindto){
        return await this.userservice.loginAdmin(dto)
    }


}