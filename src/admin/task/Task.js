import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Task() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const charLimit = 50;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    'https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/task',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [token]);

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(
                `https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/task/delete/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdate = (taskId) => {
        navigate(`/admin/task/update/${taskId}`);
    };

    const truncateText = (text, limit) => {
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Task List</h2>
                    </div>
                    <div>
                        <Link
                            to="/admin/task/create"
                            className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                        >
                            <i className="bi bi-plus-circle"></i>
                        </Link>
                    </div>
                </div>
                <ul className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className="p-4 border border-gray-200 rounded-lg shadow-sm"
                            >
                                <h3 className="text-xl font-semibold">
                                    {task.judul}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {truncateText(task.deskripsi, charLimit)}
                                </p>
                                <p className="mt-1 text-gray-500">
                                    {truncateText(task.modul, charLimit)}
                                </p>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => handleUpdate(task.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Task;
