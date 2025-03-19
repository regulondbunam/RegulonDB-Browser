import {CIRCLE} from './symbols'

/**
 * @description  The `FM_COLUMNS` constant is defining an object that serves as a mapping for the columns in a feature map data structure. Each key in the object represents a specific column in the feature map data, and the corresponding value is the index of that column in the data structure. 
 */
export const FM_COLUMNS = { //FEATURE_MAPS_COLUMNS
    mapName: 0, //is a track name
    type: 1,
    identifier: 2,
    strand: 3,
    startPosition: 4,
    endPosition: 5,
    sequence: 6,
    score: 7,
    evidence:8,
    additional: 9
}

export const SCHEMA_FEATURE = {
    "id": "",
    "type": "",
    "label": "",
    "strand": "",
    "leftEndPosition": 0,
    "rightEndPosition": 0,
    "sequence": "",
    "score": 0,
    "evidence": "", //s->strong w->week c->confirmed
    "additional": ""
}

export const SCHEMA_TRACK = {
    "id": "---",
    "type": "",
    "name": "--",
    "SEQ_START": 0,
    "SEQ_END": 0,
    "features": []
}

export function convertStrand(strandSymbol) {
    switch (strandSymbol) {
        case 'DR':
        case 'both':
            return 'both';
        case 'R':
        case 'reverse':
            return 'reverse';
        case 'D':
        case 'forward':
            return 'forward';
        default:
            console.error('strand type unknown: ', strandSymbol);
            return 'unknown';
    }
}

export function toNumber(strNum) {
    let num = 0
    try {
        num = Number(strNum)
    } catch (error) {
        console.error("is no a number:", strNum);
        return 0
    }
    if (!num) {
        return 0;
    }
    if (num === null) {
        return 0;
    }
    if (isNaN(num)) {
        return 0;
    }
    if (Number.isInteger) {
        if (!Number.isSafeInteger) {
            console.error("no safe Integer", num);
            return 0;
        }
    }
    return num;
}

export function getRandomSymbol(){
    return CIRCLE
}

export function getRandomPastelColorHex() {
    const r = Math.floor(Math.random() * 128 + 127); // Rango de 127 a 255
    const g = Math.floor(Math.random() * 128 + 127); // Rango de 127 a 255
    const b = Math.floor(Math.random() * 128 + 127); // Rango de 127 a 255

    // Convertir a formato hexadecimal
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    return hex;
}

export function getRandomBrightColorHex() {
    const r = Math.floor(Math.random() * 256); // Rango de 0 a 255
    const g = Math.floor(Math.random() * 256); // Rango de 0 a 255
    const b = Math.floor(Math.random() * 256); // Rango de 0 a 255

    // Convertir a formato hexadecimal
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    return hex;
}





