// src/components/RegulonExplorerCards/ProximalSiteRangeCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Stack
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StraightenIcon from "@mui/icons-material/Straighten";

const LabelWithTooltip = ({ label, tooltip }) => (<Box display="flex" alignItems="center" component="span"> {label}
  <Tooltip title={tooltip}> <IconButton size="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} component="span">
    <HelpOutlineIcon fontSize="inherit" /> </IconButton> </Tooltip> </Box>);
const CardHeader = ({ icon, title, tooltip }) => (<Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
  <Box display="flex" alignItems="center"> {icon}
    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', ml: 1 }}> {title} </Typography> </Box>
  <Tooltip title={tooltip}> <IconButton size="small"> <HelpOutlineIcon fontSize="small" /> </IconButton> </Tooltip> </Box>);

// Definimos el componente recibiendo props
export default function ProximalSiteRangeCard({ filters, handleChange }) {
  return (
    // Mantenemos variant="outlined"
    <Card variant="outlined">
      <CardContent>
        <CardHeader
          icon={<StraightenIcon color="secondary" />}
          title="Proximal Site Range"
          tooltip="Define the distance range considered 'proximal' to the TSS."
        />
        {/* Mantenemos el Box para centrar */}
        <Box display="flex" justifyContent="center">
          {/* Usamos las props para values y handlers */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <TextField
              label={<LabelWithTooltip label="Min" tooltip="Minimum site distance from TSS (e.g., -90)" />}
              type="number"
              size="small"
              variant="outlined"
              value={filters.proximalSiteMin} // Usa prop
              onChange={(e) => handleChange("proximalSiteMin", e.target.value)} // Usa prop
              sx={{ width: '110px' }}
            />
            <TextField
              label={<LabelWithTooltip label="Max" tooltip="Maximum site distance from TSS (e.g., 20)" />}
              type="number"
              size="small"
              variant="outlined"
              value={filters.proximalSiteMax} // Usa prop
              onChange={(e) => handleChange("proximalSiteMax", e.target.value)} // Usa prop
              sx={{ width: '110px' }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}