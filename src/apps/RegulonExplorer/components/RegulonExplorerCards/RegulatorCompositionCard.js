// src/components/RegulonExplorerCards/RegulatorCompositionCard.jsx
import React from 'react';
import {
  Card, CardContent, TextField, Checkbox, FormControlLabel,
  Box, Tooltip, IconButton, Typography, Stack,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";

// Helpers
const LabelWithTooltip = ({ label, tooltip }) => (
  <Box display="flex" alignItems="center" component="span"> {label}
    <Tooltip title={tooltip}>
      <IconButton size="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} component="span">
        <HelpOutlineIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  </Box>);

const CardHeader = ({ icon, title, tooltip }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
    <Box display="flex" alignItems="center"> {icon}
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', ml: 1 }}> {title}
      </Typography>
    </Box>
    <Tooltip title={tooltip}>
      <IconButton size="small">
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>);

const operatorOptions = [
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: "==", label: "==" },
];

export default function RegulatorCompositionCard({ filters, handleChange }) {
  return (
    <Card>
      <CardContent>
        <CardHeader
          icon={<PeopleIcon color="warning" />}
          title="Regulator Composition"
          tooltip="Filter by the number and type of TFs."
        />
        <Stack spacing={1}> {/* Stack principal para separar filas de checkbox */}
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="flex-start">

            {/* -- Columna para "Unique" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Unique" tooltip="Number of unique TFs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="uniqueRegulators-op-label">Op</InputLabel>
                <Select
                  labelId="uniqueRegulators-op-label"
                  label="Op"
                  value={filters.uniqueRegulators.operator}
                  onChange={(e) => handleChange("uniqueRegulators.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.uniqueRegulators.value}
                onChange={(e) => handleChange("uniqueRegulators.value", e.target.value)}
                sx={{ width: '100px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

            {/* -- Columna para "Activator" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Activator" tooltip="Number of TFs that only activate" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="activatorTFs-op-label">Op</InputLabel>
                <Select
                  labelId="activatorTFs-op-label"
                  label="Op"
                  value={filters.activatorTFs.operator}
                  onChange={(e) => handleChange("activatorTFs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.activatorTFs.value}
                onChange={(e) => handleChange("activatorTFs.value", e.target.value)}
                sx={{ width: '100px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

            {/* -- Columna para "Repressor" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Repressor" tooltip="Number of TFs that only repress" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="repressorTFs-op-label">Op</InputLabel>
                <Select
                  labelId="repressorTFs-op-label"
                  label="Op"
                  value={filters.repressorTFs.operator}
                  onChange={(e) => handleChange("repressorTFs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.repressorTFs.value}
                onChange={(e) => handleChange("repressorTFs.value", e.target.value)}
                sx={{ width: '110px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

          </Stack>

          {/* Checkbox en su propia fila debajo */}
          <FormControlLabel
            control={<Checkbox size="small" checked={filters.activatorHasRepressingRIs} onChange={(e) => handleChange("activatorHasRepressingRIs", e.target.checked)} />}
            
            label={<LabelWithTooltip label="Exclude Dual TFs" tooltip="Filter out regions regulated by TFs with both activating and repressing roles." />}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}