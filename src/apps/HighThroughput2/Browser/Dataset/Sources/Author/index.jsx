import React, { useEffect, useState } from "react";
import { DataVerifier } from "../../../../../../components/ui-components";
import FilterTable from "../../../Table/filterTable";

async function processAuthorsDataCSVOld(authorData) {
    let columns = []
    let data = []
    let comments = []  // Store comments
    // Procesar las líneas de autorData y capturar los comentarios
    console.log(authorData);
    let firstRowIndex = 0;
    try {
        const rows = authorData.split("\n");
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.includes('#')) {
                comments.push(row);
            } else {
                firstRowIndex = i;
                break;
            }
        }
        const firstRow = authorData.split("\n")[firstRowIndex];
        const columnsNames = firstRow.split(",")
        columnsNames.forEach((name,index) => {
            if (DataVerifier.isValidString(name)) {
                columns.push({label:name.trim()})
            }else{
                columns.push({label:"_"+index})
            }
        });
    } catch (error) {
        console.warn("error in process columns Author Data", error);
    }
    //process rowsData
    try {
        let rows = authorData.split("\n")
        rows.splice(0, firstRowIndex+1);
        rows.forEach((row) => {
            const newData = {}
            const cells = row.split(",")
            cells.forEach((cell,index) => {
                if (columns[index]?.label) {
                    newData[columns[index].label] = cell
                }
            });
            data.push(newData)
        });
    } catch (error) {
        console.error("error in process rows content Author Data", error);
    }


    return {columns, data, comments};
}

async function processAuthorsDataCSV(authorData) {
    let columns = [];
    let data = [];
    let comments = []; // Store comments

    let firstRowIndex = 0;
    try {
        const rows = authorData.split("\n");

        // Procesar las líneas de autorData y capturar los comentarios
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.includes('#')) {
                comments.push(row);
            } else {
                firstRowIndex = i;
                break;
            }
        }

        // Procesar la primera fila (cabecera) con el reemplazo de comas por punto y coma en valores entre comillas
        const firstRow = rows[firstRowIndex];
        const columnsNames = processFirstRow(firstRow);  // Usamos esta función para tratar la primera fila

        columnsNames.forEach((name, index) => {
            if (DataVerifier.isValidString(name)) {
                columns.push({ label: name.trim() });
            } else {
                columns.push({ label: "_" + index });
            }
        });
    } catch (error) {
        console.warn("error in process columns Author Data", error);
    }

    // Procesar las filas de datos
    try {
        let rows = authorData.split("\n");
        rows.splice(0, firstRowIndex + 1); // Eliminar las filas previas a los datos

        rows.forEach((row) => {
            const newData = {};
            const cells = row.split(",");
            cells.forEach((cell, index) => {
                if (columns[index]?.label) {
                    newData[columns[index].label] = cell;
                }
            });
            data.push(newData);
        });
    } catch (error) {
        console.error("error in process rows content Author Data", error);
    }

    return { columns, data, comments };
}

// Función para procesar la primera fila y sustituir comas por punto y coma dentro de las comillas
function processFirstRow(firstRow) {
    // Usamos una expresión regular para encontrar y reemplazar las comas dentro de las comillas por punto y coma
    const regex = /"([^"]*)"/g;
    let modifiedRow = firstRow;

    // Buscar todas las ocurrencias de texto entre comillas
    let match;
    while ((match = regex.exec(firstRow)) !== null) {
        // Reemplazar las comas dentro de las comillas por punto y coma
        const quotedText = match[0];
        const modifiedText = quotedText.replace(/,/g, ';');
        modifiedRow = modifiedRow.replace(quotedText, modifiedText);
    }

    // Dividir la fila modificada por comas
    return modifiedRow.split(",");
}

export default function Author({ data }) {
    const [table, setTable] = useState();

    useEffect(() => {
        processAuthorsDataCSV(data?.authorsData).then((table)=>{
            setTable(table)
        })
    }, [data])
    if (table) {
    return <FilterTable {...table} comments={table.comments} tableName="Author data"/>;
    }
    return <div>loading...</div>;
}
