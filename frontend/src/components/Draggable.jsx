import React from 'react'
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({id}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return (
      <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={{
              padding: "8px",
              margin: "5px",
              background: "skyblue",
              cursor: "grab",
              borderRadius: "4px",
              transform: transform
                  ? `translate(${transform.x}px, ${transform.y}px)`
                  : undefined,
          }}
      >
          {id}
      </div>
  )
}

export default Draggable