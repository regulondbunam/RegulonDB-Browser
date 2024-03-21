import React from 'react'
import { useNavigate } from 'react-router-dom';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from '@mui/material/Typography';

export default function Menu({menu, setMenu=()=>{}}) {
    const navigate = useNavigate();
    return (
      <div
        style={{
          display: "flex",
          overflow: "auto",
          backgroundColor: "#2c4f63",
          padding: "20px 10% 15px 10%",
        }}
        onMouseLeave={() => {
            console.log("out");
          setMenu();
        }}
      >
        {menu.options.map((menu) => {          
          return (
            <List
              dense
              key={menu.id}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent", color:"white" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Typography variant='relevant' sx={{color: "white"}} >
                    {menu.label}
                </Typography>
              }
            >
              {menu.options.map((menu,index) => {
                if (menu.disabled) {
                  return null;
                }
                return (
                  <ListItemButton
                  key={"listItemButton_"+menu.label+"_"+index}
                    onClick={() => {
                      navigate(menu.link);
                      setMenu()
                    }}
                  >
                    <ListItemText
                    sx={{
                        ".MuiListItemText-primary": {
                            color: "white"
                        }
                    }}
                    primary={menu.label} />
                  </ListItemButton>
                );
              })}
            </List>
          );
        })}
      </div>
    );
  }
