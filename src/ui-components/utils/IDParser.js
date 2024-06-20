/**
 * Class representing an ID parser.
 */
export default class IDObjectRDB {
    /**
     * Create an IDParser.
     * @param {string} id - The ID string to parse.
     * @throws Will throw an error if the ID format is invalid.
     */
    constructor(id) {
        this.id = id;
        this.regexRDB = /^(RDB)(.{5})(..)(.)(\d{5})$/;
        this.regexRHT = /^(RHT)(.{5})(.{3})(\d{5})$/;
        
        this.matchesRDB = this.id.match(this.regexRDB);
        this.matchesRHT = this.id.match(this.regexRHT);

        if (!this.matchesRDB && !this.matchesRHT) {
            throw new Error("Invalid ID format:", id);
        }
    }

    /**
     * Get the complete ID.
     * @return {string} The complete ID string.
     */
    get completeId() {
        return this.id;
    }

    /**
     * Get the source.
     * @return {string} The source part of the ID.
     */
    get source() {
        if (this.matchesRDB) {
            return this.matchesRDB[1];
        } else if (this.matchesRHT) {
            return this.matchesRHT[1];
        }
        return ""
    }

    /**
     * Get the organism.
     * @return {string} The organism part of the ID.
     */
    get organism() {
        if (this.matchesRDB) {
            return this.matchesRDB[2];
        } else if (this.matchesRHT) {
            return this.matchesRHT[2];
        }
        return ""
    }

    /**
     * Get the object type.
     * @return {string} The object type part of the ID.
     */
    get objectType() {
        if (this.matchesRDB) {
            return this.matchesRDB[3];
        } else if (this.matchesRHT) {
            return this.matchesRHT[3];
        }
        return ""
    }

    /**
     * Get the object source.
     * @return {string} The object source part of the ID.
     */
    get objectSource() {
        if (this.matchesRDB) {
            return this.matchesRDB[4];
        }
        return "";
    }

    /**
     * Get the identifier number.
     * @return {string} The identifier number part of the ID.
     */
    get identifierNumber() {
        if (this.matchesRDB) {
            return this.matchesRDB[5];
        } else if (this.matchesRHT) {
            return this.matchesRHT[4];
        }
        return ""
    }
}
/*
// Usage example
try {
    const id1 = "RDBECOLITFC00022";
    const parser1 = new IDObjectRDB(id1);
    console.log("Source:", parser1.source); // RDB
    console.log("Organism:", parser1.organism); // ECOLI
    console.log("Object Type:", parser1.objectType); // TF
    console.log("Object Source:", parser1.objectSource); // C
    console.log("Identifier Number:", parser1.identifierNumber); // 00022

    const id2 = "RHTECOLIRNP02416";
    const parser2 = new IDObjectRDB(id2);
    console.log("Source:", parser2.source); // RHT
    console.log("Organism:", parser2.organism); // ECOLI
    console.log("Object Type:", parser2.objectType); // RNP
    console.log("Object Source:", parser2.objectSource); // null
    console.log("Identifier Number:", parser2.identifierNumber); // 02416
} catch (error) {
    console.error(error.message);
}
    */
