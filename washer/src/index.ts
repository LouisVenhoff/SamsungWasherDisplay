import { Rabbit } from "./api/rabbitmq/rabbit";
import { SamsungWasherApi } from "./api/samsungApi";
import { WasherUpdateService } from "./services/washerUpdateService";

function main(){
    
    const api:SamsungWasherApi = new SamsungWasherApi("bf28957f-a1f9-4e87-aead-87825f180f96", "0f3c924c-5b9d-1409-1658-d656eb9d1628");
    
    const rabbit:Rabbit = new Rabbit("washerStates");

    const service:WasherUpdateService = new WasherUpdateService(api, rabbit);
    console.log("Starting Washer Service");
    service.start();
}

main();