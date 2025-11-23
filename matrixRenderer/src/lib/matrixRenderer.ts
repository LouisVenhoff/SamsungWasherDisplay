import { Canvas, createCanvas } from "canvas";
import { convertHexCharToBinaryMatrixChar } from "../helpers/fontParser";
import fs from "fs";
import Pixel from "../classes/pixel";
const hexToRgb = require("hex-to-rgb");

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

        //this.convertWord("Test");

        //this.convertSingleChar("T", "#3b4523");
        
        let pixels: Pixel[][] = this.convertWord("Hallo")

        this.renderCharOnCanvas(pixels);
    }

    private convertWord(word: string): Pixel[][] {
        
        const upperedWord: string = word.toUpperCase();

        let wordArray:Pixel[][][] = [];

        Array.from(upperedWord).forEach((char: string) => {
            wordArray.push(this.convertSingleChar(char, "#7483a6"));
        });

        
        let summarizedWord:Pixel[][] = this.summarizeCharArray(wordArray);


        return summarizedWord;

    }

    private convertSingleChar(char: string, color: string):Pixel[][]{
        let binaryChar:string[] = convertHexCharToBinaryMatrixChar(font[char]);

        console.log(binaryChar);

        let colorized: Pixel[][] = [];
        
        for(let i = 0; i < binaryChar.length; i++){
           
            let tempArr:Pixel[] = [];
           
            for(let j = 0; j < binaryChar[i]!.length; j++){
                if(binaryChar[i]![j]! === "1"){
                    tempArr.push(new Pixel(color));
                }
                else{
                    tempArr.push(new Pixel("#000000"));
                }
            }

            tempArr.push(new Pixel("#000000"));
            colorized.push(tempArr);
        }

        return colorized;
        
    }


    private summarizeCharArray(wordArr:Pixel[][][]):Pixel[][]{

        let result: Pixel[][] = Array.from({ length: 14 }, () => []);

        for(let i = 0; i < wordArr.length; i++){
            for(let j = 0; j < wordArr[i]!.length; j++){
                for(let k = 0; k < wordArr[i]![j]!.length; k++){
                    result[j]!.push(wordArr[i]![j]![k]!)
                }
            }
        }

        return result;

    }

    private renderCharOnCanvas(imageData: Pixel[][]){
        const canvas: Canvas = createCanvas(this.textSpaceInPx, this.displayHeight);

        const context = canvas.getContext("2d");

        const canvasData = context.createImageData(this.textSpaceInPx, this.displayHeight);

        let data: Uint8ClampedArray = canvasData.data;

        for(let i = 0; i < imageData.length; i++){
            for(let j = 0; j < imageData[i]!.length; j++){
                data = this.setPixel(data,  j, i, imageData[i]![j]!.hexColor);
            }
        }

        //data = this.setPixel(data, 4, 4, "#675423");

        context.putImageData(canvasData, 0, 0);

        const output = fs.createWriteStream("test.png");
        const imageStream = canvas.createPNGStream();

        imageStream.pipe(output);
        output.on("finish", () => {console.log("Ready!")});
        
    }

    private setPixel(canvasData: any, x: number, y: number, color: string){
        const index = (y * this.textSpaceInPx + x) * 4;

        console.log(hexToRgb(color)); //[255, 255, 255];

        const colorRgb: number[] = hexToRgb(color);

        canvasData[index] = colorRgb[0];
        canvasData[index + 1] = colorRgb[1];
        canvasData[index + 2] = colorRgb[2];
        canvasData[index + 3] = 255;

        return canvasData;
    }


    

    

}