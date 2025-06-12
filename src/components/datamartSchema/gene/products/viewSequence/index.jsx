/**
 # Component (user guide)

# ViewSecuence
	
## Description  
	
Displays a sequence of data in two different formats (FASTA and GenBank) in separate modes. The modes allow the user to toggle the display of the color in the sequence and to download the sequence in file format.

## Category   
Visual 

## Live demo 
	
--

## Installation or Implementation

--

## Usage 
	
--

## Props 
sequence, title
| Attribute | Type | Default | Description                                                 |
| --------- | ---- | ------- | ----------------------------------------------------------- |
|sequence   |string|         |Represents the sequence of data to be displayed in the modal.|
|title      |string|         |Represents the title or name associated with the data sequence.|

## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 
Visual


## Dependencies
React: it is an open source JavaScript library widely used to build interactive user interfaces and reusable components.
Modal: it is a component provided by Material-UI, a UI component library for React.
Box: it is used to create flexible and customizable boxes or containers that can hold content and apply styles through props.
FormGroup: it is a Material-UI component used to group sets of form controls, such as checkboxes and radio buttons.
FormControlLabel: it is a Material-UI component used to associate a label with a form control, such as a checkbox or radio button.
Switch: it is a Material-UI component that provides a visual representation of an on/off switch or a toggled checkbox.
GenebankModal: it displays a specific modal with information in GenBank format.
FastaModal: it manages the display of the sequence in FASTA format and provides options to change the display and download the sequence.

## States
| Property            | Value | Description                                  |
| ------------------- | ----- | -------------------------------------------- |
|_viewFastaSequence   | false |Controls the visibility of the FASTA modal.   |
|_viewGenebankSequence| false |Controls the visibility of the GenBank modal. |
|_color               | false |Controls the color display in the sequence.   |



## Hooks
|  Name  | Description                                 |  Syntax                                         | Additional Notes or References | 
| ------ | -----------------------------------------   | ------------------------------------------------| ------------------------------ |
|useState|Manage local states in function components.  |const [state, setState] = useState(initialState);|                                |
|useRef  |Create and access references to DOM elements.|const myRef = useRef(initialValue);              |                                |

 * **/
import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  FastaSequence,
  GenebankSequence,
  aminoColors
} from "../../../../sequence";
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

/**
 * Description placeholder
 *
 * @export
 * @param {{ sequence: any; title: any; }} { sequence, title }
 * @returns {React.JSX}
 */

const GROUP_MAP = {
  "Nonpolar, Gray": "Nonpolar",
  "Special, Yellow": "Special",
  "Special, Brown": "Special",
  "Polar uncharged, Green": "Polar uncharged",
  "Acidic, Red": "Acidic",
  "Acidic, Dark Red": "Acidic",
  "Basic, Light Blue": "Basic",
  "Basic, Blue": "Basic",
  "Basic, Dark Blue": "Basic"
};

const GROUP_COLORS = {
  "Nonpolar": "rgb(122,122,122)",
  "Special": "rgb(254,215,119)",
  "Polar uncharged": "rgb(56,162,86)",
  "Acidic": "rgb(151,11,19)",
  "Basic": "rgb(74,151,201)"
};

function getCountPerGroup(aminoColors) {
  const counts = {};
  Object.values(aminoColors).forEach(aa => {
    const group = GROUP_MAP[aa.description] || "Other";
    counts[group] = (counts[group] || 0) + 1;
  });
  return Object.entries(counts).map(([group, value]) => ({
    name: group,
    value,
    color: GROUP_COLORS[group] || "#ccc"
  }));
}

function getLettersPerGroup(aminoColors) {
  const groupToLetters = {};
  Object.entries(aminoColors).forEach(([letter, aa]) => {
    const group = GROUP_MAP[aa.description] || "Other";
    if (!groupToLetters[group]) groupToLetters[group] = [];
    groupToLetters[group].push(letter);
  });
  return Object.entries(groupToLetters).map(([group, letters]) => ({
    name: group,
    letters,
    color: GROUP_COLORS[group] || "#ccc"
  }));
}

function PieChartSVG({ aminoColors, size = 180 }) {
  const data = getCountPerGroup(aminoColors);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 10;
  let lastAngle = 0;

  // Convert value to radians
  function describeArc(startAngle, endAngle) {
    const start = {
      x: cx + r * Math.cos(startAngle),
      y: cy + r * Math.sin(startAngle)
    };
    const end = {
      x: cx + r * Math.cos(endAngle),
      y: cy + r * Math.sin(endAngle)
    };
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z'
    ].join(' ');
  }
  return (
      <svg width={size} height={size}>
        {data.map((item, i) => {
          const sliceAngle = (item.value / total) * Math.PI * 2;
          const path = describeArc(lastAngle, lastAngle + sliceAngle);
          const el = (
              <path
                  key={item.name}
                  d={path}
                  fill={item.color}
                  stroke="#fff"
                  strokeWidth="2"
              />
          );
          lastAngle += sliceAngle;
          return el;
        })}
      </svg>
  );
}

