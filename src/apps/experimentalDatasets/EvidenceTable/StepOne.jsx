import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useGetDataFile } from "../../../components/webservices/dataOfFile";
import Paper from "@mui/material/Paper";
import { Typography, TextField, Tooltip } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { DataVerifier, Circular } from "../../../components/ui-components";

function getEvidencesList(content = "") {
  let tfrsEvidence_nColumn = -1;
  let riEvidence_nColumn = -1;
  let pmEvidence_nColumn = -1;

  let evidences = {};

  if (DataVerifier.isValidString(content)) {
    const rawContent = content.split("\n");

    if (DataVerifier.isValidArray(rawContent)) {
      rawContent.forEach((line, i) => {
        const cells = line.split("\t");

        // HEADER
        if (i === 0) {
          cells.forEach((cell, ci) => {
            if (/tfrsEvidence/.test(cell)) {
              tfrsEvidence_nColumn = ci;
            }
            if (/riEvidence/.test(cell)) {
              riEvidence_nColumn = ci;
            }
            if (/pmEvidence/.test(cell)) {
              pmEvidence_nColumn = ci;
            }
          });
        } else {
          const processColumn = (colIndex) => {
            if (colIndex === -1) return; // columna no existe

            const value = cells[colIndex];
            if (!DataVerifier.isValidString(value)) return;

            const codes = value.split(";");

            codes.forEach((coincidencia) => {
              const evidence = coincidencia.split(":");

              if (DataVerifier.isValidString(evidence[0])) {
                evidences[evidence[0]] = evidence[1];
              }
            });
          };
          processColumn(tfrsEvidence_nColumn);
          processColumn(riEvidence_nColumn);
          processColumn(pmEvidence_nColumn);
        }
      });
    }
  }

  // Ordenar resultados
  const keysSorted = Object.keys(evidences).sort();
  const evidenceSorted = {};

  keysSorted.forEach((key) => {
    evidenceSorted[key] = evidences[key];
  });

  return evidenceSorted;
}

export default function StepOne({
  fileData,
  evidenceOptions,
  setEvidenceOptions,
}) {
  const { fileData: fileEvidence, loading, error } = useGetDataFile("EvidenceSet");
  const evidenceList = useMemo(() => {
    return getEvidencesList(fileData.content);
  }, [fileData]);
  if(loading){
    return <Circular />
  }

  if(error){
    console.error("error read evidence set");
  }

  return (
    <div>
      <TransferList
        evidenceList={evidenceList}
        evidenceOptions={evidenceOptions}
        fileEvidence={fileEvidence}
        setEvidenceOptions={setEvidenceOptions}
      />
    </div>
  );
}


function formatEvidenceData(fileEvidence,evidenceList={}){
  let evidenceData = {}
  if (fileEvidence?.content) {
    const content = fileEvidence.content
    const rows = content.split("\n")
    if (DataVerifier.isValidArray(rows)) {
      rows.forEach((row,index) => {
        if (index===0) {
          //const cells = row.split("\t")
          //1)evidence_code => 0
          //2)evidence_name => 1
        }else{
          const cells = row.split("\t")
        if (DataVerifier.isValidArray(cells)) {
          const code = cells[0]
          const name = cells[1]
          if(evidenceList.hasOwnProperty(code)){
            evidenceData[code] = name
          }
        }
        }
      });
    }
  }
  return evidenceData
}

