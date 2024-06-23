import React, { useReducer } from "react";
import { useGetGeneticElements } from "webServices/queries";
import { MOVE, REDUCER, ZOOM, OBJECT_TYPES, CONTROLS_POSITIONS, FOCUS_TYPE } from "./static";
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
  controlsPosition = CONTROLS_POSITIONS.UP_RIGHT,
  draw = true,
  focusElements,
  focusType = FOCUS_TYPE.BORDER,
  height = 300,
  id = "trackExample",
  leftEndPosition,
  objectType = OBJECT_TYPES,
  parentDispatch = () => { },
  rightEndPosition,
  strand = "both",
  showTable = true,
  showControls = true,
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
      showControls,
    },
    processObjectType
  );
  const { geneticElements } = useGetGeneticElements({
    ...state,
  });
  const name =
    "regulonDB_dtt-" + state.leftEndPosition + "-" + state.rightEndPosition;
  let controlStyle = { display: "flex" }
  if (controlsPosition.includes("r")) {
    controlStyle["flexDirection"] = "row-reverse"
  }
  if (!showControls) {
    controlStyle.display = "none"
  }
  //console.log(state.initialProps);
  const controls = <div style={controlStyle}>
    <Controls
      idTrack={id}
      name={name}
      geneticElements={geneticElements}
      state={state}
      dispatch={dispatch}
    />
  </div>
  return (
    <div>
      {controlsPosition.includes("u") && controls}
      <div>
        <DrawTrack
          focusElements={focusElements}
          focusType={focusType}
          trackId={id}
          geneticElements={geneticElements}
          {...state}
          height={height}
          showTable={state.showTable}
        />
      </div>
      {controlsPosition.includes("b") && controls}
    </div>
  );
}

export { CONTROLS_POSITIONS, FOCUS_TYPE }
