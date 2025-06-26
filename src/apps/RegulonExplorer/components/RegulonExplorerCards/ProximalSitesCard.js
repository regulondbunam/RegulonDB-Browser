
// src/components/RegulonExplorerCards/ProximalSitesCard.jsx
import React from 'react';
import {
  Card, CardContent, TextField, Checkbox, FormControlLabel,
  Box, Tooltip, IconButton, Typography, Stack,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import {Checklist as ChecklistIcon} from "@mui/icons-material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
  { value: ">=", label: ">=" }, { value: "<=", label: "<=" },
  { value: ">", label: ">" }, { value: "<", label: "<" },
  { value: "==", label: "==" },
];

export default function ProximalSitesCard({ filters, handleChange }) {
  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
        <CardHeader
          icon={<ChecklistIcon color="error" />}
          title="Proximal Sites"
          tooltip="Filters specific to proximal regulatory interactions."
        />
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="flex-start">

            {/* -- Columna para "Prox. Activating" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Prox. Activating" tooltip="Number of proximal activating RIs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="proxActRIs-op-label">Op</InputLabel>
                <Select
                  labelId="proxActRIs-op-label"
                  label="Op"
                  value={filters.proximalActivatingRIs.operator}
                  onChange={(e) => handleChange("proximalActivatingRIs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.proximalActivatingRIs.value}
                onChange={(e) => handleChange("proximalActivatingRIs.value", e.target.value)}
                sx={{ width: '150px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

            {/* -- Columna para "Prox. Repressing" -- */}
            <Stack spacing={0.5}>
              <LabelWithTooltip label="Prox. Repressing" tooltip="Number of proximal repressing RIs" />
              <FormControl size="small" sx={{ minWidth: 50 }}>
                <InputLabel id="proxRepRIs-op-label">Op</InputLabel>
                <Select
                  labelId="proxRepRIs-op-label"
                  label="Op"
                  value={filters.proximalRepressingRIs.operator}
                  onChange={(e) => handleChange("proximalRepressingRIs.operator", e.target.value)}
                >
                  {operatorOptions.map(op => (<MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                type="number" size="small" variant="outlined"
                value={filters.proximalRepressingRIs.value}
                onChange={(e) => handleChange("proximalRepressingRIs.value", e.target.value)}
                sx={{ width: '160px' }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>

          </Stack>

          <Stack spacing={0}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.oneProximalRepressorPerTF} onChange={(e) =>
                handleChange("oneProximalRepressorPerTF", e.target.checked)} />}
              label={<LabelWithTooltip label="One prox. repressor/TF" tooltip="Require only one proximal repressor site per TF" />}
              sx={{ height: '40px', display: 'flex', alignItems: 'center' }}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.sameTFforAllActivatingRIs} onChange={(e) =>
                handleChange("sameTFforAllActivatingRIs", e.target.checked)} />}
              label={<LabelWithTooltip label="Same TF for all activating RIs" tooltip="Require the same TF for all proximal activating RIs" />}
              sx={{ height: '40px', display: 'flex', alignItems: 'center' }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}