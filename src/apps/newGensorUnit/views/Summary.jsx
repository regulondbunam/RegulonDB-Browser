import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Style from "./summary.module.css";
import useSummary from "../viewmodel/useSummaryVM";
import GeneOntology from "../components/GeneOntology"

const AccordionItem = ({ children, title = "title" }) => (
  <Accordion defaultExpanded >
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <p className={Style.accordionTitle}>{title}</p>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

export default function Summary({ guData }) {
  const {
    //name,
    description,
    components,
    geneOntology,
    groups,
    note,
    signalName,
    molecularBiologyLevel,
    physiologyLevel,
  } = useSummary(guData);
  return (
    <div className={Style.container}>
      {molecularBiologyLevel && (
        <AccordionItem title="Molecular Biology Level">
          <p className={Style.bodyText}>{molecularBiologyLevel}</p>
        </AccordionItem>
      )}
      {physiologyLevel && (
        <AccordionItem title="Physiology Level">
          <p className={Style.bodyText}>{physiologyLevel}</p>
        </AccordionItem>
      )}
      {description && (
        <AccordionItem title="Description">
          <p className={Style.bodyText}>{description}</p>
        </AccordionItem>
      )}
      {signalName && (
          <AccordionItem title="Signal Name">
            <p className={Style.bodyText}>{signalName.join(", ")}</p>
          </AccordionItem>
      )}
      {groups && <AccordionItem title="Groups"><Groups groups={groups} /></AccordionItem>}
      {note && <AccordionItem title="Note">note</AccordionItem>}
      {geneOntology && (
        <AccordionItem title="Gene Ontology"><GeneOntology geneOntology={geneOntology} /></AccordionItem>
      )}
      {components && (
          <AccordionItem title="Components">components</AccordionItem>
      )}
    </div>
  );
}


const Groups = ({groups = []})=>{
  return (
    <div>
      {groups.map((group, index)=>{
        return (
          <div key={"group_"+index+"_"+group}>
            <p className={Style.groupText} >{group}</p>
          </div>
        )
      })}
    </div>)
}