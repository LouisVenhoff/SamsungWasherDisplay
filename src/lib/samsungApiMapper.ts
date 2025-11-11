import { WashingDataDto } from "../dto/washingDataDto";
import { IDataMapper } from "../interfaces/IDataMapper";

export class SamsungApiMapper implements IDataMapper{
    
    generateWashingDataDTO(input: string): WashingDataDto {
        const parsedJson = JSON.parse(input);

        const temp = parsedJson.main.washerWaterTemperature;

        return {temp: temp, program: "Test"}
    }
    
}