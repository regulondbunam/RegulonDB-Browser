import { DataVerifier } from "ui-components/utils";
import { parse } from "papaparse";

export function processAuthorsData(authorsData = []) {
    let tableData = { columns: [], data: [] }
    if (DataVerifier.isValidString(authorsData)) {
        const { data, meta } = parse(authorsData, { header: true });
        if (DataVerifier.isValidArray(data) && DataVerifier.isValidArray(meta.fields)) {
            tableData.columns = processColumns(meta.fields)
            tableData.data = data
        }
    }
    return tableData
}

function processColumns(fields=[]){
    return fields.map(field=>(
        {
            label:field,
        }
    ))
}