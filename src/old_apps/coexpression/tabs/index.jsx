import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Query from "./query";
import GeneCoexpression from "./geneCoexpression";
import Matrix from "./matrix";
import { GetGeneList } from "./query/GetGeneList";
import { GetGeneInfo } from './query/GetGeneInfo';


//const backgroundColor = "#d5e2ead7";
const lineColor = "#32617D";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <article>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && children}
            </div>
        </article>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const AntTabs = styled(Tabs)({
    WebkitBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    MozBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    boxShadow: "inset -1px -8px 0px -6px " + lineColor,
    "& .MuiTabs-indicator": {
        backgroundColor: "#FFFFFF",
        borderLeft: "3px solid " + lineColor,
        borderRight: "3px solid " + lineColor,
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        minWidth: 170,
        [theme.breakpoints.up("sm")]: {
            minWidth: 170,
        },
        marginLeft: "7%",
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: "rgba(0, 0, 0, 0.85)",
        borderTop: "3px solid #3D779B",
        borderRight: "3px solid #3D779B",
        borderLeft: "3px solid #3D779B",
        fontStyle: "normal",
        fontSize: "14px",
        fontFamily: [
            "Arial",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
        },
        "&.Mui-selected": {
            color: "#000000",
            fontWeight: theme.typography.fontWeightMedium,
        },
    })
);

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function TabsPanel({ setState, selectedGenes }) {
    const [geneList, setGeneList] = React.useState();
    const [query, setQuery] = React.useState([]);
    const [searchInfo, setSearchInfo] = React.useState(false);
    const [genesData, setGenesData] = React.useState();
    //const [geneResults, setGeneResults] = React.useState(0);
    const [value, setValue] = React.useState(0);
    //console.log("geneList", geneList);
    React.useEffect(() => {
        
        if (geneList && query.length === 0 && selectedGenes.length > 0 ) {
            let genes = geneList.getObjectList
            let selectedQuery = []
            selectedGenes.forEach((selectedGeneId,index) => {
                let gene = genes.find(gen => gen._id === selectedGeneId)
                if(gene){
                    selectedQuery.push({
                        id: gene._id,
                        label: `${gene.name}, ${gene.productsName.join(", ")}`,
                        name: gene.name,
                    })
                }else{
                    selectedGenes.splice(index, 1);
                }
            });
            setQuery(selectedQuery)
        }
    }, [geneList, selectedGenes, query])
    console.log("query", query);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = () => {
        setSearchInfo(!searchInfo);
    }

    const cleanInfo = () => {
        setQuery([])
        setSearchInfo(false)
        setGenesData(undefined)
    }

    return (
        <Box sx={{ width: "100%" }}>
            {!geneList && (
                <GetGeneList getGeneList={(geneList) => { setGeneList(geneList) }} setState={setState} />
            )}
            {searchInfo && (
                <GetGeneInfo idsGenes={query.map((gene) => (gene.id)).join(" ")}
                    limit={query.length}
                    getGeneResults={(geneSearchResults) => {
                        //setGeneResults(geneSearchResults)
                        setGenesData(geneSearchResults)
                    }} setState={setState}
                />
            )}
            <Box sx={{ bgcolor: "#fff" }}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Query"{...a11yProps(0)} />
                    <AntTab
                        disabled={!searchInfo}
                        sx={{ marginLeft: "0.5px" }}
                        label="Genes Coexpression"
                        {...a11yProps(1)}
                    />
                    <AntTab
                        disabled={!searchInfo}
                        sx={{ marginLeft: "0.5px" }}
                        label="Matrix"
                        {...a11yProps(1)}
                    />
                </AntTabs>
                <Box sx={{ p: 0 }} />
                <TabPanel value={value} index={0}>
                    <Query geneList={geneList} setQuery={setQuery} query={query} handleSearch={handleSearch} genesData={genesData} cleanInfo={cleanInfo} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GeneCoexpression geneResults={genesData} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Matrix query={query} />
                </TabPanel>
            </Box>
        </Box>
    );
}
