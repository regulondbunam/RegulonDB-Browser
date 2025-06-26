// src/components/RegulonExplorerCards/GeneralConfigurationCard.jsx
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Stack,
  Autocomplete,
  TextField,
  Chip 
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";


const LabelWithTooltip = ({ label, tooltip }) => (
  <Box display="flex" alignItems="center" component="span" sx={{ mb: 0.5 }}> {label}
    <Tooltip title={tooltip}> <IconButton size="small" sx={{ ml: 0.5, p: 0, verticalAlign: 'middle' }} component="span">
      <HelpOutlineIcon sx={{ fontSize: '1rem' }} />
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

export default function GeneralConfigurationCard({ filters, handleChange, filterOptions }) {
  const regulatorOptions = filterOptions?.regulators || [];
  const riTypeOptions = filterOptions?.riTypes || [];
  const sigmaOptions = filterOptions?.sigmas || [];

  // El helper renderAutocomplete mantiene la lógica de renderTags para apilar los chips verticalmente
  const renderAutocomplete = (id, label, tooltipText, options, value, onChangeKey) => (
    <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 180 }}>
      <LabelWithTooltip label={label} tooltip={tooltipText} />
      <Autocomplete
        multiple
        id={id}
        size="small"
        options={options}
        getOptionLabel={(option) => String(option)}
        value={value}
        onChange={(event, newValue) => {
          handleChange(onChangeKey, newValue);
        }}
        filterSelectedOptions
        renderTags={(tagValue, getTagProps) => (
          <Stack spacing={0.5} sx={{ width: '100%', mt: '3px' }}>
            {tagValue.map((option, index) => {
              const { key, ...chipProps } = getTagProps({ index });
              return (
                <Chip
                  variant="outlined"
                  key={key}
                  label={String(option)}
                  size="small"
                  sx={{
                    borderRadius: '4px',
                    maxWidth: 'calc(100% - 8px)',
                    justifyContent: 'space-between',
                  }}
                  {...chipProps}
                />
              );
            })}
          </Stack>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={value.length > 0 ? '' : (options.length > 0 ? "Select..." : "Loading options...")}
          />
        )}
        getOptionDisabled={
          (option) => onChangeKey === 'interactionType' &&
            typeof option === 'string' &&
            !option.toLowerCase().endsWith('-promoter') &&
            option !== ""
        }
      />
    </Stack>
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader
          icon={<SettingsIcon color="success" />}
          title="General Configuration"
          tooltip="General filters for regulators and interactions."
        />
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap={2}>
          {renderAutocomplete("regulator-name-autocomplete", "Name", "Filter by specific TF name(s)", regulatorOptions, filters.regulatorName, "regulatorName")}
          
          {renderAutocomplete("interaction-type-autocomplete", "Type", "Type of regulatory interaction(s)", riTypeOptions, filters.interactionType, "interactionType")}
          
          {renderAutocomplete("exclude-sigma-autocomplete", "Exclude Sigma", "Exclude regions associated with specific sigma factor(s)", sigmaOptions, filters.excludeSigma, "excludeSigma")}
        </Box>
      </CardContent>
    </Card>
  );
}