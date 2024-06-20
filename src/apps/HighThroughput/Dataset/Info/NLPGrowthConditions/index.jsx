import React, { useMemo } from 'react'
import { DataVerifier } from '../../../../../components/ui-components'
import Typography from '@mui/material/Typography';
import { useGetNLPGrowthConditionById } from '../../../../../regulondb-ws/queries';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: "rgb(243, 220, 171)",
}));


export default function NLPGrowthConditions({ datasetId }) {
    const { NLPGrowthConditions } = useGetNLPGrowthConditionById(datasetId)
    let information = useMemo(() => {
        if (!NLPGrowthConditions) {
            return null
        }
        let inf = []
        //inf.push({title:"",data:""});
        if (NLPGrowthConditions?.additionalProperties.length > 0) {
            NLPGrowthConditions?.additionalProperties.forEach(property => {
                inf.push({ title: property.name, data: property.value });
            });
        }
        NLPGrowthConditions?.aeration.length > 0 && inf.push({ title: "Aeration", data: NLPGrowthConditions?.aeration });
        NLPGrowthConditions?.aerationSpeed.length > 0 && inf.push({ title: "Aeration Speed", data: NLPGrowthConditions?.aerationSpeed });
        NLPGrowthConditions?.geneticBackground.length > 0 && inf.push({ title: "Genetic Background", data: NLPGrowthConditions?.geneticBackground });
        NLPGrowthConditions?.growthPhase.length > 0 && inf.push({ title: "Growth Phase", data: NLPGrowthConditions?.growthPhase });
        NLPGrowthConditions?.growthRate.length > 0 && inf.push({ title: "Growth Rate", data: NLPGrowthConditions?.growthRate });
        NLPGrowthConditions?.medium.length > 0 && inf.push({ title: "Medium", data: NLPGrowthConditions?.medium });
        NLPGrowthConditions?.mediumSupplements.length > 0 && inf.push({ title: "Medium Supplements", data: NLPGrowthConditions?.mediumSupplements });
        NLPGrowthConditions?.opticalDensity.length > 0 && inf.push({ title: "Optical Density", data: NLPGrowthConditions?.opticalDensity });
        NLPGrowthConditions?.organism.length > 0 && inf.push({ title: "Organism", data: NLPGrowthConditions?.organism });
        NLPGrowthConditions?.ph.length > 0 && inf.push({ title: "PH", data: NLPGrowthConditions?.ph });
        NLPGrowthConditions?.temperature.length > 0 && inf.push({ title: "Temperature", data: NLPGrowthConditions?.temperature });
        NLPGrowthConditions?.pressure.length > 0 && inf.push({ title: "Pressure", data: NLPGrowthConditions?.pressure });
        NLPGrowthConditions?.vesselType.length > 0 && inf.push({ title: "Vessel Type", data: NLPGrowthConditions?.vesselType });
        return inf;
    }, [NLPGrowthConditions])
    if (!NLPGrowthConditions || !DataVerifier.isValidArray(information)) {
        return null
    }
    return (
        <div>
            <br />
            <Typography variant="h2" sx={{ fontSize: "22px" }}>
                NLP Growth Conditions
            </Typography>
            <div style={{marginLeft: "15px"}} >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                {
                    information.map((inf, j) => {
                        return (
                            <Item elevation={0} square key={`table_nlpGC${j}_${inf.title}`} >
                                <Typography variant="h3" sx={{ fontSize: "20px" }}>
                                    {inf.title}
                                </Typography>
                                <table style={{ tableLayout: "fixed", width: "auto" }} >
                                    <thead>
                                        <tr>
                                            <th>Value</th>
                                            <th>Field</th>
                                            <th>Score</th>
                                            <th>Sentence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            inf.data.map((gc, i) => {
                                                return (
                                                    <React.Fragment key={`tableBody_nlpgc_${i}_${j}_${inf.title}_${gc.value}`} >
                                                        <tr >
                                                            <td>{gc.value}</td>
                                                            <td>{gc.nameField}</td>
                                                            <td>{gc.score}</td>
                                                            <td><button className='aBase'
                                                                onClick={(e) => {
                                                                    let myButton = e.target
                                                                    let phraseRow = document.getElementById(`phrase_${i}_${inf.title}_${gc.value}`)
                                                                    if (phraseRow) {
                                                                        if (phraseRow.style.display === 'none') {
                                                                            phraseRow.style.display = 'contents'
                                                                            myButton.innerHTML = 'hide'
                                                                        } else {
                                                                            phraseRow.style.display = 'none'
                                                                            myButton.innerHTML = 'view'
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                view
                                                            </button>
                                                            </td>
                                                        </tr>
                                                        <tr id={`phrase_${i}_${inf.title}_${gc.value}`} style={{ display: 'none' }} >
                                                            <td colSpan={4} id={`phrase_td_${i}_${inf.title}_${gc.value}`} >
                                                                <div style={{ width: "33wv", maxWidth: "400px" }} >
                                                                    {gc.associatedPhrase}
                                                                </div>

                                                            </td>
                                                        </tr>
                                                        <tr style={{ borderBottom: "1px solid black" }} >
                                                            <td colSpan={4} >

                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <br />
                            </Item>
                        )
                    })
                }
            </Stack>
            </div>
        </div>
    )
}
