import React, { useEffect, useState } from "react";
import { DataVerifier } from "../../../../../../components/ui-components";
import FilterTable from "../../../Table/filterTable";

async function processAuthorsDataCSV(authorData) {
    let columns = []
    let data = []
    let comments = []  // Store comments
    // Procesar las líneas de autorData y capturar los comentarios

    // try {
    //     let rows = authorData.split("\n");
    //
    //     rows.forEach((row) => {
    //         // Verificar si la línea es un comentario (comienza con '#')
    //         if (row.trim().startsWith('#')) {
    //             comments.push(row.trim()); // Almacenar el comentario
    //         } else {
    //             // Si no es un comentario, procesar normalmente
    //             if (rows.indexOf(row) === 0) { // Si es la primera fila, se consideran los nombres de las columnas
    //                 const columnsNames = row.split(",");
    //                 columnsNames.forEach((name, index) => {
    //                     if (DataVerifier.isValidString(name)) {
    //                         columns.push({ label: name.trim() });
    //                     } else {
    //                         columns.push({ label: "_" + index });
    //                     }
    //                 });
    //             } else {
    //                 // Procesar las filas de datos
    //                 const newData = {};
    //                 const cells = row.split(",");
    //                 cells.forEach((cell, index) => {
    //                     if (columns[index]?.label) {
    //                         newData[columns[index].label] = cell;
    //                     }
    //                 });
    //                 data.push(newData);
    //             }
    //         }
    //     });
    // } catch (error) {
    //     console.error("Error procesando los datos del autor:", error);
    // }
    //
    // // Retornar también los comentarios además de los datos de la tabla
    // return { columns, data, comments };
    // process columns

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
