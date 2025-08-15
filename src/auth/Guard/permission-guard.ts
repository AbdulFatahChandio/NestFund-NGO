import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>(
            
            "permissions",
            context.getHandler()
        );
        console.log('requiredPermissions', requiredPermissions)
        
        if (!requiredPermissions) {
            return true; 
        }
        
        const request = context.switchToHttp().getRequest();
        console.log('request', request)
        const user = request.user; 
        
       
        if (!user?.role?.RolePermission) {
            return false;
        }
        
       
        const hasPermission = requiredPermissions.some((perm) =>
            user.role.RolePermission.some(
                (rp) => rp.permission.key === perm 
            )
        );
        
        return hasPermission;
    }
}
