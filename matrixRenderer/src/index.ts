import { RabbitReader } from "./api/rabbitmq/rabbitReader";
import { WashingDataDto } from "./dto/washingDataDto";
import { IMessageBrokerReader } from "./interfaces/IMessageBrokerReader";

async function main(){

    const rabbit:IMessageBrokerReader<WashingDataDto> = new RabbitReader<WashingDataDto>();

    await rabbit.connect();

    await rabbit.subscribe("washerStates", (data: WashingDataDto) => {console.log(data.temp)});

}

main();