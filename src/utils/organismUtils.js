import { DEFAULT_ORGANISM_ID } from "./organismConstants";

export const getSelectedOrganismId = (searchParams) => {
  return searchParams.get("organism") || DEFAULT_ORGANISM_ID;
};