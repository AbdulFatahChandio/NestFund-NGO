import { Body, Controller, Get, Patch, Post, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup-dto";
import { SignInDto } from "./dto/signin-dto";
import { RegisterNgoDto } from "./dto/ngo-registration.dto";
import { AuthGuard } from "@nestjs/passport";
import { updateNgoStatusDto } from "./dto/ngo-Status-Update.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto)
    }

    @Post('/signin')
    signin(@Body() dto: SignInDto) {
        return this.authService.signin(dto)
    }

    @Post('/register-ngo')
    registerNGO(@Body() dto: RegisterNgoDto) {
        return this.authService.registerNGO(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/get-all-ngo')
    getAllNGO() {
        return this.authService.getAllNGO()
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/update-ngo')
    updateNgoStatus(@Body() dto : updateNgoStatusDto) {
        return this.authService.updateNgoStatus(dto)
    }


}
