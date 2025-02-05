import DataVerifier from "../utils";

export const REDUCER_TYPES = {
    columnWidth: 0,
    setItems: 1,
    firstPage: 2,
    prevPage: 3,
    nextPage: 4,
    lastPage: 5,
    hideColumn: 6,
    updateData: 7,
    setFilter: 8,
    deleteFilter: 9,
}

export const FILTER = {
    TYPES: {
        //type: < text | number | section | onlyContent>,
        TEXT: 0,
        NUMBER: 1,
        SECTION: 3,
        ONLY_CONTENT: 4,
    },
    LOGIC_CONNECTOR: {
        OR: "OR",
        AND: "AND",
        NOT: "NOT",
    }
}

export function getCellValue(row, columnLabel) {
    if (typeof (row[columnLabel]) === "object") {
        if (row[columnLabel]?.props) {
            if (row[columnLabel].props?.value) {
                return row[columnLabel].props?.value
            } else {
                console.warn("cell react object has no value as a props");
            }
        }
    } else {
        return row[columnLabel]
    }
}