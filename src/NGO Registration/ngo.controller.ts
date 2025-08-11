import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { NGORegisterDto } from "./dto/ngo-registration.dto";
import { NGOService } from "./ngo.service";
import { JwtGuard } from "src/auth/Guard/jwt-guard";
import { RolesGuard } from "src/auth/Guard/roles-guard";
import { Roles } from "src/role/decorater/role.decorater";


@Controller('NGO')
export class NGOController {
    constructor(
        private ngoService: NGOService
    ) { }
    
    @Post('/registration')
    registerNGO(@Body() dto:NGORegisterDto){
        return this.ngoService.registerNGO(dto)
    }
}

