import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class MakeblogPostDto{
    @IsString()
    @IsOptional()
    @MaxLength(2000)
    @MinLength(20)
    blog:string

    @IsArray()
    @IsOptional()
    pictures:string[]
}


export class EditblogPostDto{
    @IsString()
    @IsOptional()
    @MaxLength(2000)
    @MinLength(20)
    blog:string

    @IsArray()
    @IsOptional()
    pictures:string[]
}

