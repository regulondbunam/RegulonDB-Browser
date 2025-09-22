import imgDataset from "./media/datasetsExp.png";
import imgDataset1 from "./media/datasetsExp1.png";
import imgDataset2 from "./media/datasetsExp2.png";
import imgDataset3 from "./media/datasetsExp3.png";

export const PLACES_DATA = [
    {
        id: "High_Throughput",
        section: "HT Dataset Collection",
        title: "High Throughput",
        description: `Genomics has set the basis for a variety of methodologies that produce high-throughput datasets identifying the different players that define gene regulation, particularly regulation of transcription initiation and operon organization. 
    We report several collections of HT datasets that hold distinct types of objects (genomic features, TF binding sites, gene expression profiles) from distinct types of HT experiments (RNA-seq, ChIP-seq, gSELEX, DAP-seq, ChIP-exo). `,
        url: "/ht",
        imgUrl: imgDataset,
    },
    {
        id: "GENSOR Unit",
        section: "Browser",
        title: "GENSOR Unit (GUs)",
        description: `The ability of a cell to respond to changes inside the cell or in the environment initiates when the new signal or stimulus is sensed and transmitted through a series of molecular concatenated reactions, called signal transduction or transduction pathways. These events bring into action genetic switches that modify gene expression to produce the adequate response to the cell. We call these processes genetic Sensory Response Units, or Gensor Unit.`,
        url: "/gu",
        imgUrl: imgDataset1,
    },
    {
        id: "coexpression",
        section: "Dataset and Tool",
        title: "Gene Coexpression",
        description: `One of the extensive uses of HT technologies is for the development of global expression profiles. As mentioned before, dedicated databases with information on E. coli include COLOMBOS.
    To quantify coexpression for all combinations of gene pairs, we implemented a rank-based approach, using data available in COLOMBOS version 2.0, which contains expression profiles of 2470 different, contrasting conditions.`,
        url: "/coexpression",
        imgUrl: imgDataset2,
    },
    {
        id: "DTT",
        section: "Tool",
        title: "Drawing Traces Tool (DTT)",
        description: `Genetic elements drawing tool, utilizing information from RegulonDB or provided by the user. Features such as genes, promoters, operons, DNA binding sites, and any other genetic element have been designed for accurate representation.`,
        url: "/dtt",
        imgUrl: imgDataset3,
    },
];