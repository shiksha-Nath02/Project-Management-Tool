import React, { useEffect, useState } from 'react'
import { useEditTaskMutation, useFetchTasksMutation } from '../services/api';
import { DndContext } from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { useParams } from 'react-router';
import './Kanban.css';   // 👈 import CSS

const Kanban = () => {
    const { id } = useParams();
    const [getTasks] = useFetchTasksMutation();
    const [updateTask] = useEditTaskMutation();

    const [columns, setColumns] = useState({
        "To Do": [],
        "In Progress": [],
        "Done": [],
    });

    useEffect(() => {
        async function loadTasks() {
            for (const colName of Object.keys(columns)) {
                const res = await getTasks({ projectId: id, taskType: colName }).unwrap();
                setColumns((prev) => ({
                    ...prev,
                    [colName]: res.map((t) => t.title),
                }));
            }
        }
        loadTasks();
    }, [id]);

    const handleDragEnd = async (event) => {   
        const { active, over } = event;      //active.id contains task  and over.id conrains destination column  
        if (!over) return;

        const sourceCol = Object.keys(columns).find((col) =>
            columns[col].includes(active.id)
        );
        const destCol = over.id;

        if (sourceCol && destCol && sourceCol !== destCol) {
            setColumns((prev) => {
                const newCols = { ...prev };
                newCols[sourceCol] = newCols[sourceCol].filter(
                    (item) => item !== active.id
                );
                newCols[destCol] = [...newCols[destCol], active.id];
                return newCols;
            });
        }

        await updateTask({ sourceCol, destCol, projectId: id, task: active.id });
    };

    return (
        <div className="kanban-board">
            <DndContext onDragEnd={handleDragEnd}>
                {Object.keys(columns).map((colId, idx) => (
                    <div className="kanban-column" key={idx}>
                        <Droppable id={colId}>
                            {columns[colId].map((item, i) => (
                                <Draggable key={i} id={item}>
                                    <div className="task-card">{item}</div>
                                </Draggable>
                            ))}
                        </Droppable>
                    </div>
                ))}
            </DndContext>
        </div>
    );
};

export default Kanban;
