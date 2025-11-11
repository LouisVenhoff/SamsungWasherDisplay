import { SamsungWasherApi } from "../api/samsungApi";
import { IWasherApi } from "../interfaces/IWasherApi";
import {Service} from "./service";

export class WasherUpdateService extends Service{
    
    private washerApi:IWasherApi;
    

    constructor(washerApi:IWasherApi){
        super("* * * * * *");

        this.washerApi = washerApi;
    }

    async doWork(): Promise<void> {
        let data: string = await this.washerApi.updateState();

        console.log(JSON.parse(data));
    }

    

    
}