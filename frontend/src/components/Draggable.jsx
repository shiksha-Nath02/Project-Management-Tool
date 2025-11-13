import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import "./Draggable.css";

const Draggable = ({ id, desc }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [showTooltip, setShowTooltip] = useState(false);

  const style = {
    padding: "8px",
    margin: "5px",
    background: "#4545d3",
    cursor: "grab",
    borderRadius: "6px",
    color: "white",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "translate3d(0, 0, 0)",
    transition: transform ? "none" : "transform 200ms ease",
    willChange: "transform",
    position: "relative",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="task-card"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {id}
      {showTooltip && <div className="tooltip" >{desc}</div>}
    </div>
  );
};

export default Draggable;
