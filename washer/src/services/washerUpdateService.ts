import { SamsungWasherApi } from "../api/samsungApi";
import WebsocketApi from "../api/websocket/websocketApi";
import { WashingDataDto } from "../dto/washingDataDto";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { IWasherApi } from "../interfaces/IWasherApi";
import Display from "../lib/display";
import {Service} from "./service";

export class WasherUpdateService extends Service{
    
    private washerApi:IWasherApi;

    private display:Display;
    

    constructor(washerApi:IWasherApi, display: Display){
        super("0 * * * * *");

        this.washerApi = washerApi;

        this.display = display;
    }

    async doWork(): Promise<void> {
        let data: WashingDataDto = await this.washerApi.updateState();
        console.log(data);
        this.display.showWashingState(data);
    }

    

    
}