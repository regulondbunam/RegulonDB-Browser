import React, { useState } from 'react'
import { Typography } from '@mui/material'
import List from '@mui/material/List';
import menuConf from '../../conf';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from "@mui/icons-material/Search";
import DownloadingIcon from "@mui/icons-material/Downloading";
import BiotechIcon from "@mui/icons-material/Biotech";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import ApiIcon from "@mui/icons-material/Api";
import {DataVerifier} from 'ui-components/utils';

export default function Menu({handleSelectGoTo}) {
    const [menuId, setMenuId] = useState()

    const handleOpenMenu = (id) => {
        if (menuId === id) {
            setMenuId(false)
            return
        }
        setMenuId(id)
    }
    //console.log(menuConf);
    return (
        <div>
            <Typography variant='h1' >Go to</Typography>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
                {Object.keys(menuConf).map((key) => {
                    const _menu = menuConf[key]
                    let Icon = <></>;
                    switch (_menu.icon) {
                        case "search":
                            Icon = SearchIcon;
                            break;
                        case "downloads":
                            Icon = DownloadingIcon;
                            break;
                        case "tools":
                            Icon = BiotechIcon;
                            break;
                        case "help":
                            Icon = HelpOutlineIcon;
                            break;
                        case "overviews":
                            Icon = PreviewIcon;
                            break;
                        case "software":
                            Icon = ApiIcon;
                            break;
                        default:
                            break;
                    }
                    return (
                        <React.Fragment key={"menu_rdb_" + key} >
                            <ListItemButton onClick={() => { handleOpenMenu(_menu.id) }}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={_menu.label} />
                                {menuId === _menu.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={menuId === _menu.id} timeout="auto" unmountOnExit>
                                <Options options={_menu.options} handleSelectGoTo={handleSelectGoTo} />
                            </Collapse>
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    )
}

function Options({ options = [], handleSelectGoTo=()=>{} }) {
    const [optionId, setOptionId] = useState()

    const handleOpenMenu = (id) => {
        if (optionId === id) {
            setOptionId(undefined)
            return
        }
        setOptionId(id)
    }
    if (!DataVerifier.isValidArray(options)) {
        return null
    }
    return (
        <List disablePadding>
            {
                options.map((option) => {
                    return (
                        <React.Fragment key={"menu_options_" + option.id} >
                            <ListItemButton onClick={() => { handleOpenMenu(option.id) }}>
                                <ListItemText primary={option.label} />
                                {optionId === option.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={optionId === option.id} timeout="auto" unmountOnExit>
                                {DataVerifier.isValidArray(option?.options) && (
                                    <List disablePadding>
                                        {option.options.map((_option) => (
                                            <ListItemButton key={"menu_options_option" + _option.id} sx={{ pl: 4 } }
                                                onClick={()=>{handleSelectGoTo(_option.link)}}
                                            >
                                                <ListItemText primary={_option.label} />
                                            </ListItemButton>
                                        ))}

                                    </List>
                                )}

                            </Collapse>
                        </React.Fragment>
                    )
                })
            }
        </List>
    )
}
