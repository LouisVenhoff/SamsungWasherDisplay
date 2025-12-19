import { Rabbit } from "./api/rabbitmq/rabbit";
import { SamsungWasherApi } from "./api/samsungApi";
import WebsocketApi from "./api/websocket/websocketApi";
import Display from "./lib/display";
import { WasherUpdateService } from "./services/washerUpdateService";

function main(){
    
    
    //const rabbit:Rabbit = new Rabbit("washerStates");
    
    //console.log("Starting Washer Service");
    //service.start();
    
    const samsungApi:SamsungWasherApi = new SamsungWasherApi("4c8f5dbe-470f-4cec-bd26-b11f46d1cf6d", "0f3c924c-5b9d-1409-1658-d656eb9d1628");
    
    const api = new WebsocketApi("ws://192.168.1.10", 4444);
    
    const display: Display = new Display(api);
    
    const service:WasherUpdateService = new WasherUpdateService(samsungApi, display);

    service.start();
    console.log("Ready");
}

main();