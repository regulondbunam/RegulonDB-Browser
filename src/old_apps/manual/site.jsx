//import { useMemo } from "react";
import { Cover, AnchorNav, DataVerifier } from "../../components/ui-components";
import Section from "./section";


export default function Site(siteData,section) {
    let sections = [];
    if (DataVerifier.isValidArray(siteData.sections)) {
      siteData.sections.forEach((section,i) => {
        sections.push({
          id: "section_"+i,
          label: section.title,
          title: section.title,
          component: (
            <div style={{ margin: "0% 1% 1% 2%" }}>
              <Section urlRaw={section.rawUrl} />
            </div>
          ),
        });
      });
    }

  return (
    <div>
      <Cover>
        <h1 style={{ fontSize: "xxx-large" }}>{siteData.title}</h1>
      </Cover>
      <AnchorNav
        title={siteData.title}
        sections={sections}
        idSelectSection={section}
      />
    </div>
  );
}

