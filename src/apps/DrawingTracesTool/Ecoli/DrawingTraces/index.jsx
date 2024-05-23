import React, { useId, useReducer } from "react";
import { useGetGeneticElements } from "webServices/queries";
import { MOVE, REDUCER, ZOOM, OBJECT_TYPES } from "./static";
import DrawTrack from "apps/DrawingTracesTool/DrawingEngine";
import Controls from "./Controls";

function reducer(state, action) {
  switch (action.type) {
    case REDUCER.MoveLeft:
      const moveL = Math.ceil(
        (state.rightEndPosition - state.leftEndPosition) * MOVE
      );
      return {
        ...state,
        rightEndPosition: state.rightEndPosition - moveL,
        leftEndPosition: state.leftEndPosition - moveL,
      };
    case REDUCER.MoveRight:
      const moveR = Math.ceil(
        (state.rightEndPosition - state.leftEndPosition) * MOVE
      );
      return {
        ...state,
        rightEndPosition: state.rightEndPosition + moveR,
        leftEndPosition: state.leftEndPosition + moveR,
      };
    case REDUCER.ZoomIn:
      const zoomIn = Math.ceil(
        (state.rightEndPosition - state.leftEndPosition) * ZOOM
      );
      return {
        ...state,
        rightEndPosition: state.rightEndPosition - zoomIn,
        leftEndPosition: state.leftEndPosition + zoomIn,
      };
    case REDUCER.ZoomOut:
      const zoomOut = Math.ceil(
        (state.rightEndPosition - state.leftEndPosition) * ZOOM
      );
      return {
        ...state,
        rightEndPosition: state.rightEndPosition + zoomOut,
        leftEndPosition: state.leftEndPosition - zoomOut,
      };
    case REDUCER.Reset:
      return { ...action.initialProps, initialProps: action.initialProps };
    default:
      return state;
  }
}

function processObjectType(props) {
  const objectType = [];
  props.objectType.forEach((ge) => {
    if (ge.isCheck) {
      objectType.push(ge.key);
    }
  });
  const newProps = { ...props, objectType: objectType };
  return { ...newProps, initialProps: newProps };
}
/**
 *
 * @param {
 * covered
 * parentDispatch
 * draw
 * id
 * leftEndPosition
 * objectType
 * rightEndPosition
 * strand
 * } = props
 * @returns
 */
export default function DrawingTraces({
  covered = false,
  parentDispatch = () => {},
  draw = true,
  id = "trackExample",
  leftEndPosition,
  rightEndPosition,
  objectType = OBJECT_TYPES,
  strand = "both",
  showTable = true,
  focusElements,
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      covered,
      parentDispatch,
      draw,
      id,
      leftEndPosition,
      objectType,
      rightEndPosition,
      strand,
      showTable,
    },
    processObjectType
  );
  const { geneticElements } = useGetGeneticElements({
    ...state,
  });
  const name =
    "regulonDB_dtt-" + state.leftEndPosition + "-" + state.rightEndPosition;
  //console.log(state.initialProps);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Controls
          idTrack={id}
          name={name}
          geneticElements={geneticElements}
          state={state}
          dispatch={dispatch}
        />
      </div>
      <div>
        <DrawTrack
          focusElements={focusElements}
          trackId={id}
          geneticElements={geneticElements}
          {...state}
          height={300}
          showTable={state.showTable}
        />
      </div>
    </div>
  );
}
