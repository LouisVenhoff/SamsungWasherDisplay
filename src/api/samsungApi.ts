import axios, { AxiosResponse } from "axios";
import { IWasherApi } from "../interfaces/IWasherApi";
import { SamsungApiMapper } from "../lib/samsungApiMapper";
import { IDataMapper } from "../interfaces/IDataMapper";
import { WashingDataDto } from "../dto/washingDataDto";

export class SamsungWasherApi implements IWasherApi{
    
    private apiToken:string;
    private deviceId:string;

    private queryUrl: string;

    private mapper: IDataMapper = new SamsungApiMapper();
    
    constructor(apiToken:string, deviceId: string){
        this.apiToken = apiToken;
        this.deviceId = deviceId;

        this.queryUrl = this.generateQueryUrl(this.deviceId);
    }

    public async  updateState():Promise<WashingDataDto> {
        const rawData: any = await this.fetchWasherData();

        return this.mapper.generateWashingDataDTO(rawData);
    }

    private async fetchWasherData():Promise<any>{
        
        let result:AxiosResponse = await axios.get(this.queryUrl, {
            headers: {
                Authorization: `Bearer ${this.apiToken}`
            }
        })

        return result.data;
    }

    private generateQueryUrl(deviceId: string):string{
        return `https://api.smartthings.com/v1/devices/${deviceId}/components/main/status`;
    }

}