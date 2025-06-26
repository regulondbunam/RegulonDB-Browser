'use client';

import { useState, useMemo } from "react";
import Papa from 'papaparse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button, Grid, Box, Tooltip, IconButton, Typography, Stack, Alert,
  CircularProgress, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReplayIcon from '@mui/icons-material/Replay';

// --- IMPORTAR TODOS LOS COMPONENTES DE TARJETA ---
import FileSelectionCard from './components/RegulonExplorerCards/FileSelectionCard';
import PredefinedRegionTypesCard from './components/RegulonExplorerCards/PredefinedRegionTypesCard';
import RegulatorCompositionCard from './components/RegulonExplorerCards/RegulatorCompositionCard';
import GeneralConfigurationCard from './components/RegulonExplorerCards/GeneralConfigurationCard';
import ProximalSiteRangeCard from './components/RegulonExplorerCards/ProximalSiteRangeCard';
import RegulatoryInteractionsCard from './components/RegulonExplorerCards/RegulatoryInteractionsCard';
import ProximalSitesCard from './components/RegulonExplorerCards/ProximalSitesCard';

// --- Definición de Columnas para la tabla ---
const columns = [
  { accessor: "regionName", label: "Region Name" },
  { accessor: "regulators", label: "Regulators" },
  { accessor: "numRegulators", label: "# Regulators" },
  { accessor: "sigmaFactor", label: "Sigma Factor" },
  { accessor: "riTypesPresent", label: "Interaction Types" },
  { accessor: "numRIs", label: "# RIs" },
  { accessor: "numRIsActivators", label: "# RI Act" },
  { accessor: "numRIsRepressors", label: "# RI Rep" },
  { accessor: "numProxRIsActivators", label: "# Prox Act" },
  { accessor: "numProxRIsRepressors", label: "# Prox Rep" },
  { accessor: "numActivatorTFs", label: "# TF Act" },
  { accessor: "numRepressorTFs", label: "# TF Rep" },
  { accessor: "activatorHasRepressingRIs", label: "Dual TF Act?" },
  { accessor: "oneProximalRepressorPerTF", label: "1 Prox Rep/TF?" },
  { accessor: "sameTFforAllActivatingRIs", label: "Same TF Act?" },
];

