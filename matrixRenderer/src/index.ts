import { RabbitReader } from "./api/rabbitmq/rabbitReader";
import { WashingDataDto } from "./dto/washingDataDto";
import { IMessageBrokerReader } from "./interfaces/IMessageBrokerReader";
import { MatrixRenderer } from "./lib/matrixRenderer";

async function main(){

    // const rabbit:IMessageBrokerReader<WashingDataDto> = new RabbitReader<WashingDataDto>();

    // await rabbit.connect();

    // await rabbit.subscribe("washerStates", (data: WashingDataDto) => {console.log(data.temp)});

    const renderer:MatrixRenderer = new MatrixRenderer(64, 16, 100);

}

main();