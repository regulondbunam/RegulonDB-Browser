# Transcription Units

**Summary**

This collection contains 5 datasets.

**Creation of the collection**

**1. Annotation**

Original data separated by growth conditions.

**2. Uniformization** 

TUs were collected from 3 curated publications, and processed to produce uniform bed-like dataset files with the following fields:

- __chromosome:__ NC_000913.3 
- __start:__ Left genomic position
- __stop:__ Right genomic position
- __id:__ Unique TU ID
- __length:__ TU length
- __strand:__ TU strand reported by authors
- __term_type:__ depending on methodology
- __gene_number:__ number of genes entirely contained in TU
- __genes:__ bnumbers of genes entirely contained in TU
- __pseudo:__ 1 if TU contains pseudo genes, else 0
- __phantom:__ 1 if TU contains phantom genes, else 0


When the original data was reported to have coordinates from the NC_000913.2 version of the genome, they were converted to the latest version NC_000913.3 using the online converter provided by biocyc: https://biocyc.org/ECOLI/map-seq-coords-form?chromosome=COLI-K12 

The genes reported in those datasets may differ from the genes originally reported by the authors. Here, we decided to include only the genes which are entirely contained in the TU coordinates, and exclude the others. \n
