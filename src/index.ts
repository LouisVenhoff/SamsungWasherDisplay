import { WasherUpdateService } from "./services/washerUpdateService";

function main(){
    const service:WasherUpdateService = new WasherUpdateService("abc");
    console.log("Starting Washer Service");
    service.start();
}

main();