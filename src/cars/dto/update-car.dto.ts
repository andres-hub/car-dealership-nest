import { IsOptional, IsString, IsUUID } from "class-validator"


export class UpdateCarDto{

    @IsString()
    @IsUUID()
    readonly id: string

    @IsString({message: 'The brand most be a cool straing'})
    @IsOptional()
    readonly brand?: string
   
    @IsString()
    @IsOptional()
    readonly model?: string

}