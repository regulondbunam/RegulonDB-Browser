import React from 'react'
import UiNote from "ui-components/Web/Note";

export default function Note({note,references}) {
  return (
    <div style={{maxHeight: "500px", overflow: "auto"}} >
        <UiNote note={note} references={references} />
    </div>
  )
}
