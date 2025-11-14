import { SamsungWasherApi } from "./api/samsungApi";
import { WasherUpdateService } from "./services/washerUpdateService";

function main(){
    
    const api:SamsungWasherApi = new SamsungWasherApi("664df564-47f3-4fdc-9fac-45cbacc2a99c", "0f3c924c-5b9d-1409-1658-d656eb9d1628");
    
    const service:WasherUpdateService = new WasherUpdateService(api);
    console.log("Starting Washer Service");
    service.start();
}

main();