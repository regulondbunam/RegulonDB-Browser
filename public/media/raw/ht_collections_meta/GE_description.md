### Gene Expression
__Experiment selection__
We downloaded experiments in four batches over a period of approximately 2 years. Our first batch consisted of 1277 experiments and it was gathered by the manual curation process regularly done by the RegulonDB team. Shortly, original scientific papers about transcriptional regulation in E. coli K-12 are monthly sought, selected, and curated as described previously [Santos-Zavaleta, A., et al. 2019 30395280]; the search was completed by querying directly the ArrayExpress database, where a few datasets were found that are not associated with any publication. The second batch was obtained from dee2.io (Digital Expression Explorer), and covered 1255 experiments that were not present in the initial manual curation. The third batch was downloaded in early 2020 and contained 37 new expression datasets we had not previously retrieved, and our final batch was downloaded in October 2021, and contained 115 experiments published since the third batch.


__Annotation__

For experiments that are present in the Gene Expression Omnibus (GEO), we use Natural Language Processing (NLP) in order to extract experimental metadata to describe experiments (NLP extraction section).  For those experiments that are only present in SRA, we used NCBI's Entrez tool, along with custom software, to gather the metadata.  In particular, we used the python package Beautiful Soup 4 in order to perform web-scraping where metadata was missing, or poorly annotated in Entrez.


__Data gathering__

We initially filtered these datasets based on the type of experiment and sequencing format used, retaining only RNA-seq experiments, and removing those performed with SOLiD sequencing, as our pipeline is tailored towards Illumina sequencing. This collection is up to date as of the end of October 2021.  We then downloaded the fastq files for each of these datasets to be homogeneously processed by our sequence analysis pipeline.


__Data processing and normalization__

We aligned all samples to the E.coli reference genome U00096.3 using HISAT2. Our alignments are always run as unpaired; and when the metadata allows determination of the library preparation kit used, we provide the appropriate strandedness parameters, which indicates whether reads are to be expected on the same, or opposite strand of the mRNA transcript.  To ensure high-quality comparisons using these public expression data, we filtered out some of the samples based on alignment metrics.  We eliminated those samples with less than 5-million raw reads, and those with less than 90% of their reads aligned to the E.coli reference genome.  We also eliminated samples with less than 90% of genes with non-zero coverage. We then perform DEseq-normalization to facilitate comparisons across different datasets.  Shortly, we created a "pseudo-reference" sample, where we obtained the geometric mean of each gene's expression, measured each in counts, fpkm, and tpm.  Each gene in a given sample was divided by its pseudo-reference value, and a scaling factor for each sample was obtained by taking the median of these values. The final DEseq-normalized values are obtained by dividing each sample's expression by the sample scaling factor.
