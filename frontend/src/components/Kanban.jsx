import React, { useEffect, useState } from 'react'
import { useEditTaskMutation, useFetchTasksMutation } from '../services/api';
import { DndContext } from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { useParams } from 'react-router';
import './Kanban.css';   

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
                const res = await getTasks({ projectId: id, taskType: colName }).unwrap();  //res=[{title,desc},{title,desc}....]
                setColumns((prev) => ({
                    ...prev,
                    [colName]: res,
                }));
                console.log(colName, res);
            }
        }
        loadTasks();
    }, [id]);

    const handleDragEnd = async (event) => {   
        const { active, over } = event;
        // console.log(active.id,over.id);

        if (!over) return;

        const sourceCol = Object.keys(columns).find((col) =>
            columns[col].some((t) => t.title === active.id)
        );
        const destCol = over.id;

        if (sourceCol && destCol && sourceCol !== destCol) {
            setColumns((prev) => {
                const taskToMove = prev[sourceCol].find((t) => t.title === active.id);
                const newCols = { ...prev };
                newCols[sourceCol] = newCols[sourceCol].filter(
                    (t) => t.title !== active.id
                );
                newCols[destCol] = [...newCols[destCol], taskToMove];
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
                                <Draggable key={i} id={item.title} desc={item.description}>
                                    {/* <div className="task-card">{item}</div> */}
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
