import { Body, Controller, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("Role") // Group in Swagger UI
@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post("/create")
  @ApiOperation({ summary: "Create a new role" })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: "Role created successfully" })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }
}
