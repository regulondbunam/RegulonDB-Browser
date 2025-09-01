import React, {useMemo } from "react";
import {
  FilterTable,
  DataVerifier,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";
import {
  ParagraphCitations,
  PC_VARIANTS,
  CITATION_SIZE,
} from "../../../../components/datamartSchema";
import { LinealSequence } from "../../../../components/sequence";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FeatureMap from "./FeatureMaps";
//import Map from "../../../FeatureMaps/Map";

const COLUMNS = [
  {
    id: "activeConformation_name",
    header: "Active Conformation Name",
    filter: "fuzzyText",
    accessorKey: "_activeConformation_name",
    cell: (info) => (
      <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
  {
    id: "regulatoryInteraction_function",
    header: "Function",
    filter: "fuzzyText",
    accessorKey: "_regulatoryInteraction_function",
  },
  {
    id: "regulatedEntity_name",
    filter: "fuzzyText",
    header: "Regulated Entity Name",
    accessorKey: "_regulatedEntity_name",
  },
  {
    id: "regulatedEntity_type",
    filter: "fuzzyText",
    header: "Regulated Entity Type",
    accessorKey: "_regulatedEntity_type",
  },
  {
    id: "regulatoryInteraction_distanceTo_gene",
    filter: "fuzzyText",
    header: "Distance to First Gene",
    accessorKey: "_distanceGene",
  },
  {
    id: "regulatoryInteraction_distanceTo_promoter",
    filter: "fuzzyText",
    header: "Distance to Promoter",
    accessorKey: "_distancePromoter",
  },
  {
    id: "regulatedGenes_name",
    header: "Regulated Genes",
    accessorKey: "_regulatedGenes_name",
    filter: "fuzzyText",
    cell: (info) => {
      const genes = info.row.original.regulatedGenes;
      return (
        <div style={{display: "flex"}} >
          {genes.map((gene) => (
            <div style={{marginLeft: "5px"}} key={
              "ri_" + info.row.original.id + "_regulatedGene_" + gene._id
            }>
              <Link to={"/gene/" + gene._id}>
              <p dangerouslySetInnerHTML={{ __html: gene.name }} />
            </Link>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "regulatoryBindingSite_leftPos",
    filter: "fuzzyText",
    header: "RBS LeftEndPosition",
    accessorKey: "_regulatoryBindingSite_LeftPos",
  },
  {
    id: "regulatoryBindingSite_RightPos",
    filter: "fuzzyText",
    header: "RBS RightEndPosition",
    accessorKey: "_regulatoryBindingSite_RightPos",
  },
  {
    id: "regulatoryBindingSite_strand",
    filter: "fuzzyText",
    header: "Strand",
    accessorKey: "_regulatoryBindingSite_strand",
  },
  {
    id: "regulatoryBindingSite_sequence",
    filter: "fuzzyText",
    header: "Sequence",
    accessorKey: "_regulatoryBindingSite_sequence",
    cell: (info) => {
      const sequence = info.row.original._regulatoryBindingSite_sequence
      const id = info.row.original.id
      return <div className="sequenceRowContainer">
        <LinealSequence sequenceId={"sequence_"+id} sequence={sequence} controls={false} height={10} color />
      </div>
    },
  },
  {
    id: "confidenceLevel",
    header:  <p>Confidence Level <b><i> C: Confirmed</i>, S: Strong</b>, W Weak</p>,
    accessorKey: "_confidenceLevel",
    filter: "fuzzyText",
    cell: (info) => {
      const confidenceLevel = info.row.original._confidenceLevel
      switch (confidenceLevel) {
        case "W":
          return "W"
        case "S":
          return <b>{"S"}</b>
        case "C":
          return <b><i>{"C"}</i></b>
        default:
          return ""
      }
    },
  },
  {
    id: "citations",
    header:  "Evidence & Citations [publication | Evidences]",
    accessorKey: "_citations",
    filter: "fuzzyText",
    cell: (info) => {
      const citations = info.row.original.citations;
      const allCitations = info.row.original.allCitations;
      return (
        <ParagraphCitations
          variant={PC_VARIANTS.paragraph}
          citationSize={CITATION_SIZE.ONLY_INDEX}
          allCitations={allCitations}
          citations={citations}
        />
      );
    },
  },
];

function formatData(regulatoryInteractions = [], allCitations) {
  let data = [];
  if (DataVerifier.isValidArray(regulatoryInteractions)) {
    regulatoryInteractions.forEach((ri, index) => {
      let _regulatedEntity_name = "";
      let _regulatedEntity_type = "";
      if (DataVerifier.isValidObject(ri.regulatedEntity)) {
        _regulatedEntity_name = ri.regulatedEntity.name;
        _regulatedEntity_type =
          ri.regulatedEntity.type === "transcriptionUnit"
            ? "TU"
            : ri.regulatedEntity.type;
      }
      let _activeConformation_name = "";
      let _activeConformation_type = "";
      if (DataVerifier.isValidObject(ri.activeConformation)) {
        _activeConformation_name = ri.activeConformation.name;
        _activeConformation_type = ri.activeConformation.type;
      }
      let _regulatedGenes_name = "";
      let regulatedGenes = [];
      if (DataVerifier.isValidArray(ri.regulatedGenes)) {
        _regulatedGenes_name = ri.regulatedGenes
          .map((gene) => gene.name)
          .join("; ");
        regulatedGenes = ri.regulatedGenes;
      }
      let _regulatoryInteraction_function = ri.function;
      let _distanceGene = ri.distanceToFirstGene;
      let _distancePromoter = ri.distanceToPromoter;
      let citations = ri.citations;
      let _regulatoryBindingSite_LeftPos = "";
      let _regulatoryBindingSite_RightPos = "";
      let _regulatoryBindingSite_strand = "";
      let _regulatoryBindingSite_sequence = "";
      if (DataVerifier.isValidObject(ri.regulatoryBindingSites)) {
        if (
          DataVerifier.isValidNumber(ri.regulatoryBindingSites.leftEndPosition)
        ) {
          _regulatoryBindingSite_LeftPos =
            ri.regulatoryBindingSites.leftEndPosition;
          _regulatoryBindingSite_RightPos =
            ri.regulatoryBindingSites.rightEndPosition;
        }
        _regulatoryBindingSite_strand = ri.regulatoryBindingSites.strand;
        _regulatoryBindingSite_sequence = ri.regulatoryBindingSites.sequence;
        if (DataVerifier.isValidArray(ri.regulatoryBindingSites.citations)) {
          if (ri.regulatoryBindingSites.citations.length > citations.length)
            citations = ri.regulatoryBindingSites.citations;
        }
      }
      data.push({
        id:
          "ri_" + index + "_" + ri._id + "_" + ri.regulatoryBindingSites.strand,
        _regulatedEntity_name: _regulatedEntity_name,
        _regulatedEntity_type: _regulatedEntity_type,
        _activeConformation_name: _activeConformation_name,
        _activeConformation_type: _activeConformation_type,
        _regulatedGenes_name: _regulatedGenes_name,
        regulatedGenes: regulatedGenes,
        _regulatoryInteraction_function: _regulatoryInteraction_function,
        _distanceGene: _distanceGene,
        _distancePromoter: _distancePromoter,
        _regulatoryBindingSite_RightPos: _regulatoryBindingSite_RightPos,
        _regulatoryBindingSite_LeftPos: _regulatoryBindingSite_LeftPos,
        _regulatoryBindingSite_strand: _regulatoryBindingSite_strand,
        _regulatoryBindingSite_sequence: _regulatoryBindingSite_sequence,
        citations: citations,
        allCitations: allCitations,
        _confidenceLevel: ri.confidenceLevel,
        _citations: "",
      });
    });
  }
  return data;
}

function RegulatoryInteractions(props) {
  const [viewOption, setViewOption] = React.useState(0);

  const handleChange = (event) => {
    setViewOption(event.target.value);
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          view Option
        </InputLabel>
        <Select
            variant="standard"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={viewOption}
          onChange={handleChange}
          label="View Option"
        >
          <MenuItem value={0}>Table</MenuItem>
          <MenuItem value={1}>Feature Map (to promoter)</MenuItem>
          <MenuItem value={2}>Feature Map (to gene)</MenuItem>
        </Select>
      </FormControl>
      <br />
      {viewOption === 0 && <RITable {...props} />}
      {viewOption === 1 && <FeatureMap  {...props} type="promoter" />}
      {viewOption === 2 && <FeatureMap  {...props} type="gene" />}
    </div>
  );
}



function RITable({ regulatoryInteractions, allCitations, tfName}) {
  const data = useMemo(() => {
    return formatData(regulatoryInteractions, allCitations);
  }, [regulatoryInteractions, allCitations]);
  //console.log(regulatoryInteractions);
  return  <FilterTable data={data} columns={COLUMNS} fileName={tfName} />;
}

export default RegulatoryInteractions;
