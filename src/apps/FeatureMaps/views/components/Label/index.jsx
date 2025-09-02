import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useStore} from "../../../store";
import {HANDLE_ANNOTATIONS} from "../../../model/static";

export default function LabelOptions(){
  const { drawState, setHandleAnnotation } = useStore()
    const { handleAnnotation } = drawState.options
    const handleChange = (e) => {
        setHandleAnnotation(e.target.value)
    };

    return(
        <div>
            <FormControl size="small" sx={{maxWidth: 300, m: 1, minWidth: 120}} >
                <InputLabel id="handle-feature-selector">Label Mode</InputLabel>
                <Select
                    labelId="handle-feature-selector"
                    id="handle-feature-selector-opt"
                    value={handleAnnotation}
                    label="Label Mode"
                    onChange={handleChange}
                    variant="outlined"
                >
                    <MenuItem value={undefined}>
                        <em>None</em>
                    </MenuItem>
                    {Object.keys(HANDLE_ANNOTATIONS).map((key) => (
                        <MenuItem value={HANDLE_ANNOTATIONS[key]}>{key}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}