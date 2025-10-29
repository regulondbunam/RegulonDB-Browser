import { useState } from "react";

export default function useController(geneOntology) {
  const [viewOption, setViewOption] = useState(0);

  const viewOptions = ["Ontologies", "Genes"]

  const handleToChangeViewOption = (event) => {
    const option = event.target.value;
    setViewOption(option)
  }


  return{
    viewOption,
    viewOptions,
    handleToChangeViewOption,
  }

}