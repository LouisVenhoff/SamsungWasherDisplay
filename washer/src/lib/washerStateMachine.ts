import { WashingDataDto } from "../dto/washingDataDto";

enum DisplayAttribute {
    remaining,
    temp,
    progress,
    phase
}

export default class WasherStateMachine {

    private data: WashingDataDto;

    private displayOrder:DisplayAttribute[] = [DisplayAttribute.remaining, DisplayAttribute.temp, DisplayAttribute.progress, DisplayAttribute.phase];

    private currentAttributeIndex = -1;

    constructor(data:WashingDataDto){
        this.data = data;
    }

    public next():string{
        if(this.currentAttributeIndex === this.displayOrder.length - 1){
            this.currentAttributeIndex = 0;
        }
        else{
            this.currentAttributeIndex++;
        }

        return this.format(this.displayOrder[this.currentAttributeIndex]!);
    }

    private format(attribute: DisplayAttribute):string{
        
        switch(attribute){
            case DisplayAttribute.remaining:
                return this.data.remaining;
            case DisplayAttribute.temp: 
                return `Temp: ${this.data.temp}`
            case DisplayAttribute.progress:
                return `${this.data.progress} %`
            case DisplayAttribute.phase:
                return this.data.phase;
        }
        
    }



}