// src/components/RegulonExplorerCards/RegulatoryInteractionsCard.jsx
import React from 'react';
import {
  Card, CardContent, TextField,
  Box, Tooltip, IconButton, Typography, Stack,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityIcon from "@mui/icons-material/Security";

const LabelWithTooltip = ({ label, tooltip }) => (
  <Box display="flex" alignItems="center" component="span"> {label} <Tooltip title={tooltip}>
    <IconButton size="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} component="span">
      <HelpOutlineIcon fontSize="inherit" /> </IconButton> </Tooltip> </Box>);


const CardHeader = ({ icon, title, tooltip }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
    <Box display="flex" alignItems="center"> {icon}
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', ml: 1 }}> {title} </Typography> </Box>
    <Tooltip title={tooltip}> <IconButton size="small"> <HelpOutlineIcon fontSize="small" /> </IconButton> </Tooltip> </Box>);

const operatorOptions = [
  { value: ">=", label: ">=" }, { value: "<=", label: "<=" },
  { value: ">", label: ">" }, { value: "<", label: "<" },
  { value: "==", label: "==" },
];

export default function RegulatoryInteractionsCard({ filters, handleChange }) {
  return (
    <Card sx={{ height: '100%'}} >
      <CardContent>
        <CardHeader
          icon={<SecurityIcon sx={{color: 'primary.dark'}}/>}
          title="Regulatory Interactions"
          tooltip="Filter by the number and type of RIs."
        />
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="flex-start">

            {/* -- Columna para "Total" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Total" tooltip="Total RIs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="totalRIs-op-label">Op</InputLabel>
                <Select
                  labelId="totalRIs-op-label"
                  label="Op"
                  value={filters.totalRIs.operator}
                  onChange={(e) => handleChange("totalRIs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.totalRIs.value}
                onChange={(e) => handleChange("totalRIs.value", e.target.value)}
                sx={{ width: '120px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

            {/* -- Columna para "Activating" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Activating" tooltip="Activating RIs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="activatingRIs-op-label">Op</InputLabel>
                <Select
                  labelId="activatingRIs-op-label"
                  label="Op"
                  value={filters.activatingRIs.operator}
                  onChange={(e) => handleChange("activatingRIs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.activatingRIs.value}
                onChange={(e) => handleChange("activatingRIs.value", e.target.value)}
                sx={{ width: '120px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

            {/* -- Columna para "Repressing" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Repressing" tooltip="Repressing RIs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="repressingRIs-op-label">Op</InputLabel>
                <Select
                  labelId="repressingRIs-op-label"
                  label="Op"
                  value={filters.repressingRIs.operator}
                  onChange={(e) => handleChange("repressingRIs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.repressingRIs.value}
                onChange={(e) => handleChange("repressingRIs.value", e.target.value)}
                sx={{ width: '120px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

          </Stack>

          <FormControl size="small" sx={{ maxWidth: 180 }}>
            <InputLabel id="exclude-ris-label">
              <LabelWithTooltip label="Exclude" tooltip="Exclude regions with only repressors or activators"/>
            </InputLabel>
            <Select
              labelId="exclude-ris-label" label="Exclude"
              value={filters.excludeRIsType}
              onChange={(e) => handleChange("excludeRIsType", e.target.value)}            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="repressors">Repressors</MenuItem>
              <MenuItem value="activators">Activators</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}