export const getOrganismDisplayName = (organism) => {
  if (!organism) return "";

  let label = `${organism.name} - ${organism.strainName}`;

  if (organism.type === "plasmid" && organism.plasmidName) {
    label += ` - ${organism.plasmidName} (Plasmid)`;
  }

  return label;
};

export const getRecentOrganismLabel = (
  organism
) => {
  if (!organism) return "";

  if (organism.type === "plasmid" && organism.plasmidName) {
    return `${organism.strainName} (${organism.plasmidName})`;
  }

  return organism.strainName;
};