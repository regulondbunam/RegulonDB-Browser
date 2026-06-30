const STORAGE_KEY = "recentOrganisms";

export const getRecentOrganisms = () => {
  const stored =
    localStorage.getItem(STORAGE_KEY);

  return stored
    ? JSON.parse(stored)
    : [];
};

export const saveRecentOrganism = (
  organism
) => {
  let recent =
    getRecentOrganisms();

  recent = recent.filter(
    (item) =>
      item._id !== organism._id
  );

  recent.unshift(organism);

  recent = recent.slice(0, 5);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(recent)
  );
};