import conf from "./conf.json";
import { generateNodes } from "./nodes";
// las funciones que estan aqui abajo son las independientes
function generateRow(component, nameReaction) {
  return {
    data: {
      id: component.name + "Row" + nameReaction,
      class: conf.rowStyles[component.function],
      associatedReaction: [nameReaction],
      cardinality: 0,
      source: component.function === "product" ? nameReaction : component.name,
      target: component.function === "product" ? component.name : nameReaction,
      bendPointPositions: [],
      portSource: nameReaction,
      portTarget: component.name,
      function: component.function,
    },
  };
}

function findParentNode(reactionComponents, addedElements) {
  let father = false;
  reactionComponents.forEach((component) => {
    if (
      addedElements.includes(component.name) &&
      component.function !== "activator"
    ) {
      father = addedElements.filter((elemento) => {
        return elemento.data.id === component.name;
      })[0];
    }
  });
  return father;
}

/*recibe como parametro el componente del que se generara el nodo , la lista general de componentes
la informacion de las reacciones {nameReaction:<nombreReaccion>, type: <tipo de la reaccion>}
por ultimo la posicion que tomara */
function associateReactions(nodo, nameReaction) {
  //evalua si es complejo, si es complejo el campo data no estara disconible enseguida
  if (nodo.data) {
    //Si no es complejo
    nodo.data.associatedReaction.push(nameReaction);
  } else {
    //Si es complejo
    nodo.forEach((nodoComplejo) => {
      nodoComplejo.data.associatedReaction.push(nameReaction);
    });
  }
}

export default function BuildMap(components, reactions) {
  let capas = conf.layers;
  let mapElements = [];
  let addedItemsList = [];
  let position;
  reactions.forEach((reaction) => {
    let capa = capas[reaction.type];
    if (capa.numberReactions % 2) {
      capa.x = capa.x * -1;
    }
    let elementoRepetido = findParentNode(reaction.components, mapElements);
    if (elementoRepetido) {
      position = { x: elementoRepetido.position.x, y: capa.y };
    } else {
      position = { x: capa.x, y: capa.y };
    }

    let infoReaction = {
      nameReaction: "R" + reaction.number,
      type: reaction.type,
    };

    //ciclo que angrega los nodos que le pertenecen a cada reaccion
    reaction.components.forEach((component) => {
      if (!addedItemsList.includes(component.name)) {
        //(component, components, infoReaction, position)
        let generatedNode = generateNodes(
          component,
          components,
          infoReaction,
          position
        );
        if (Array.isArray(generatedNode)) {
          mapElements = [...mapElements, ...generatedNode];
          addedItemsList = [...addedItemsList, ...generatedNode];
        } else {
          mapElements.push(generatedNode);
          addedItemsList.push(generatedNode);
        }
      } else {
        mapElements
          .filter((element) => {
            return component.name == element.data.id;
          })[0]
          .data.associatedReaction.push("R" + reaction.number);
      }

      mapElements.push(generateRow(component, infoReaction.nameReaction));
    });
    //Se agrega el nodo de la reaccion
    mapElements.push(generateNodes(false, components, infoReaction, position));
    capa.x = capa.numberReactions % 2 ? capa.x * -1 : capa.x + 200;

    capa.numberReactions++;
  });
  return mapElements;
}
