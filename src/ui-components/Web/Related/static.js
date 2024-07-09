export const OBJECT_TYPE = {
    OPERON: "operon"
}

/**
 * Convert the object type code to a readable label.
 * @param {string} objectType - The object type code.
 * @return {object} The readable label for the object type.
 */
export function getObjectTypeLabel(objectType) {
    const objectTypeMap = {
      GN: { link: "gene", label: "Gene" },
      TU: { link: "tu", label: "Transcription Unit" },
      TF: { link: "regulon", label: "Regulon" },
      OP: { link: "operon", label: "Operon" },
      // Add more mappings as needed
    };
    return objectTypeMap[objectType] || {};
  }