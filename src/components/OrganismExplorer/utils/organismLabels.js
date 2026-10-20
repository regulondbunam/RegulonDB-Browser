export const getCurrentOrganismLabel = (organism) => {
  if (!organism) {
    return "No organism selected";
  }

  let label =`${organism.name} - ${organism.strainName}`;

  if (organism.type === "plasmid" && organism.plasmidName) {
    label += ` - ${organism.plasmidName} (Plasmid)`;
  }

  return label;
};