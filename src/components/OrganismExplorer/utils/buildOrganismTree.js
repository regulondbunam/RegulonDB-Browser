export const buildOrganismTree = (organisms = []) => {
  const tree = {};

  organisms.forEach((item) => {
    const species = item.name;
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