export default class Formats {

    constructor(sequence, title, options) {
        this.sequence = sequence.split('');
        this.size = sequence.length
        this.title = title
        if(options){
            this.countItems = options.countItems
        }
        
    }

    addAttributes(x, id, color = false) {
        const attributeColor = color ? `class="rdb_sequence_${x}"` : ''
        const attributeId = `id="${id}"`
        return `<span ${attributeId} ${attributeColor} >${x}</span>`
    }

    putColor(x) {
        switch (x) {
            case 'A':
                x = `<span class="rdb_sequence_A">${x}</span>`
                break;
            case 'C':
                x = `<span class="rdb_sequence_C">${x}</span>`
                break;
            case 'T':
                x = `<span class="rdb_sequence_T">${x}</span>`
                break;
            case 'G':
                x = `<span class="rdb_sequence_G">${x}</span>`
                break;
            case 'U':
                x = `<span class="rdb_sequence_U">${x}</span>`
                break;
            case 'a':
                x = `<span class="rdb_sequence_a">${x}</span>`
                break;
            case 'c':
                x = `<span class="rdb_sequence_c">${x}</span>`
                break;
            case 't':
                x = `<span class="rdb_sequence_t">${x}</span>`
                break;
            case 'g':
                x = `<span class="rdb_sequence_g">${x}</span>`
                break;
            case 'u':
                x = `<span class="rdb_sequence_u">${x}</span>`
                break;
            default:
                break;
        }
        return x
    }

    getInfoSequence() {
        let infoSequence = {
            elements: {},
            size: this.size,
            sequence: this.sequence,
            title: this.title
        }
        let elementRead = []
        this.sequence.forEach(x => {
            if (elementRead.find(el => el === x) === undefined) {
                let items = this.sequence.filter(y => y === x)
                infoSequence.elements[x] = items.length
            }
        });
        return infoSequence
    }

    getStrInfoSequence() {
        let infoSequence = this.getInfoSequence()
        let strInfoSequence = `size: ${infoSequence.size}`
        if(this.countItems){
            Object.keys(infoSequence.elements).forEach(x => {
                strInfoSequence += ` ${x}: ${infoSequence.elements[x]}`
            })
        }
        return strInfoSequence
    }

    getFastaFormat({ color = false, charactersPerLine = 60 }) {
        if(!Number.isInteger(charactersPerLine)){
            charactersPerLine = parseInt(charactersPerLine)
        }
        let count = 1
        let sequenceFormat = ''
        for (let index = 0; index < this.sequence.length; index++) {
            
            let x = this.sequence[index];
            if (color) {
                x = this.putColor(x)
            }
            if (count === charactersPerLine) {
                
                count = 0;
                sequenceFormat += `${x}<br>`
            } else {
                sequenceFormat += x;
            }
            count += 1
        }
        return `>${this.title}|${this.getStrInfoSequence()}<br>${sequenceFormat}`
    }

    getGenebankFormat({ color = false }) {
        const spaceNumber = this.size.toString().length
        let count = 0, innerCount = 0, line = ''
        let sequenceFormat = this.sequence.map((x, index) => {
            if (color) {
                x = this.putColor(x)
            }
            count += 1
            innerCount += 1
            line = ''
            if (count === 1) {
                // console.log(spaceNumber)
                for (let i = 0; i < spaceNumber - (index.toString().length); i++) {
                    line += "&nbsp;"
                }
                return `\t${line}${index + 1} ${x}`
            }
            if (count === 60) {
                count = 0;
                innerCount = 0
                return `${x}<br>`
            }
            if (innerCount === 10) {
                innerCount = 0
                return `${x} `
            }
            return x;
        }).join('')
        return `#${this.title};${this.getStrInfoSequence()}<br>${sequenceFormat}`
    }

    getLinealFormat({ sequenceId, color = false }) {
        let sequenceFormat = this.sequence.map((x, index) => {
            x = this.addAttributes(x, `sequence_${sequenceId}_item_${x}_${index}`, color)
            return x
        }).join('')
        return sequenceFormat
    }


}
