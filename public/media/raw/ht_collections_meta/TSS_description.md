# Transcription Start Sites
__Summary__
This collection contains 15 datasets.

__Creation of the collection__

**1. Annotation**

Original data separated by growth conditions

**2. Uniformization**

TSSs were collected from 7 curated publications, and processed to produce uniform bed-like dataset files with the following fields:
- __chromosome:__ NC_000913.3
- __start:__ Left genomic position. If not reported, will be the same as pos_1
- __stop:__ Right genomic position. If not reported, will be the same as pos_1
- __id:__ Unique TSS ID\n- __pos_1:__ TSS +1 position reported by authors
- __strand:__ TSS strand reported by authors

When the original data was reported to have coordinates from the NC_000913.2 version of the genome, they were converted to the latest version NC_000913.3 using the online converter provided by biocyc: https://biocyc.org/ECOLI/map-seq-coords-form?chromosome=COLI-K12 
