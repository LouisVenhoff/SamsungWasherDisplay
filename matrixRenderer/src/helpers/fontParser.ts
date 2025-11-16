export function convertHexCharToBinaryMatrixChar(hexChar: string[]): string[]{

    return hexChar.map((char) => {
        return convertHexToBinaryString(char);
    })
}

function convertHexToBinaryString(hexString: string): string{
    
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