import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetSingleNGODto {
    @IsInt()
    @Type(() => Number)
    id: number;
}
