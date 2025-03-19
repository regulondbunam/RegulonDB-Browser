import React from 'react';
import { featureMapData } from '../featureMapData';
import DrawOptions from './DrawOptions';

import DataOptions from './Data';

const CustomForm = ({state = featureMapData, dispatch, handleToDraw=()=>{}}) => {

  return (
      <div>
        <DataOptions state={state} dispatch={dispatch} handleToDraw={handleToDraw} />
        <DrawOptions state={state} dispatch={dispatch} />
      </div>
  );
};

export default CustomForm;

/**
 

        <Grid item xs={12}>
          <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="options-content"
              id="options-header"
            >
              <Typography variant="h6">Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="labels" />}
                    label="Labels"
                  />
                  <FormControlLabel
                    control={<Checkbox name="scaleBar" />}
                    label="Scale Bar"
                  />
                  <TextField
                    label="Step"
                    type="number"
                    variant="outlined"
                    size="small"
                    style={{ width: '80px', marginLeft: '10px', marginRight: '10px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="From"
                    type="number"
                    variant="outlined"
                    size="small"
                    style={{ width: '80px', marginRight: '10px' }}
                  />
                  <TextField
                    label="To"
                    type="number"
                    variant="outlined"
                    size="small"
                    style={{ width: '80px', marginRight: '10px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox name="origin" />}
                    label="Origin"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
 */