// src/components/RegulonExplorerCards/PredefinedRegionTypesCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Stack
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FilterListIcon from "@mui/icons-material/FilterList";

const CardHeader = ({ icon, title, tooltip }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
    <Box display="flex" alignItems="center">
      {icon}
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', ml: 1 }}>
        {title}
      </Typography>
    </Box>
    <Tooltip title={tooltip}>
      <IconButton size="small">
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

// Definimos el componente recibiendo filters y handleChange
export default function PredefinedRegionTypesCard({ filters, handleChange }) {
  return (
    <Card>
      <CardContent>
        <CardHeader
          icon={<FilterListIcon sx={{color: 'info.main'}}/>}
          title="Predefined Region Types"
          tooltip="Select a predefined set of filters."
        />
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="preset-type-label">Select type</InputLabel>
            {/* Usamos las props para value y onChange */}
            <Select
              labelId="preset-type-label"
              label="Select type"
              value={filters.presetType} // Accede a la parte específica del estado
              onChange={(e) => handleChange("presetType", e.target.value)} // Llama a la función pasada como prop
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="T1">Type 1</MenuItem>
              <MenuItem value="T2">Type 2</MenuItem>
              <MenuItem value="T3">Type 3</MenuItem>
              <MenuItem value="T4">Type 4</MenuItem>
              <MenuItem value="T5">Type 5</MenuItem>
              <MenuItem value="T6">Type 6</MenuItem>
              <MenuItem value="T7">Type 7</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}