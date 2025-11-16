import { Canvas, createCanvas } from "canvas";

const font = require("../../assets/font.json");

export class MatrixRenderer {

    private displayWidth: number;
    private displayHeight: number;
    private textPercentage: number;

    private textSpaceInPx: number;
    private iconSpaceInPx: number;

    constructor(displayWidth: number, displayHeight: number, textPercentage: number){
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.textPercentage = textPercentage;

        this.textSpaceInPx = displayWidth * (textPercentage * 0.01);

        this.iconSpaceInPx = this.displayWidth - this.textSpaceInPx;

        //this.convertHexCharToBinaryMatrixChar(font["COLON"]);

        this.convertWord("W");
    }

    private convertWord(word: string){
        
        const upperedWord: string = word.toUpperCase();

        Array.from(upperedWord).forEach((char: string) => {
            this.convertHexCharToBinaryMatrixChar(font[char.toUpperCase()]);
        });

    }

    private renderWordOnCanvas(){
        const canvas: Canvas = createCanvas(this.textSpaceInPx, this.displayHeight);
    }


    private convertHexCharToBinaryMatrixChar(hexChar: string[]){
        hexChar.forEach((char: string) => {
            console.log(this.convertHexToBinaryString(char));
        });
    }

    private convertHexToBinaryString(hexString: string): string{
        
        const resolvedNumber: number = parseInt(hexString, 16);

        let binaryString: string = resolvedNumber.toString(2);

        let prefixZeros: number = 0;

        if(binaryString.length < 8){
            prefixZeros = 8 - binaryString.length;
        }

        if(prefixZeros === 0){
            return binaryString;
        }

        for(let i: number = 0; i < prefixZeros; i++){

            let zero = 0;

            binaryString = zero + binaryString;
        }

        return binaryString;
    }

    

}