const HelpContent = () => (
    <Box sx={{ p: 2 }}>
      <h4>Amino Acid Classification by Chemical Properties</h4>
      <h5 style={{ fontWeight: "normal", color: "#666", marginTop: 0 }}>
        Color-coded by physicochemical class
      </h5>
      <PieChartSVG aminoColors={aminoColors} />
      <div style={{ fontSize: 13, marginTop: "0.7em" }}>
        {getLettersPerGroup(aminoColors).map(g => (
            <div key={g.name} style={{ color: g.color, fontWeight: 500 }}>
      <span style={{
        display: "inline-block",
        width: 12, height: 12, background: g.color, marginRight: 6,
        borderRadius: 2, border: "1px solid #888"
      }}></span>
              {g.name}: {g.letters.join(", ")}
            </div>
        ))}
      </div>
    </Box>
);


export default function ViewSequence({ sequence, title }) {
  const [_viewFastaSequence, set_viewFastaSequence] = React.useState(false);
  const [_viewGenebankSequence, set_viewGenebankSequence] =
    React.useState(false);

    
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const viewFastaSequence = () => set_viewFastaSequence(!_viewFastaSequence);

  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const viewGenebankSequence = () =>
    set_viewGenebankSequence(!_viewGenebankSequence);

  return (
    <div>
      <button className="aBase" onClick={viewFastaSequence}>
        FASTA
      </button>
      <button className="aBase" onClick={viewGenebankSequence}>
        GenBank
      </button>
      <Modal
        open={_viewFastaSequence}
        onClose={viewFastaSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FastaModal
          sequence={sequence}
          title={title}
          onView={viewFastaSequence}
        />
      </Modal>
      <Modal
        open={_viewGenebankSequence}
        onClose={viewGenebankSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GenebankModal
          sequence={sequence}
          title={title}
          onView={viewGenebankSequence}
        />
      </Modal>
    </div>
  );
}

const GenebankModal = React.forwardRef(
  
  /**
   * Description placeholder
   * @date 9/11/2023 - 9:10:03 PM
   *
   * @param {*} props - Component properties.
   * @param {object|function} ref - Reference to the component instance.
   * @returns {React.JSX}
   */
  (props, ref) => {
    const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const color = () => set_color(!_color);

  const [openHelp, setOpenHelp] = useState(false);

  const download = 
   /**
   * Description placeholder
   *
   * @returns {void}
   */
  () => {
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {

      
      /**
       * Description placeholder
       *
       * @type {Blob}
       */
      const blob = new Blob([e.innerText]);

      /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  
  /**
   * Description placeholder
   *
   * @type {{ position: string; top: string; left: string; transform: string; bgcolor: string; border: string; boxShadow: number; p: number; }}
   */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref} >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Genebank FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
              control={<Switch checked={_color} onChange={color} />}
              label="View color in sequence"
          />
          <IconButton
              variant="outlined"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => setOpenHelp(true)}
              title={"Aminoacids classification help"}
          ><LiveHelpIcon/></IconButton>
        </div>
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <GenebankSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
    <Modal open={openHelp} onClose={() => setOpenHelp(false)}>
      <Box
          sx={{
            ...style,
            width: 400,
            outline: "none",
            top: "52%",
            left: "51%",
          }}
      >
        <HelpContent />
        <Button onClick={() => setOpenHelp(false)} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  </Box>
  );
})

const FastaModal = React.forwardRef(
  /**
   * Description placeholder
   * @date 9/11/2023 - 9:10:03 PM
   *
   * @param {*} props - Component properties.
   * @param {object|function} ref - Reference to the component instance.
   * @returns {React.JSX}
   */
  (props, ref) => {

    
  const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  const [openHelp, setOpenHelp] = useState(false);
  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const color = () => set_color(!_color);

  
  /**
   * Description placeholder
   */
  const download = () => {

    
    /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      
      /**
       * Description placeholder
       *
       * @type {Blob}
       */
      const blob = new Blob([e.innerText]);

      
      /**
       * Description placeholder
       *
       * @type {HTMLElement|null}
       */
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  
  /**
   * Description placeholder
   *
   * @type {{ position: string; top: string; left: string; transform: string; bgcolor: string; border: string; boxShadow: number; p: number; }}
   */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>FASTA FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch checked={_color} onChange={color} />}
            label="View color in sequence"
          />
          <IconButton
              variant="outlined"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => setOpenHelp(true)}
              title={"Aminoacids classification help"}
          ><LiveHelpIcon/></IconButton>
        </div>
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <FastaSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
      <Modal open={openHelp} onClose={() => setOpenHelp(false)}>
        <Box
            sx={{
              ...style,
              width: 400,
              outline: "none",
              top: "52%",
              left: "51%",
            }}
        >
          <HelpContent />
          <Button onClick={() => setOpenHelp(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
});
