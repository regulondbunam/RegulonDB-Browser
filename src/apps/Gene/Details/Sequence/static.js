/**
 * Object defining supported sequence formats.
 *
 * @type {{ fasta: string; genbank: string; }}
 */
export const FORMATS = {
  fasta: "fasta",
  genbank: "genbank",
};

/**
 * Object defining various options for sequence display and manipulation.
 *
 * @type {{ reset: number; color: number; countItems: number; fasta_CharactersPerLine: number; genbank_Columns: number; }}
 */
export const OPTIONS = {
  reset: -1,
  color: 0,
  countItems: 1,
  fasta_CharactersPerLine: 2,
  genbank_Columns: 3,
  setFragment: 4,
};
