import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import './Droppable.css';

const Droppable = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`droppable-container ${isOver ? 'over' : ''}`}
        >
            <h3>{id}</h3>
            {children}
        </div>
    );
}

export default Droppable;
