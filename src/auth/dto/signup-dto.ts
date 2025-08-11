import { IsEmail, IsInt, isInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  firstName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  lastName: string

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  userName: string

 @IsInt()
 @IsNotEmpty()
  roleId:number

}