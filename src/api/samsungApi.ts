import axios, { AxiosResponse } from "axios";
import { IWasherApi } from "../interfaces/IWasherApi";

export class SamsungWasherApi implements IWasherApi{
    
    private apiToken:string;
    private deviceId:string;

    private queryUrl: string;
    
    constructor(apiToken:string, deviceId: string){
        this.apiToken = apiToken;
        this.deviceId = deviceId;

        this.queryUrl = this.generateQueryUrl(this.deviceId);
    }

    public async  updateState():Promise<string> {
        const rawData: string = await this.fetchWasherData();

        //console.log(rawData);

        return "";
    }

    private async fetchWasherData():Promise<string>{
        
        let result:AxiosResponse = await axios.get(this.queryUrl, {
            headers: {
                Authorization: `Bearer ${this.apiToken}`
            }
        })

        return result.data;
    }

    private generateQueryUrl(deviceId: string):string{
        return `https://api.smartthings.com/v1/devices/${deviceId}/status`;
    }

}