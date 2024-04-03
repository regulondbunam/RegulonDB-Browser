import React, { useState } from 'react';
import { NAV_OPTIONS } from './static'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


export default function Movil({ children }) {
  const [selectOption, setSelectOption] = useState({ ...NAV_OPTIONS.EXPLORER })
  const navigate = useNavigate();

  const handleSelectGoTo = (link) => {
    setSelectOption({ ...NAV_OPTIONS.EXPLORER })
    setTimeout(() => {
      navigate(link);
    }, 100);
  }
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Header />
      <Box>
        {selectOption.label === NAV_OPTIONS.EXPLORER.label ? (
          <>{children}</>
        ) : (
          <>
            {
              React.cloneElement(
                selectOption.component,
                { handleSelectGoTo: handleSelectGoTo }
              )
            }
          </>
        )}

      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={selectOption}
          onChange={(event, newValue) => {
            setSelectOption(newValue);
          }}
        >
          {Object.keys(NAV_OPTIONS).map((key) => {
            const option = NAV_OPTIONS[key]
            const Icon = option.icon
            return <BottomNavigationAction sx={{
              ".Mui-selected": {
                color: "#ffffff",
              },
              backgroundColor: selectOption.label === option.label ? "#1f3d4e" : "",
            }} key={key} label={option.label} value={option} icon={<Icon sx={{ color: selectOption.label === option.label ? "#ffffff" : "", }} />} />
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}