// --- Presets y Defaults ---
const regionTypePresets = {
  "T1": {
    uniqueRegulators: { value: "1", operator: ">=" },
    activatorTFs: { value: "1", operator: ">=" },
    repressorTFs: { value: "0", operator: "==" },
    proximalActivatingRIs: { value: "1", operator: ">=" },
    proximalRepressingRIs: { value: "0", operator: "==" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T2": {
    uniqueRegulators: { value: "2", operator: "==" },
    activatorTFs: { value: "1", operator: "==" },
    repressorTFs: { value: "1", operator: "==" },
    proximalActivatingRIs: { value: "0", operator: ">=" },
    proximalRepressingRIs: { value: "1", operator: ">=" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T3": {
    uniqueRegulators: { value: "3", operator: ">=" },
    activatorTFs: { value: "1", operator: "==" },
    repressorTFs: { value: "2", operator: ">=" },
    proximalActivatingRIs: { value: "0", operator: ">=" },
    proximalRepressingRIs: { value: "2", operator: ">=" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T4": {
    uniqueRegulators: { value: "1", operator: "==" },
    activatorTFs: { value: "1", operator: "==" },
    repressorTFs: { value: "0", operator: "==" },
    proximalActivatingRIs: { value: "2", operator: ">=" },
    proximalRepressingRIs: { value: "0", operator: "==" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T5": {
    uniqueRegulators: { value: "2", operator: "==" },
    activatorTFs: { value: "1", operator: "==" },
    repressorTFs: { value: "1", operator: "==" },
    proximalActivatingRIs: { value: "2", operator: ">=" },
    proximalRepressingRIs: { value: "1", operator: ">=" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T6": {
    uniqueRegulators: { value: "3", operator: ">=" },
    activatorTFs: { value: "1", operator: "==" },
    repressorTFs: { value: "2", operator: ">=" },
    proximalActivatingRIs: { value: "2", operator: ">=" },
    proximalRepressingRIs: { value: "2", operator: ">=" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  },


  "T7": {
    uniqueRegulators: { value: "1", operator: "==" },
    activatorTFs: { value: "0", operator: "==" },
    repressorTFs: { value: "1", operator: "==" },
    proximalActivatingRIs: { value: "0", operator: "==" },
    proximalRepressingRIs: { value: "1", operator: ">=" },
    activatorHasRepressingRIs: false,
    sameTFforAllActivatingRIs: true,
    oneProximalRepressorPerTF: true,
    excludeRIsType: "none"
  }
};

const initialFilterState = {
  presetType: "none",
  interactionType: [],
  regulatorName: [],
  excludeSigma: [],
  proximalSiteMin: "-90",
  proximalSiteMax: "20",
  uniqueRegulators: { value: "", operator: ">=" },
  activatorTFs: { value: "", operator: ">=" },
  repressorTFs: { value: "", operator: ">=" },
  totalRIs: { value: "", operator: ">=" },
  activatingRIs: { value: "", operator: ">=" },
  repressingRIs: { value: "", operator: ">=" },
  proximalActivatingRIs: { value: "", operator: ">=" },
  proximalRepressingRIs: { value: "", operator: ">=" },
  activatorHasRepressingRIs: false,
  sameTFforAllActivatingRIs: false,
  oneProximalRepressorPerTF: false,
  excludeRIsType: "none",
  sortBy: "regulator",
};

function validateProximalSiteRange(min, max) {
  if (String(min).trim() === '' || String(max).trim() === '') return true;
  const minVal = parseFloat(min); const maxVal = parseFloat(max);
  if (isNaN(minVal) || isNaN(maxVal)) { alert("Error: Valores numéricos inválidos para rango proximal."); return false; }
  if (minVal >= maxVal) { alert(`Error: Mínimo (${minVal}) debe ser menor que máximo (${maxVal}).`); return false; }
  if (minVal < -500 || maxVal > 500) { alert("Advertencia: Rango proximal típico es -90 a +20."); }
  return true;
}

export default function RegulonExplorer() {
  const [filters, setFilters] = useState({ ...initialFilterState });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ regulators: [], riTypes: [], sigmas: [] });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format) => {
    if (!tableData || tableData.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    let content = "";
    let mimeType = "";
    let fileExtension = "";

    if (format === 'csv' || format === 'tsv') {
      const delimiter = format === 'tsv' ? '\t' : ',';
      content = Papa.unparse(tableData, {
        header: true,
        columns: columns.map(col => col.accessor),
        delimiter: delimiter
      });
      mimeType = 'text/' + format + ';charset=utf-8;';
      fileExtension = format;
    } else if (format === 'json') {
      content = JSON.stringify(tableData, null, 2);
      mimeType = 'application/json;charset=utf-8;';
      fileExtension = 'json';
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `regulon_explorer_results.${fileExtension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleMenuClose();
  };


  const handleChange = (key, value) => {
    setFilters(prevFilters => {
      const keys = key.split('.');

      if (keys.length > 1) { // Campo anidado (valor u operador)
        const [filterName, property] = keys;
        return {
          ...prevFilters,
          [filterName]: {
            ...prevFilters[filterName],
            [property]: value,
          },
        };
      } else { // Campo simple (preset, checkbox, Autocomplete)
        let newFilters = { ...prevFilters, [key]: value };
        if (key === 'presetType') {
          if (value === 'none') {
            return { ...initialFilterState, presetType: 'none' };
          } else {
            const presetValues = regionTypePresets[value];
            if (presetValues) {
              return { ...initialFilterState, ...presetValues, presetType: value };
            }
          }
        }
        return newFilters;
      }
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setProcessedData(null);
    setDisplayData([]);
    setError(null);
    setFilterOptions({ regulators: [], riTypes: [], sigmas: [] });
  };

  const handleProcessFile = async () => {
    if (!selectedFile) { setError("Por favor, selecciona un archivo primero."); return; }
    setIsLoading(true); setError(null); setProcessedData(null); setDisplayData([]); setFilterOptions({ regulators: [], riTypes: [], sigmas: [] });
    const formData = new FormData(); formData.append('risetFile', selectedFile);
    try {
      const response = await fetch('http://localhost:5000/wdps/gramaticalTool/process/', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || result.error || `Error del servidor: ${response.statusText || response.status}`);
      }
      if (result && result.stats && Array.isArray(result.stats) && result.options) {
        setProcessedData(result.stats);
        setDisplayData(result.stats);
        setFilterOptions(result.options);
        console.log("Datos procesados y opciones recibidas:", result);
      } else if (result && result.error) {
        throw new Error(`Error en procesamiento backend: ${result.error}`);
      } else {
        console.error("Respuesta de API no tiene formato esperado {stats, options}:", result);
        throw new Error("La respuesta del servidor no tiene el formato esperado.");
      }
    } catch (err) {
      console.error("Error al procesar archivo:", err);
      setError(String(err.message) || "Ocurrió un error al procesar el archivo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = () => {
    if (!processedData) { setError("Primero procesa un archivo."); return; }
    setError(null);
    if (!validateProximalSiteRange(filters.proximalSiteMin, filters.proximalSiteMax)) { return; }

    const filteredResults = processedData.filter(region => {
      const checkNumericFilter = (regionValue, filterObject) => {
        const valueStr = String(filterObject.value).trim();
        if (valueStr === '') return true;
        const filterVal = parseInt(valueStr, 10);
        if (isNaN(filterVal)) return true;
        if (regionValue === null || regionValue === undefined) return false;

        switch (filterObject.operator) {
          case '<': return regionValue < filterVal;
          case '>': return regionValue > filterVal;
          case '<=': return regionValue <= filterVal;
          case '>=': return regionValue >= filterVal;
          case '==': return regionValue == filterVal;
          default: return true;
        }
      };

      return (
        (filters.regulatorName.length === 0 || region.regulators?.some(name => filters.regulatorName.includes(name))) &&
        (filters.interactionType.length === 0 || region.riTypesPresent?.some(type => filters.interactionType.includes(type))) &&
        (filters.excludeSigma.length === 0 || !filters.excludeSigma.includes(region.sigmaFactor)) &&
        !(filters.excludeRIsType === 'repressors' && region.numRIsRepressors > 0 && region.numRIsActivators === 0) &&
        !(filters.excludeRIsType === 'activators' && region.numRIsActivators > 0 && region.numRIsRepressors === 0) &&
        checkNumericFilter(region.numRegulators, filters.uniqueRegulators) &&
        checkNumericFilter(region.numActivatorTFs, filters.activatorTFs) &&
        checkNumericFilter(region.numRepressorTFs, filters.repressorTFs) &&
        checkNumericFilter(region.numRIs, filters.totalRIs) &&
        checkNumericFilter(region.numRIsActivators, filters.activatingRIs) &&
        checkNumericFilter(region.numRIsRepressors, filters.repressingRIs) &&
        checkNumericFilter(region.numProxRIsActivators, filters.proximalActivatingRIs) &&
        checkNumericFilter(region.numProxRIsRepressors, filters.proximalRepressingRIs) &&
        (!filters.activatorHasRepressingRIs || region.activatorHasRepressingRIs === false) &&
        (!filters.oneProximalRepressorPerTF || region.oneProximalRepressorPerTF === true) &&
        (!filters.sameTFforAllActivatingRIs || region.sameTFforAllActivatingRIs === true)
      );
    });
    setDisplayData(filteredResults);
  };

  const handleClearFilters = () => {
    console.log("Limpiando filtros...");
    setFilters({ ...initialFilterState });
    setDisplayData(processedData || []);
    setError(null);
  };

  const tableData = useMemo(() => {
    if (!Array.isArray(displayData)) return [];
    return displayData.map(entry => {
      const formattedEntry = { ...entry };
      if (Array.isArray(formattedEntry.regulators)) { formattedEntry.regulators = formattedEntry.regulators.join(', '); }
      else { formattedEntry.regulators = String(formattedEntry.regulators || ''); }
      if (Array.isArray(formattedEntry.riTypesPresent)) { formattedEntry.riTypesPresent = formattedEntry.riTypesPresent.join(', '); }
      else { formattedEntry.riTypesPresent = String(formattedEntry.riTypesPresent || ''); }

      formattedEntry.activatorHasRepressingRIs = formattedEntry.activatorHasRepressingRIs ? 'Yes' : 'No';
      formattedEntry.oneProximalRepressorPerTF = formattedEntry.oneProximalRepressorPerTF ? 'Yes' : 'No';
      formattedEntry.sameTFforAllActivatingRIs = formattedEntry.sameTFforAllActivatingRIs ? 'Yes' : 'No';
      return formattedEntry;
    });
  }, [displayData]);

  const memoizedTable = useMemo(() => {
    if (!tableData || tableData.length === 0 || isLoading || error) { return null; }
    return (<Box mt={3}>
      <Typography variant="h6" gutterBottom> Processed Regulatory Regions ({displayData.length} found)
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader size="small" aria-label="sticky results table">
            <TableHead> <TableRow> {columns.map((column) => (<TableCell key={column.accessor} sx={{ fontWeight: 'bold' }}> {column.label} </TableCell>))}
            </TableRow>
            </TableHead>
            <TableBody> {tableData.map((row, rowIndex) => (<TableRow hover tabIndex={-1} key={row.regionId || rowIndex}> {columns.map((column) => {
              const value = row[column.accessor];
              return (<TableCell key={column.accessor}> {value} </TableCell>);
            })} </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>);
  }, [tableData, columns, isLoading, error, displayData.length]);

  return (
    <Box p={3} maxWidth="xl" mx="auto">
      
      <Typography variant="h5" component="h1" color="primary" align="center" sx={{ fontWeight: 'bold', mb: 1 }}> RegulonExplorer </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}> Define your filters to explore regulatory regions </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}><Stack spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FileSelectionCard {...{ selectedFile, isLoading, error, processedData, handleFileChange, handleProcessFile }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PredefinedRegionTypesCard {...{ filters, handleChange }} />
            </Grid>
          </Grid>
          <RegulatorCompositionCard {...{ filters, handleChange }} />
        </Stack>
        </Grid>
        <Grid item xs={12} lg={6}><Stack spacing={2}>
          <GeneralConfigurationCard {...{ filters, handleChange, filterOptions }} />
          <ProximalSiteRangeCard {...{ filters, handleChange }} />
        </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 4 }}>
        <Grid><RegulatoryInteractionsCard {...{ filters, handleChange }} /></Grid>
        <Grid><ProximalSitesCard {...{ filters, handleChange }} /></Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" disabled={isLoading || !processedData} onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleClearFilters} startIcon={<ReplayIcon />} disabled={isLoading}>
          Clear Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleMenuClick}
          disabled={isLoading || !displayData || displayData.length === 0}
          endIcon={<ArrowDropDownIcon />}
        >
          Export To
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleExport('csv')}>Export as CSV</MenuItem>
          <MenuItem onClick={() => handleExport('tsv')}>Export as TSV</MenuItem>
          <MenuItem onClick={() => handleExport('json')}>Export as JSON</MenuItem>
        </Menu>

      </Stack>
      {memoizedTable}
    </Box>
  );
}