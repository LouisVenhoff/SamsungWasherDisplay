import { SamsungWasherApi } from "./api/samsungApi";
import { WasherUpdateService } from "./services/washerUpdateService";

function main(){
    
    const api:SamsungWasherApi = new SamsungWasherApi("", "");
    
    const service:WasherUpdateService = new WasherUpdateService(api);
    console.log("Starting Washer Service");
    service.start();
}

main();