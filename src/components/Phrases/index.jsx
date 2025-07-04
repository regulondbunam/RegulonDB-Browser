import { useEffect, useState } from "react";
import { useLazyGetPhraseByObjectId } from "../webservices/phrases";
import PhrasePanel from "./PhrasePanel";

const icon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUJJREFUSEvtlbFOwzAQhv9zVSgbI1vkN4CNN6jYutEwMdKRDRQhjEjEyEg3YCEZ+wasbDxCGhbWbq2IHKOEWkqaJhhFZUrG5L/7/jufL4QNP7Th/GgMOHbDQ0bMV0nyHFxxsWq4EWB4Gwpi7DpNqpLkphZwKsLeV7dzr6DOym2jyXYs7SfBF/lvVYA0l9ZmFQzd6JMIewbnMZvHCZ8IPsviKiqwvUgBmPqOxTPA8gUINN6K5fmqU9uN7kC40AZ8x/oxVg9AqisAdGBVJdpIC6g867ZF2VjV3YV1LQLr9MGkHVzyqY7N6xqNqck4/y8gvcnrdhEB4xfHGuVLP/E+Hqq0Csj2WekmG+yiP0lKAAV6W8TySC+zNNtAhLs7XXoEaFDMTsE8lqOylr0C2C9UYGrL9qL3ZeCBaUyjH44JpAX82qVvTQ0qKDtRnw4AAAAASUVORK5CYII=)"

export default function Phrases() {
  const { getPhrasesInProperty } = useLazyGetPhraseByObjectId();
  const [open, setOpen] = useState(false);
  const [element, setElement] = useState();

  const loadPhrases = async () => {
    const phraseElement = document.createElement("div");
    phraseElement.style.width = "24px";
    phraseElement.style.height = "24px";
    phraseElement.style.backgroundImage = icon
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
              associatedProperty.toLowerCase(),
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
