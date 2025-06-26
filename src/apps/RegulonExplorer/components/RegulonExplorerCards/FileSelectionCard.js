// src/components/RegulonExplorerCards/FileSelectionCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import UploadFileIcon from '@mui/icons-material/UploadFile';

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


// Definimos el componente recibiendo props
export default function FileSelectionCard({
  selectedFile,
  isLoading,
  error,
  processedData,
  handleFileChange,
  handleProcessFile
}) {
  return (
    <Card>
      <CardContent>
        <CardHeader
          icon={<UploadFileIcon color="primary"/>}
          title="File Selection"
          tooltip="Load your regulatory interaction data file."
        />
        {/* Usamos las props recibidas */}
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              size="small"
              startIcon={<UploadFileIcon />}
              disabled={isLoading} // Usa prop
            >
              Load File
              <input type="file" hidden onChange={handleFileChange} disabled={isLoading}/> {/* Usa prop */}
            </Button>
            <Button
              variant="contained"
              onClick={handleProcessFile} // Usa prop
              disabled={!selectedFile || isLoading} // Usa props
              size="small"
            >
              {isLoading ? <CircularProgress size={24} /> : 'Process File'} {/* Usa prop */}
            </Button>
          </Stack>
          {/* Usa props para mostrar info */}
          {selectedFile && !isLoading && (
            <Typography variant="caption" sx={{ wordBreak: 'break-all', textAlign: 'center' }}>
              Loaded: {selectedFile.name}
            </Typography>
          )}
          {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
          {processedData && !error && <Alert severity="success" sx={{ width: '100%', mt: 1 }}>Archivo procesado.</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}