function TransferList({ evidenceList, evidenceOptions, fileEvidence, setEvidenceOptions }) {
  const evidenceData = useMemo(() => {
    return formatEvidenceData(fileEvidence,evidenceList)
  }, [fileEvidence, evidenceList])
  const { remove, selected } = evidenceOptions;
  //console.log(evidenceOptions);
  useEffect(() => {
    if (DataVerifier.isValidObject(evidenceOptions)) {
      if (
        !DataVerifier.isValidObject(evidenceOptions.selected) &&
        !DataVerifier.isValidObject(evidenceOptions.remove)
      ) {
        let objEvidence = {
          remove: {},
          selected: { ...evidenceList },
        };
        setEvidenceOptions(objEvidence);
      }
    }
  }, [evidenceList, evidenceOptions, setEvidenceOptions]);

  const handleSelect = (key) => {
    let newSelection = { ...selected };
    newSelection[key] = remove[key];
    let newRemove = { ...remove };
    delete newRemove[key];
    let objEvidence = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleRemove = (key) => {
    let newSelection = { ...selected };
    let newRemove = { ...remove };
    newRemove[key] = selected[key];
    delete newSelection[key];
    let objEvidence = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterSelect = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(selected).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = selected[key];
    });
    Object.keys(selected).forEach((key) => {
      dir[key] = selected[key];
    });
    // Ordenar la lista filtrada
    filteredItems.sort();
    //console.log(dir);
    //setItems(Object.keys(dir));
    let objEvidence = {
      remove: remove,
      selected: dir,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterRemove = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(remove).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = remove[key];
    });
    Object.keys(remove).forEach((key) => {
      dir[key] = remove[key];
    });
    filteredItems.sort();
    let objEvidence = {
      remove: dir,
      selected: selected,
    };
    setEvidenceOptions(objEvidence);
  };

  return (
    <div style={{display: "flex", justifyContent: "space-around", marginBottom: "20px"}} >
      <div  >
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">Select Evidence to be removed</Typography>
            <CustomList
              type="selected"
              items={selected}
              evidenceData={evidenceData}
              onSelectItemList={handleRemove}
              handleFilter={handleFilterSelect}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Evidence removed</Typography>
            <CustomList
              type="remove"
              items={remove}
              evidenceData={evidenceData}
              onSelectItemList={handleSelect}
              handleFilter={handleFilterRemove}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const CustomList = ({
  type = "",
  items = {},
  evidenceData = {},
  onSelectItemList = () => {},
  handleFilter = () => {},
}) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    const text = event.target.value;
    handleFilter(text);
    setFilterText(text);
  };

  return (
    <Paper elevation={3} sx={{ width: "35vw", height: 400, overflow: "auto" }}>
      <div>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
            backgroundColor: "white",
          }}
        >
          <TextField
            label="Filter"
            fullWidth
            size="small"
            variant="filled"
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <List
            dense
            component="div"
            role="list"
            sx={{
              "& :hover": {
                background: "#aaaaaa",
              },
            }}
          >
            {Object.keys(items).map((value) => {
              const labelId = `transfer-list-item-${value}-label`;
              return (
                <ListItem
                  key={value}
                  role="listitem"
                  secondaryAction={
                    type === "selected" && (
                      <IconButton
                        onClick={() => {
                          onSelectItemList(value);
                        }}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    )
                  }
                >
                  {type === "remove" && (
                    <ListItemIcon>
                      <IconButton
                        onClick={() => {
                          onSelectItemList(value);
                        }}
                      >
                        <AddBoxIcon fontSize="small" />
                      </IconButton>
                    </ListItemIcon>
                  )}
                  <Tooltip title={evidenceData.hasOwnProperty(value)?evidenceData[value]:""} placement="right" >
                    <ListItemText id={labelId} primary={`${value}`} />
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </Paper>
  );
};

/**
 * 
function TransferList({
  evidenceList,
  nameKey,
  evidenceOptions,
  setEvidenceOptions,
}) {
  const { remove, selected } = evidenceOptions[nameKey];
  //console.log(evidenceOptions);
  useEffect(() => {
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      if (
        !DataVerifier.isValidObject(evidenceOptions[nameKey].selected) &&
        !DataVerifier.isValidObject(evidenceOptions[nameKey].remove)
      ) {
        let objEvidence = { ...evidenceOptions };
        objEvidence[nameKey] = {
          remove: {},
          selected: { ...evidenceList },
        };
        setEvidenceOptions(objEvidence);
      }
    }
  }, [evidenceList, evidenceOptions, setEvidenceOptions, nameKey]);

  const handleSelect = (key) => {
    let newSelection = { ...selected };
    newSelection[key] = remove[key];
    let newRemove = { ...remove };
    delete newRemove[key];
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleRemove = (key) => {
    let newSelection = { ...selected };
    let newRemove = { ...remove };
    newRemove[key] = selected[key];
    delete newSelection[key];
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterSelect = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(selected).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = selected[key];
    });
    Object.keys(selected).forEach((key) => {
      dir[key] = selected[key];
    });
    // Ordenar la lista filtrada
    filteredItems.sort();
    //console.log(dir);
    //setItems(Object.keys(dir));
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: remove,
      selected: dir,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterRemove = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(remove).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = remove[key];
    });
    Object.keys(remove).forEach((key) => {
      dir[key] = remove[key];
    });
    // Ordenar la lista filtrada
    filteredItems.sort();
    //console.log(dir);
    //setItems(Object.keys(dir));
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: dir,
      selected: selected,
    };
    setEvidenceOptions(objEvidence);
  };

  return (
    <div>
      <div>
        <Typography variant="h5">{nameKey}</Typography>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">Select Evidence</Typography>
            <CustomList
              type="selected"
              items={selected}
              onSelectItemList={handleRemove}
              handleFilter={handleFilterSelect}
            />
          </Grid>
          <Grid item>
            
            </Grid>
            <Grid item>
              <Typography variant="h6">Evidence removed</Typography>
              <CustomList
                type="remove"
                items={remove}
                onSelectItemList={handleSelect}
                handleFilter={handleFilterRemove}
              />
            </Grid>
          </Grid>
        </div>
        <br />
        <br />
      </div>
    );
  }
 */
