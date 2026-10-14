export const buildOrganismTree = (organisms = []) => {
  const tree = {};

  // Ordenar los organismos por especie, cepa y nombre
  const sortedOrganisms = [...organisms].sort((a, b) => {
    const speciesComparison = (a.taxonName || "").localeCompare(
      b.taxonName || "",
      undefined,
      { sensitivity: "base" }
    );

    if (speciesComparison !== 0) {
      return speciesComparison;
    }

    const strainComparison = (a.strainName || "").localeCompare(
      b.strainName || "",
      undefined,
      { sensitivity: "base" }
    );

    if (strainComparison !== 0) {
      return strainComparison;
    }

    const labelA =
      a.type === "chromosome" ? "Chromosome" : a.plasmidName || "";

    const labelB =
      b.type === "chromosome" ? "Chromosome" : b.plasmidName || "";

    return labelA.localeCompare(labelB, undefined, {
      sensitivity: "base",
    });
  });

  sortedOrganisms.forEach((item) => {
    const species = item.taxonName;
    const strain = item.strainName;

    if (!tree[species]) {
      tree[species] = {};
    }

    if (!tree[species][strain]) {
      tree[species][strain] = [];
    }

    tree[species][strain].push(item);
  });

  return tree;
};