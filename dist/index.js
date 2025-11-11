"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const washerUpdateService_1 = require("./services/washerUpdateService");
function main() {
    const service = new washerUpdateService_1.WasherUpdateService("abc");
    console.log("Starting Washer Service");
    service.start();
}
main();
//# sourceMappingURL=index.js.map