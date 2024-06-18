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
        this.regex = /^(RDB)(.{5})(..)(.)(\d{5})$/;
        this.matches = this.id.match(this.regex);

        if (!this.matches) {
            throw new Error("Invalid ID format");
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
        return this.matches[1];
    }

    /**
     * Get the organism.
     * @return {string} The organism part of the ID.
     */
    get organism() {
        return this.matches[2];
    }

    /**
     * Get the object type.
     * @return {string} The object type part of the ID.
     */
    get objectType() {
        return this.matches[3];
    }

    /**
     * Get the object source.
     * @return {string} The object source part of the ID.
     */
    get objectSource() {
        return this.matches[4];
    }

    /**
     * Get the identifier number.
     * @return {string} The identifier number part of the ID.
     */
    get identifierNumber() {
        return this.matches[5];
    }
}

// Usage example
/*
try {
    const id = "RDBECOLITFC00022";
    const parser = new IDParser(id);

    console.log("Source:", parser.source); // RDB
    console.log("Organism:", parser.organism); // ECOLI
    console.log("Object Type:", parser.objectType); // TF
    console.log("Object Source:", parser.objectSource); // C
    console.log("Identifier Number:", parser.identifierNumber); // 00022
} catch (error) {
    console.error(error.message);
}
*/