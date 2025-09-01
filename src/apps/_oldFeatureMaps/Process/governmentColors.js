import { getRandomBrightColorHex } from "./util";

export default function governmentLabelColor(type, value) {
    switch (type) {
        case "strand":
            return strandColorRule[value]
        case "score":
            return getRandomBrightColorHex()
        case "evidence":
            return "#FF00FF"
        case "sequence":
            return sequenceColorRule(value)
        case "type":
        case "startPosition":
        case "endPosition":
        case "identifier":
        case "additional":
        case "mapName":
        default:
            return getRandomBrightColorHex()
    }
}

const sequenceColorRule = (sequence) => {
    switch (sequence) {
        case "+":
            return "#00FA00"
        case "-":
            return "#FA0000"
        case "+-":
        case "-+":
            return "#0000FA"
        default:
            break;
    }
    const colors = {
        A: [255, 255, 0],   // Yellow
        T: [255, 0, 0],   // Red
        G: [0, 255, 0],     // Green
        C: [0, 0, 255],     // Blue
    };

    const totalBases = sequence.length;
    const counts = {
        A: (sequence.match(/A/gi) || []).length,
        T: (sequence.match(/T/gi) || []).length,
        G: (sequence.match(/G/gi) || []).length,
        C: (sequence.match(/C/gi) || []).length,
    };

    // Mezclar colores según proporciones
    let mixedColor = [0, 0, 0];
    for (const base in counts) {
        const proportion = counts[base] / totalBases;
        const baseColor = colors[base];
        mixedColor = mixedColor.map(
            (value, index) => value + baseColor[index] * proportion
        );
    }

    // Convertir RGB a formato hexadecimal
    const hexColor = mixedColor
        .map(value => Math.round(value).toString(16).padStart(2, "0"))
        .join("");

    return `#${hexColor}`;
}

const strandColorRule = {
    'both': "#295bff",
    'forward': "#29ff45",
    'reverse': "#9b29ff",
    'unknown': "#000000"
}