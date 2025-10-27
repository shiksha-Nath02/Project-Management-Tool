import React, { useRef, useState } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { useCreateProjectMutation, useFetchProjectsQuery} from "../services/api";
import Loader from "../components/Loader";

import "./NewProject.css"; //import CSS


const NewProject = () => {
    const { data, isLoading } = useFetchProjectsQuery();
    const navigate = useNavigate();
    const [createProject] = useCreateProjectMutation();
    const inpRef = useRef();

    const [form, setForm] = useState({ title: "" });
    const [showForm, setShowForm] = useState(false); // controls popup

    function seeProject(id) {
        navigate(`/newproject/${id}`);
    }

    function deleteProject(id){

    }

    function handleChange({ target }) {
        setForm((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createProject({ projectName: form.title }).unwrap();
            setForm({ title: "" }); // clear
            setShowForm(false); // close popup
            console.log("added project");
            
           

        } catch (err) {
            console.error("Error creating project:", err);
        }
    }

    return (
        <>
        <div className="projects-container">
            <div className="sidebar">
                <h2 className="sidebar-title">Projects</h2>

                {isLoading ? (
                    <Loader />
                ) : (
                        <ul className="project-list">
                            {data?.map((p) => (
                                <li key={p.id} className="project-item">
                                    <span className="project-name" onClick={() => seeProject(p.id)}>{p.name}</span>
                                    <button className="delete-btn" onClick={() => deleteProject(p.id)}>
                                        🗑⃨̅̅̅
                                    </button>
                                </li>
                            ))}
                        </ul>
                )}

                <button onClick={() => setShowForm(true)}>New Project</button>
            </div>
            

            {/* 🔹 Popup Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Create New Project</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Project Name</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                ref={inpRef}
                                onChange={handleChange}
                                placeholder="Enter the Project Title"
                            />
                            <div className="modal-actions">
                                <button type="submit">Add Project</button>
                                <button type="button" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
        </>
    );
};

export default NewProject;
