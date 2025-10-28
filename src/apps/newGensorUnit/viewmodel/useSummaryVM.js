export default function useSummaryVM(guData) {
    const gensorUnit = guData?.gensorUnit;

    if (!gensorUnit) {
        console.error("No gensor unitData")
    }


    const name = gensorUnit?.name || gensorUnit?._id;
    const description = gensorUnit?.description;
    const components = gensorUnit?.components;
    const geneOntology = gensorUnit?.geneOntology;
    const groups = gensorUnit?.groups;
    const note = gensorUnit?.note;
    const signalName = gensorUnit?.signalName;
    const summary = gensorUnit?.summary;
    const molecularBiologyLevel = summary?.molecularBiologyLevel?.detailed
    const physiologyLevel = summary?.physiologyLevel.detailed

    return{
        name,
        description,
        components,
        geneOntology,
        groups,
        note,
        signalName,
        molecularBiologyLevel,
        physiologyLevel,
    }

}