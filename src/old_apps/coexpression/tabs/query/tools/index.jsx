import * as React from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';


function autocompleteFormat(geneList = []) {
    let options = []
  
    geneList.forEach(gene => {
        options.push({
            id: gene._id,
            label: `${gene.name}, ${gene.productsName.join(", ")}`, 
            name: gene.name,
        })
    });
    return options
}

function Tools({ query = [], setQuery = () => { }, geneList, handleReset = () => { }, cleanInfo = () => { }, handleSearch = () => { } }) {

    const optionList = autocompleteFormat(geneList)
    const [wantedGene, setGene] = React.useState(null);

    const enableSearch = () => {
        if (query.length > 0) {
            return false
        } else {
            return true
        }
    }

    const selectRandomGenes = () => {
        let selectGenes = []
        for (let i = 0; i < 2; i++) {
            let indexOption = Math.floor(Math.random() * optionList.length);
            selectGenes.push(optionList[indexOption])
        }
        setQuery([...query, ...selectGenes])
        handleReset()
    }
    const handleChange = (event, newValue) => {
        setGene(newValue);
    };
    const enableAdd = () => {
        if (wantedGene === null) {
            return true
        } else {
            return false
        }
    }

    return (<Box
        sx={{
            '& > :not(style)': { m: 1, width: '60ch' },
        }}
        noValidate
    >

        <div id='geneTool_form' >
            <div id='geneTool_autocomplete' style={{
                display: "flex",
                justifyContent: "space-around"
            }}>
                <Autocomplete
                    id="geneSelector"
                    sx={{ width: 300 }}
                    options={optionList}
                    autoHighlight
                    getOptionDisabled={(option) => {
                        if (query.find(gene => gene.id === option.id)) {
                            return true
                        }
                        return false
                    }
                    }
                    renderInput={(params) => <TextField {...params} label="Search Gene and ADD" />}
                    value={wantedGene}
                    onChange={handleChange}
                />
                <button disabled={enableAdd()} style={{ width: "80px" }} onClick={() => {
                    setQuery([...query, wantedGene])
                    handleReset()
                }}>Add</button>
            </div>
            <div id="geneTool_buttons" style={{ display: "flex", justifyContent: "space-evenly", marginTop: "35px" }}>
                    <div>
                        <button onClick={() => { cleanInfo() }}>Reset</button>
                    </div>
                    <div>
                    <button onClick={selectRandomGenes}  style={{ width: "80px" }} >Demo</button>
                    </div>
                    <div>
                        <button disabled={enableSearch()} className="accent" onClick={handleSearch}>Search</button>
                    </div>
            </div>
        </div>



    </Box >);
}

export default Tools;

/**
 * 
 * 
 *      
 */