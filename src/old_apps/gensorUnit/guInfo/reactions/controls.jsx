import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 150,
      },
    },
  };

export default function Controls({ reactions, page, onChange }) {
    return (
        <div>
            <div className='singleReaction_controls_selectReaction' >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p><b>Reaction</b></p>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 13 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={page}
                            label="Reaction"
                            onChange={(event)=>{
                                onChange(event,event.target.value)
                            }}
                            MenuProps={MenuProps}
                        >
                            {
                                [...Array(reactions.length)].map((n,i) => {
                                    return <MenuItem key={"selection_reaction_"+i} value={i + 1}>{i + 1}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <Stack spacing={2}>
                    <Pagination variant="outlined" color="secondary" count={reactions.length} page={page} onChange={onChange} showFirstButton showLastButton />
                </Stack>
            </div>
        </div>
    )
}