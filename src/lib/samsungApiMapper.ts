import { WashingDataDto } from "../dto/washingDataDto";
import { IDataMapper } from "../interfaces/IDataMapper";

export class SamsungApiMapper implements IDataMapper{
    
    generateWashingDataDTO(input: any): WashingDataDto {
        
        const operatingState = input["samsungce.washerOperatingState"];
        const temp = input["custom.washerWaterTemperature"].washerWaterTemperature.value;
        const remaining = operatingState.remainingTimeStr.value;
        const progress = operatingState.progress.value;
        const phase = operatingState.washerJobPhase.value;
        const state = input.washerOperatingState.machineState.value;

    
        return {temp, remaining, progress, phase, state};
    }
    
}