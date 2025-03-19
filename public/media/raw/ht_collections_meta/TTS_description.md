# Transcription Terminator Sites
**Summary**
This collection contains 5 datasets.

**Methodology**

__1. Annotation__

Original data separated by growth conditions.

__2. Uniformization__

TTSs were collected from 3 curated publications, and processed to produce uniform bed-like dataset files with the following fields:

- __chromosome:__ NC_000913.3
- __start:__ Left genomic position. If not reported, will be the same as term_pos
- __stop:__ Right genomic position. If not reported, will be the same as term_pos
- __id:__ Unique TSS ID\n - __term_pos:__ Terminal position reported by authors
- __strand:__ TTS strand reported by authors


When the original data was reported to have coordinates from the NC_000913.2 version of the genome, they were converted to the latest version NC_000913.3 using the online converter provided by biocyc: https://biocyc.org/ECOLI/map-seq-coords-form?chromosome=COLI-K12 
