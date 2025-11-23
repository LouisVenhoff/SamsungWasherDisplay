const hexToRgb = require("hex-to-rgb");

export default class Pixel{

    private hexValue: string;

    private r: number;
    private g: number;
    private b: number;

    constructor(hexValue: string){
        
        this.hexValue = hexValue;
        
        const converted:number[] = hexToRgb(hexValue);
        
        this.r = converted[0] ?? 0;
        this.g = converted[1] ?? 0;
        this.b = converted[2] ?? 0;
    
    }

    get hexColor() :string{
        return this.hexValue;
    }

    toRgbArray():number[]{
        return [this.r, this.g, this.b];
    }

    
    

}