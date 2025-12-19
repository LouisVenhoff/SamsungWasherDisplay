import WebsocketApi from "../api/websocket/websocketApi";
import { PixelCommandDto } from "../dto/pixelCommandDto";
import { WashingDataDto } from "../dto/washingDataDto";

export default class Display {

    private api: WebsocketApi;

    constructor(api: WebsocketApi){
        this.api = api;

        if(!this.api.isConnected){
            this.api.connect();
        }
    }

    public showWashingState(data: WashingDataDto){
        
        const payload:PixelCommandDto = {
            command: "send_text",
            params: [
                `text=${data.remaining} Grad`,
                `animation=0`,
                `speed=1`
            ]
        }

        this.api.send(payload);
    }


}