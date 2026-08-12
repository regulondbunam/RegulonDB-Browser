export const searchOrganisms = (
  organisms,
  term,
  limit = 20
) => {

  if (
    !term ||
    term.length < 3
  ) {
    return [];
  }

  const search =
    term.toLowerCase();

  return organisms
    .filter((item) => {

      return [
        item.name,
        item.strainName,
        item.plasmidName,
        item._id,
      ]
        .filter(Boolean)
        .some((value) =>
          value
            .toLowerCase()
            .includes(search)
        );
    })
    .slice(0, limit);
};