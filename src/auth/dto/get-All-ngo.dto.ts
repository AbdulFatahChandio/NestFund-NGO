import { IsInt, IsNotEmpty } from "class-validator";

export class getAllNGODto{
    @IsInt()
    @IsNotEmpty()
    roleId:number
}