import Format from './Format'
import MkSequence from './mkSequence'
import LinealSequence from './lineal'
import { MarkSequencePromoter } from './mkSequencePromoter'
import { MarkSequenceTerminator } from './mkSequenceTerminator'
import { MarkSequenceSimple } from './mkSequenceSimple'
import "./secuence.css"

const aminoColors = {
    // Nonpolar, Gray
    "A": {
        color: "rgb(206, 206, 206)",
        name: "Alanine",
        description: "Nonpolar, Gray"
    },
    "V": {
        color: "rgb(181, 181, 181)",
        name: "Valine",
        description: "Nonpolar, Gray"
    },
    "L": {
        color: "rgb(149, 149, 149)",
        name: "Leucine",
        description: "Nonpolar, Gray"
    },
    "I": {
        color: "rgb(122, 122, 122)",
        name: "Isoleucine",
        description: "Nonpolar, Gray"
    },
    "M": {
        color: "rgb(94, 94, 94)",
        name: "Methionine",
        description: "Nonpolar, Gray"
    },
    "F": {
        color: "rgb(64, 64, 64)",
        name: "Phenylalanine",
        description: "Nonpolar, Gray"
    },
    "W": {
        color: "rgb(29, 29, 29)",
        name: "Tryptophan",
        description: "Nonpolar, Gray"
    },

    // Special, Yellow and Brown
    "P": {
        color: "rgb(254, 215, 119)",
        name: "Proline",
        description: "Special, Yellow"
    },
    "G": {
        color: "rgb(142,82,4)",
        name: "Glycine",
        description: "Special, Brown"
    },

    // Polar uncharged, Green
    "S": {
        color: "rgb(184, 226, 177)",
        name: "Serine",
        description: "Polar uncharged, Green"
    },
    "T": {
        color: "rgb(144, 209, 141)",
        name: "Threonine",
        description: "Polar uncharged, Green"
    },
    "C": {
        color: "rgb(99, 187, 109)",
        name: "Cysteine",
        description: "Polar uncharged, Green"
    },
    "Y": {
        color: "rgb(56, 162, 86)",
        name: "Tyrosine",
        description: "Polar uncharged, Green"
    },
    "N": {
        color: "rgb(26, 131, 62)",
        name: "Asparagine",
        description: "Polar uncharged, Green"
    },
    "Q": {
        color: "rgb(0, 100, 40)",
        name: "Glutamine",
        description: "Polar uncharged, Green"
    },

    // Acidic, Red and Orange
    "D": {
        color: "rgb(252, 171, 142)",
        name: "Aspartic acid",
        description: "Acidic, Red"
    },
    "E": {
        color: "rgb(151, 11, 19)",
        name: "Glutamic acid",
        description: "Acidic, Dark Red"
    },

    // Basic, Light blue to dark blue
    "K": {
        color: "rgb(182, 212, 233)",
        name: "Lysine",
        description: "Basic, Light Blue"
    },
    "R": {
        color: "rgb(74, 151, 201)",
        name: "Arginine",
        description: "Basic, Blue"
    },
    "H": {
        color: "rgb(8, 73, 145)",
        name: "Histidine",
        description: "Basic, Dark Blue"
    }
}

const nucleColors = {
    "A": {
        color: "rgb(0, 255, 0)",
        name: "Adenine",
        description: "Purine, Light Green"
    },
    "T": {
        color: "rgb(255, 0, 0)",
        name: "Thymine",
        description: "Pyrimidine, Red"
    },
    "U": {
        color: "rgb(255, 0, 0)",
        name: "Uracil",
        description: "Pyrimidine, Red"
    },
    "G": {
        orange: "rgb(255, 165, 0)",
        color: "rgb(255, 255, 0)",
        mustard: "rgb(224, 176, 70)",
        name: "Guanine",
        description: "Purine, Orange"
    },
    "C": {
        color: "rgb(0, 0, 255)",
        name: "Cytosine",
        description: "Pyrimidine, Blue"
    },
    "N": {
        color: "rgb(150, 150, 150)",
        name: "Unknown",
        description: "Unknown, Gray"
    }
};


export function FastaSequence({
    id = "rdb_p_sequence",
    sequence,
    color = false,
    title = "",
    countItems = false,
    charactersPerLine = 60,
    type
}) {
    let formatSequence = new Format(sequence, title, { countItems: countItems })
    let colors = aminoColors;
    if (type === "nucleotid") {
        colors = nucleColors;
        console.log(type);
    }
    return (
        <p id={id} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getFastaFormat(
            { color: color, charactersPerLine: charactersPerLine }, colors) }} />
    )
}

export function GenebankSequence({
    id = "rdb_p_sequence",
    sequence,
    color = false,
    title = "",
    countItems = false,
    type
}) {
    let formatSequence = new Format(sequence, title, { countItems: countItems });
    let colors = aminoColors;
    if (type === "nucleotid") {
        colors = nucleColors;
        console.log(type);
    }
    return (
        <p id={id} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getGenebankFormat(
            { color: color }, colors) }} />
    )
}

export { MkSequence, LinealSequence, MarkSequencePromoter, MarkSequenceTerminator, MarkSequenceSimple, aminoColors }