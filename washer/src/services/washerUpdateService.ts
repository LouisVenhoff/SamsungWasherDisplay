import { SamsungWasherApi } from "../api/samsungApi";
import { WashingDataDto } from "../dto/washingDataDto";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { IWasherApi } from "../interfaces/IWasherApi";
import {Service} from "./service";

export class WasherUpdateService extends Service{
    
    private washerApi:IWasherApi;

    private broker:IMessageBroker;
    

    constructor(washerApi:IWasherApi, broker:IMessageBroker){
        super("0 * * * * *");

        this.washerApi = washerApi;

        this.broker = broker;
    }

    async doWork(): Promise<void> {
        let data: WashingDataDto = await this.washerApi.updateState();
        
        if(!this.broker.isConnected){
            await this.broker.connect();
        }

        this.broker.publish(JSON.stringify(data));
    }

    

    
}