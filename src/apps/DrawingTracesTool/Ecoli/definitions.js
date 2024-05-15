const MAX_RANGE = 4_639_676;
const RANGE = { min: 1, max: MAX_RANGE };
const SECURE_RANGE = 250_000;
const secureRange = (leftEndPosition, rightEndPosition) => {
  return (rightEndPosition - leftEndPosition < SECURE_RANGE) && (leftEndPosition < rightEndPosition);
};
const STRAND = {
  both: "both",
  forward: "forward",
  reverse: "reverse",
};
const GE_DEFs = [
  {
    key: "gene",
    label: "Gene",
    isCheck: true,
  },
  {
    key: "promoter",
    label: "Promoter",
    isCheck: true,
  },
  {
    key: "tf_binding_site",
    label: "TF Binding Site",
    isCheck: true,
  },
  {
    key: "operon",
    label: "Operon",
    isCheck: false,
  },
  {
    key: "rna",
    label: "RNA",
    isCheck: false,
  },
  {
    key: "riboswitch",
    label: "Riboswitch",
    isCheck: false,
  },
  {
    key: "translational_attenuator",
    label: "Translational Attenuator",
    isCheck: false,
  },
  {
    key: "transcriptional_attenuator",
    label: "Transcriptional Attenuator",
    isCheck: false,
  },
  {
    key: "ppGpp",
    label: "ppGpp",
    isCheck: false,
  },
];
const STATE_FORM = {
  leftEndPosition: 0,
  rightEndPosition: 0,
  strand: STRAND.both,
  covered: false,
  objectType: [],
  draw: false
};

const FORM_ACTIONS = {
  setLeftPosition: 0,
  setRightPosition: 1,
  setStrand: 2,
  setCovered: 3,
  setGeneticsElements: 4,
  draw: 5,
  clean: 6,
  demo: 7,
  refresh: 8,
};

const HELP = `This graphical tool allows you to visualize the genetic regulatory elements. `

export {
  SECURE_RANGE,
  secureRange,
  RANGE,
  MAX_RANGE,
  STRAND,
  GE_DEFs,
  STATE_FORM,
  FORM_ACTIONS,
  HELP
};

/*

 

1. Set the interval: Specify the genomic range you want to visualize. Easily input the start and end positions, and the tool will generate a graph corresponding to that specific region.

 

2. Choose the elements: Select the genetic elements you wish to display, including genes, promoters, terminators, and more. Mix and match elements as needed, tailoring your graph to your specific requirements.

 

3. Choose the strand: Select the genomic orientation you want to visualize, allowing you to focus on specific genetic strands.

*/