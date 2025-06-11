import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components";
import DrawingTracesTool from "../../components/DrawingTracesTool";
import {
  Gene,
  Product,
  Regulation,
  useIndexedCitation,
  AllCitations,
  MultifunTerms,
} from "../../components/datamartSchema";
import RelatedTool from "./components/relatedTool";

export default function Information({ geneData }) {
  const citations = useIndexedCitation(geneData.allCitations);
  let relationTool = null;
  let dtt = null;
  console.log(geneData.gene);
  if (geneData.gene.leftEndPosition || DataVerifier.isValidArray(geneData.gene.fragments) ) {
    relationTool = <RelatedTool {...geneData} />;
    dtt = (
      <DrawingTracesTool
        context="gene"
        height={200}
        id={geneData._id}
        leftEndPosition={geneData.gene.leftEndPosition}
        rightEndPosition={geneData.gene.rightEndPosition}
        fragments={geneData.gene.fragments}
      />
    );
  } 
  const sections = useMemo(() => {
    let tabsInfo = [];
    if (geneData?.gene) {
      tabsInfo.push({
        id: "GeneTab_Description",
        label: "Description",
        title: "Description",
        component: (
          <div style={{ margin: "0% 1% 1% 2%" }}>
            <Gene
              {...geneData.gene}
              allCitations={citations.indexedCitations}
              viewTitle={false}
              products={geneData.products}
            />
          </div>
        ),
      });
      if (DataVerifier.isValidArray(geneData.gene.multifunTerms)) {
        tabsInfo.push({
          id: "GeneTab_MultifunTerms",
          label: "MultifunTerms",
          title: "MultifunTerms",
          component: (
            <div
              style={{
                margin: "0% 1% 1% 2%",
                minHeight: "150px",
                paddingTop: "20px",
              }}
            >
              <MultifunTerms multifunTerms={geneData.gene.multifunTerms} />
            </div>
          ),
        });
      }
    }
    if (geneData?.regulation) {
      tabsInfo.push({
        id: "GeneTab_Regulation",
        label: "Regulation",
        title: "Regulation",
        component: (
          <div style={{ margin: "0% 1% 1% 2%" }}>
            <Regulation {...geneData.regulation} />
          </div>
        ),
      });
    }
    let products = geneData.products;
    if (DataVerifier.isValidArray(products)) {
      products.forEach((product) => {
        let productName = DataVerifier.isValidString(product.name)
          ? product.name
          : "";
        tabsInfo.push({
          id: "GeneTab_Product_" + product._id,
          label: (
            <span
              dangerouslySetInnerHTML={{
                __html: `Product: ${productName.substring(0, 10)}...`,
              }}
            />
          ),
          tooltip: `Product: ${productName}`,
          title: (
            <span
              dangerouslySetInnerHTML={{ __html: `Product: ${productName}` }}
            />
          ),
          component: (
            <div style={{ margin: "0% 1% 1% 2%" }}>
              <Product
                key={`product_${product._id}`}
                {...product}
                allCitations={citations.indexedCitations}
              />
            </div>
          ),
        });
      });
    }

    if (DataVerifier.isValidArray(geneData.allCitations)) {
      tabsInfo.push({
        id: "GeneTab_Citations",
        label: "All Evidences and References",
        title: "All Evidences and References",
        component: (
          <div style={{ overflow: "auto" }}>
            <AllCitations {...citations} />
          </div>
        ),
      });
    }
    return tabsInfo;
  }, [geneData, citations]);

  return (
    <AnchorNav
      sections={sections}
      header={dtt}
      aside={relationTool}
      title={`Gene ${geneData.gene.name}`}
    />
  );
}
