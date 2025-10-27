import React from "react";
import { useFetchProjectsQuery } from "../services/api";
import Loader from "../components/Loader";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./MyProjects.css";

const MyProjects = () => {
    const { data, isLoading } = useFetchProjectsQuery();
    const navigate = useNavigate();
    const { id: activeId } = useParams(); // route param

    function seeProject(id) {
        navigate(`/project/${id}`);
    }

    return (
        <div className="projects-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Projects</h2>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ul className="project-list">
                        {data?.map((p) => (
                            <li key={p.id}>
                                <button
                                    onClick={() => seeProject(p.id)}
                                    className={`project-btn ${String(p.id) === activeId ? "active" : ""
                                        }`}
                                >
                                    {p.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Main content */}
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default MyProjects;
