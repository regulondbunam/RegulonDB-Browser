import { useEffect, useState } from "react";
import { useLazyGetPhraseByObjectId } from "../webservices/phrases";
import PhrasePanel from "./PhrasePanel";

export default function Phrases() {
  const { getPhrasesInProperty } = useLazyGetPhraseByObjectId();
  const [open, setOpen] = useState(false);
  const [element, setElement] = useState();

  const loadPhrases = async () => {
    const phraseElement = document.createElement("div");
    phraseElement.style.width = "24px";
    phraseElement.style.height = "24px";
    phraseElement.style.float = "left";
    phraseElement.style.backgroundImage =
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAMdJREFUSEvtlcENwjAMRV8nATaBSYBJgEnoKGUSugn0i0SK3NRpDpU4xMfUfv620p+ODaPbkI2F751mo/lWzE3hb8ArGIAXsAMuhYkPU86Ywj+hwCqMHNvYy7tOQnsLV4G65uIO3KTIyXmGqarhWoWKe0DFuWjwtpbfBtptyd6E/16LJD8yuuWIMq7099ck1szO4WzmLSXLrXlXTsCQuuJxwc+lLipKG2jCJduVuc1eIk9dtFytSMqKUfuGajrBV0UtfBU0Jn0BcJdgGJko4YkAAAAASUVORK5CYII=')";

    const items = document.getElementsByClassName("phraseElement");
    if (items && items.length > 0) {
      for (const item of Array.from(items)) {
        const data = item.dataset;
        if (
          Object.hasOwn(data, "phraseObjectId") &&
          Object.hasOwn(data, "phraseAssociatedProperty")
        ) {
          const objectId = data.phraseObjectId;
          const associatedProperty = data.phraseAssociatedProperty;
          const objectPhraseId =
            "phrase-object-" + objectId + "-" + associatedProperty;
          if (!document.getElementById(objectPhraseId)) {
            const phrases = await getPhrasesInProperty(
              associatedProperty,
              objectId,
            );
            if (phrases) {
              phraseElement.id = objectPhraseId;
              phraseElement.onmouseenter = (event) => {
                setElement({
                  associatedProperty,
                  objectId,
                  phrases: [...phrases],
                  position: {
                    x: event.pageX,
                    y: event.pageY,
                  },
                });
              };
              phraseElement.onmouseout = () => {
                //setElement(null)
              };
              item.insertAdjacentElement("afterend", phraseElement);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const targetNode = document.body;
    const config = {
      childList: true,
    };
    const callback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          loadPhrases();
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  console.log(element);

  if (element) {
    const pos = element.position;
    return (
      <div
        style={{
          position: "absolute",
          top: pos.y,
          left: pos.x,
          zIndex: 100,
          backgroundColor: "white",
          width: "300px",
          boxShadow: "6px 8px 8px grey"
      }}
        onMouseLeave={()=>{setElement(null)}}
      >
        <PhrasePanel phrases={element.phrases} />
      </div>
    );
  }

  return <div id="phrase-manager" />;
}
