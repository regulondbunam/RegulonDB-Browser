import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataVerifier } from '../../../components/ui-components';
import {buildUrlWithOrganism} from "../../../components/ui-components/utils/navigation";

function Pagination(results, limit = 10) {
    let _results = []
    if (DataVerifier.isValidArray(results)) {
        let _page = []
        let count = 1
        results.forEach((result) => {
            _page.push(result)
            if (limit === count) {
                _results.push(_page)
                _page = []
                count = 1
            } else {
                count++
            }
        });

        _results.push(_page)
    }
    return _results
}

export default function ListResult({ results = [], organismId }) {
    let navigate = useNavigate();
    const [page, setPage] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10);
    const data = Pagination(results)

    return (
        <div>
            <div style={{MinHeight: `${37*limit}px`}} >
                <List dense >
                    {data[page].map(dt => {
                        return (
                            <ListItemButton key={dt.type + "_result_" + dt._id}
                                onClick={() => { navigate(buildUrlWithOrganism("/" + dt.type + "/" + dt._id, organismId)); }}
                            >
                                <ListItemText
                                    primary={<p style={{fontSize: "16px"}} dangerouslySetInnerHTML={{__html: dt.title}} />} 
                                    secondary={<p style={{fontSize: "16px"}} dangerouslySetInnerHTML={{__html: dt.secondary}} />}
                                />
                            </ListItemButton>
                        )
                    })}
                </List>
            </div>
            <div style={{ backgroundColor: "#f5f5f5", width: "100%", height: "30px", display: "flex", flexDirection: "row-reverse" }} >
                {results.length > limit && (
                    <ButtonGroup size="small">
                        <Button
                            onClick={() => {
                                if (page > 0) {
                                    setPage(page - 1)
                                }
                            }}
                        >{"<- PrevPage"}</Button>
                        <Button>{page + 1}</Button>
                        <Button
                            onClick={() => {
                                if (page < data.length - 1) {
                                    setPage(page + 1)
                                }
                            }}
                        >{"NextPage ->"}</Button>
                    </ButtonGroup>
                )}
            </div>
        </div>

    )
}