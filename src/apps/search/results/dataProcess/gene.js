import { DataVerifier } from "../../../../components/ui-components";

export default function geneFormatResults(geneData, keyword = "") {
    let results = []
    if (DataVerifier.isValidArray(geneData)) {
        geneData.forEach((gene) => {
            let products = ""
            if (DataVerifier.isValidArray(gene.products)) {
                products = ", " + gene.products.map(product => { return product.name }).join(', ')
            }
            //let re = new RegExp(`${keyword}`, "gm");
            let title = gene.gene.name + " (" + gene.gene.bnumber + ")" + " " + products
            let matches = title.matchAll(keyword)
            let score = [...matches].length
            title = title.replaceAll(keyword, "<b>" + keyword + "</b>")
            results.push({
                _id: gene._id,
                data: gene,
                type: "gene",
                title: title,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}
