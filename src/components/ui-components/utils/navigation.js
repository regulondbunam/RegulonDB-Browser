export const buildUrlWithOrganism = (
  path,
  organismId
) => {

  if (!organismId) {
    return path;
  }

  return `${path}?organism=${organismId}`;
};