import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup-dto";
import { SignInDto } from "./dto/signin-dto";
import { RegisterNgoDto } from "./dto/ngo-registration.dto";
import { AuthGuard } from "@nestjs/passport";
import { updateNgoStatusDto } from "./dto/ngo-Status-Update.dto";
import { GetUser } from "./decorater/get-user.decorater";
import * as client from "@prisma/client";
import { PermissionsGuard } from "./Guard/permission-guard";
import { Permissions } from "./decorater/can-permission.decorater";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Auth") // Group name in Swagger UI
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  @ApiOperation({ summary: "User Signup" })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post("/signin")
  @ApiOperation({ summary: "User Signin" })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: "User successfully signed in" })
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Post("/register-ngo")
  @ApiOperation({ summary: "Register NGO" })
  @ApiBody({ type: RegisterNgoDto })
  @ApiResponse({ status: 201, description: "NGO successfully registered" })
  registerNGO(@Body() dto: RegisterNgoDto) {
    return this.authService.registerNGO(dto);
  }

  @Get("/get-all-ngo")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions("ngo-read")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all NGOs" })
  @ApiResponse({ status: 200, description: "List of all NGOs" })
  getAllNGO() {
    return this.authService.getAllNGO();
  }

  @Get("/findMe")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current logged-in user" })
  @ApiResponse({ status: 200, description: "Current user data" })
  findMe(@GetUser() currentUser: client.User) {
    return this.authService.findMe(currentUser);
  }

  @Patch("/update-ngo")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update NGO Status" })
  @ApiBody({ type: updateNgoStatusDto })
  @ApiResponse({ status: 200, description: "NGO status updated successfully" })
  updateNgoStatus(@Body() dto: updateNgoStatusDto) {
    return this.authService.updateNgoStatus(dto);
  }
}
