import { WashingDataDto } from "../dto/washingDataDto";

export interface IWasherApi{

    updateState(): Promise<WashingDataDto>;

}