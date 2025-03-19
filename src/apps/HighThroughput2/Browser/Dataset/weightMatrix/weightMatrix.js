import React, { useState, useEffect } from 'react';
import {DataVerifier} from "../../../../../components/ui-components";
import FilterTable from "../../Table/filterTable";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {Typography} from "@mui/material";


async function processDataCSV(textData) {
    let columns = []
    let data = []
    let comments = []  // Store comments
    // Procesar las líneas de autorData y capturar los comentarios

    let firstRowIndex = 0;
    try {
        const rows = textData.split("\n");
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.includes('#')) {
                comments.push(row);
            } else {
                firstRowIndex = i;
                break;
            }
        }
        const firstRow = textData.split("\n")[firstRowIndex];
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
        let rows = textData.split("\n")
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

const WeightComponent = ({ fileName }) => {
    const [csvData, setCsvData] = useState(null);
    const [imageSrc, setImageSrc] = useState('');

    const tfName = fileName;

    fileName = fileName.charAt(0).toLowerCase() + fileName.slice(1)
    console.log("imageUrl:", fileName);

    useEffect(() => {
        // Construir la URL de la imagen y CSV basados en el fileName
        const imageUrl = `https://regulondbdata.ccg.unam.mx/ht/galagan/weight_matrices/${fileName}_WM.png`;
        // const csvUrl = `https://regulondbdata.ccg.unam.mx/ht/galagan/weight_matrices/${fileName}_WM.csv`;
        const csvUrl = `${process.env.PUBLIC_URL}/media/raw/datasets/galagan_chip_seq/all_weight_matrices/${fileName}_WM.csv`;

        // Establecer la URL de la imagen
        setImageSrc(imageUrl);

        console.log(csvUrl);
        // Cargar el CSV como texto
        const fetchCsvData = async () => {
            try {
                const response = await fetch(csvUrl);
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo CSV');
                }
                let text = await response.text();
                text = '●'+text;
                setCsvData(text);
            } catch (error) {
                console.error('Error al cargar CSV:', error);
            }
        };

        fetchCsvData();
    }, [fileName]); // Solo se ejecuta si fileName cambia

    const [table, setTable] = useState();

    useEffect(() => {
        processDataCSV(csvData).then((table)=>{
            setTable(table)
        })
    }, [csvData])

    const [expanded, setExpanded] = useState(true);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <h2>WEIGHT MATRIX</h2>
            <Accordion
                expanded={expanded}
                onChange={handleAccordionChange}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant={"body1"} style={{ fontWeight: "bold" }}>{tfName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px'}}>
                        {/* Imagen */}
                        <img
                            src={imageSrc}
                            alt="Weight Matrix logo"
                            style={{
                                width: 'auto',
                                maxWidth: '100%',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                display: 'block', // asegura que no haya espacio extra alrededor
                                margin: '0 auto 0 0' // alinea a la izquierda
                            }}
                        />
                        {/* CSV */}
                        <div style={{ overflowX: 'auto' }}>
                            <FilterTable {...table} tableName="Weight Matrix"/>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default WeightComponent;

