import WebsocketApi from "../api/websocket/websocketApi";
import { PixelCommandDto } from "../dto/pixelCommandDto";
import { WashingDataDto } from "../dto/washingDataDto";
import WasherStateMachine from "./washerStateMachine";

export default class Display {

    private api: WebsocketApi;

    private displayInterval:NodeJS.Timeout | null = null;

    constructor(api: WebsocketApi){
        this.api = api;

        if(!this.api.isConnected){
            this.api.connect();
        }
    }

    public showWashingState(data: WashingDataDto){
        
        if(this.displayInterval){
            clearInterval(this.displayInterval);
            this.displayInterval = null;
        }
        
        const washerState:WasherStateMachine = new WasherStateMachine(data);

        this.displayInterval = setInterval(() => {
            const payload:PixelCommandDto = {
                command: "send_text",
                params: [
                    `text=${washerState.next()}`,
                    `animation=0`,
                    `speed=1`
                ]
            }
    
            this.api.send(payload);
        }, 8000);

    }


}