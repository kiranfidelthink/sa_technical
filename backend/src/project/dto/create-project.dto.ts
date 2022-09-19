import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { project_state } from '../../shared/enum/common.enum'

export class CreateProjectDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty({ message: 'Name should not be empty.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'State should not be empty.' })
    @IsEnum(project_state, { message: "Project state can ony be 'Propose', 'Open', 'Close'." })
    state: project_state;

    @IsDate()
    @IsOptional()
    date?: Date;

    @IsArray()
    @IsNotEmpty({ message: 'Access should not be empty.' })
    permit?: string[];
}
