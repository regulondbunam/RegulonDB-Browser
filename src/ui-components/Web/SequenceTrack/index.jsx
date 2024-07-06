import React, { useEffect, useReducer, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import Controls from "./Controls";
import DrawSequence from "./drawingEngine";
import { generateRandomString } from "ui-components/utils";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FEATURE_TYPES } from "./statics";

/**
 * Initializes the state for the SequenceTrack component.
 *
 * @param {Object} params - Initialization parameters.
 * @param {number} params.fontSize - Font size for the sequence.
 * @param {boolean} params.color - Color option for the sequence.
 * @param {boolean} params.measure - Measure option for the sequence.
 * @param {string} [params.drawPlaceId] - ID for the draw place.
 * @returns {Object} The initial state.
 */
function initState({ fontSize, color, measure, drawPlaceId }) {
  const id = drawPlaceId ? drawPlaceId : "sequence_" + generateRandomString(7);
  const bpWidth = (fontSize * 8) / 12;
  return {
    id: id,
    bpHeight: (bpWidth * 14) / 8,
    bpWidth: bpWidth,
    fontSize: fontSize,
    canvas: undefined,
    color: color,
    measure: measure,
  };
}

/**
 * Reducer function for updating the state.
 *
 * @param {Object} states - The current state.
 * @param {Object} action - The action to update the state.
 * @returns {Object} The new state.
 */
const reducer = (states, action) => {
  return { ...states, ...action };
};

/**
 * Component for rendering a sequence track with optional controls and context menu.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {number} [props.fontSize=14] - Font size for the sequence.
 * @param {boolean} [props.controls=false] - Whether to show controls.
 * @param {boolean} [props.color=false] - Whether to use color.
 * @param {string} [props.drawPlaceId] - ID for the draw place.
 * @param {Array} props.features - Features to be drawn on the sequence.
 * @param {string} [props.name="sequence"] - Name of the sequence.
 * @param {boolean} [props.measure=false] - Whether to show measure.
 * @param {string} props.sequence - The sequence to be drawn.
 * @param {string} [props.width="100px"] - Width of the drawing area.
 * @returns {JSX.Element} The sequence track component.
 */
export default function SequenceTrack({
  fontSize = 14,
  controls = false,
  color = false,
  drawPlaceId,
  features = [],
  name = "sequence",
  measure = false,
  sequence,
  width = "100px",
}) {
  const [contextMenu, setContextMenu] = React.useState(null);
  const [state, dispatch] = useReducer(
    reducer,
    { fontSize, color, measure, drawPlaceId },
    initState,
  );
  const drawPlaceRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  /**
   * Function to draw the sequence.
   */
  const drawSequence = useMemo(() => {
    return () => {
      const drawPlace = drawPlaceRef.current;
      if (drawPlace && !state.canvas) {
        drawPlace.innerHTML = "";
        const canvas = new DrawSequence(
          state.id,
          drawPlace,
          sequence,
          features,
          fontSize,
          state.bpWidth,
          state.bpHeight,
        );
        if (canvas.draw()) {
          dispatch({ canvas: canvas });
        }
      }
    };
  }, [
    state.id,
    sequence,
    features,
    fontSize,
    state.bpWidth,
    state.bpHeight,
    state.canvas,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          drawSequence();
        }
      },
      { threshold: 0.1 },
    );

    if (drawPlaceRef.current) {
      observer.observe(drawPlaceRef.current);
    }

    return () => {
      if (drawPlaceRef.current) {
        observer.unobserve(drawPlaceRef.current);
      }
    };
  }, [drawSequence]);

  return (
    <div style={{ display: "flex", alignItems: "center", overflow: "auto" }}>
      {controls && (
        <div
          style={{
            marginRight: "3px",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: "60",
          }}
        >
          <Controls
            state={state}
            sequence={sequence}
            dispatch={dispatch}
            drawPlaceId={state.id}
            name={name}
          />
        </div>
      )}
      <div
        id={state.id}
        ref={drawPlaceRef}
        style={{ position: "relative", width: width }}
        onContextMenu={handleContextMenu}
      >
        loading....
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(sequence);
            handleClose();
          }}
        >
          copy sequence
        </MenuItem>
      </Menu>
    </div>
  );
}

SequenceTrack.propTypes = {
  fontSize: PropTypes.number,
  controls: PropTypes.bool,
  color: PropTypes.bool,
  drawPlaceId: PropTypes.string,
  features: PropTypes.array,
  name: PropTypes.string,
  measure: PropTypes.bool,
  sequence: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export { FEATURE_TYPES };
