"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const samsungApi_1 = require("./api/samsungApi");
const washerUpdateService_1 = require("./services/washerUpdateService");
function main() {
    const api = new samsungApi_1.SamsungWasherApi("e1de97e0-1eaf-4ece-bc46-8b3dd2156217", "0f3c924c-5b9d-1409-1658-d656eb9d1628");
    const service = new washerUpdateService_1.WasherUpdateService(api);
    console.log("Starting Washer Service");
    service.start();
}
main();
//# sourceMappingURL=index.js.map