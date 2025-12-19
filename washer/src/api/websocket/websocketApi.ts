import WebSocket from "ws";
import { WashingDataDto } from "../../dto/washingDataDto";
import { PixelCommandDto } from "../../dto/pixelCommandDto";


export default class WebsocketApi 
{

    private host: string;
    private port: number;

    private socket: WebSocket | null = null;

    private connected: boolean = false;

    constructor(host: string, port: number){
        this.host = host;
        this.port = port;
    }

    public connect(){
        try {
            this.socket = new WebSocket(`${this.host}:${this.port}`);
        }catch{
            console.log("Connection Error!");
        };
        console.log("Got here!")
        if(!this.socket) return;

        this.socket.on("open", () => {
            console.log("Connected to Websocket Server!");
            this.connected = true;
        });

        this.socket.on("close", () => {
            this.connected = false;
        });


        this.socket.on("error", () => {
            console.log("Websocket Error!")
        })
    }

    public get isConnected():boolean{
        return this.connected;
    }

    public send(dto: PixelCommandDto){
        if(!this.connected){
            this.connect();
        }

        if(!this.socket) return;

        this.socket.send(JSON.stringify(dto));
    }


}