import { WashingDataDto } from "../dto/washingDataDto";

export interface IDataMapper{
    
    generateWashingDataDTO(json: string): WashingDataDto;

}