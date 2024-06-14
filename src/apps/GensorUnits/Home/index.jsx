import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DataVerifier } from "ui-components/utils";
import FilterTable from "ui-components/Web/FilterTable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetAllGus } from "webServices/queries";
import { Cover } from "ui-components/Web/Cover";
import { Typography } from "@mui/material";


function formatDataByGensorUnit(gusData = []) {
    let table = {
        columns: [
            { key: "gu", label: "Gensor Unit", width: 100 },
            { key: "groups", label: "Groups", width: 500 }
        ],
        data: []
    }
    if (DataVerifier.isValidArray(gusData)) {
        gusData.forEach((guData, index) => {
            const gu = guData.gensorUnit;
            let groups = "";
            if (DataVerifier.isValidArray(gu.groups)) {
                groups = gu.groups.join("; ");
            }
            table.data.push({
                gu: <Link value={gu.name} to={"/gu/" + gu._id}>{gu.name}</Link>,
                groups: groups,
            })
            //groups: gu.groups,
        });
    }
    return table;
}

function formatDataByGroup(gusData = []) {
    let table = {
        columns: [
            { key: "group", label: "Group", width: 200 },
            { key: "gus", label: "Gensor Units", width: 700 },
        ],
        data: []
    }
    if (DataVerifier.isValidArray(gusData)) {
        let groups = {};
        gusData.forEach((guData, index) => {
            const gu = guData.gensorUnit;
            if (DataVerifier.isValidArray(gu.groups)) {
                gu.groups.forEach((group) => {
                    if (DataVerifier.isValidString(group)) {
                        const idGroup = group.replace(/\s/g, "_");
                        const row = groups[idGroup];
                        if (row) {
                            if (!row.gensorUnits.find((_gu) => _gu._id === gu._id)) {
                                groups[idGroup] = {
                                    id: idGroup,
                                    _group: group,
                                    gensorUnits: [...row.gensorUnits, gu],
                                };
                            }
                        } else {
                            groups[idGroup] = {
                                id: idGroup,
                                _group: group,
                                gensorUnits: [gu],
                            };
                        }
                    } else {
                        const idGroup = "";
                        const row = groups[group];
                        if (row) {
                            groups[idGroup] = {
                                id: idGroup,
                                _group: group,
                                gensorUnits: [...row.gensorUnits, gu],
                            };
                        } else {
                            groups[idGroup] = {
                                id: idGroup,
                                _group: group,
                                gensorUnits: [gu],
                            };
                        }
                    }
                });
            }
        });

        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(groups)) {
            table.data.push({
                group: value._group,
                gus: <div
                    value=""
                >
                    {value.gensorUnits.map((gu) => {
                        return (
                            <Link
                                key={"gu" + gu._id + "In_" + value._group + "group"}
                                to={"/gu/" + gu._id}
                                style={{ marginLeft: "15px" }}
                            >
                                {gu.name}
                            </Link>
                        );
                    })}
                </div>,
            })
        }
    }
    return table;
}

export default function Home() {
    const { gusData, error, loading } = useGetAllGus();
    const [format, setFormat] = useState("Gensor Unit");

    const handleChange = (event) => {
        setFormat(event.target.value);
    };

    if (loading) {
        return <Cover state={"loading"}>
            <Typography variant="h1" >Loading gensor units...</Typography>
        </Cover>
    }

    if (error) {
        return <Cover state={"error"}>
            <Typography variant="h1" >Error :(</Typography>
        </Cover>
    }

    return (
        <div>
            <Cover>
                <Typography variant="h1" >Gensor Unit</Typography>
            </Cover>
            <div style={{ margin: "0 10% 0 5%" }}>
                <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Gensor Unit grouped by </InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={format}
                        label="groupBy"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Gensor Unit"}>Name</MenuItem>
                        <MenuItem value={"Functionality"}>Functional Group</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <div >
                {format === "Functionality" ? (
                    <ByGroups gusData={gusData} />
                ) : (
                    <ByGU gusData={gusData} />
                )}
            </div>
        </div>
    );
}

function ByGU({ gusData }) {
    const table = useMemo(() => {
        return formatDataByGensorUnit(gusData);
    }, [gusData]);
    return <FilterTable {...table} items={20} tableName="Grouped by gensor unit" />
}

function ByGroups({ gusData }) {
    const table = useMemo(() => {
        return formatDataByGroup(gusData);
    }, [gusData]);
    return <FilterTable {...table} items={20} tableName="Grouped by group" />
}
