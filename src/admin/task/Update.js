import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './../../App.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [task, setTask] = useState({
        judul: '',
        deskripsi: '',
        modul: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(
                    `https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/task/update/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTask(response.data.task);
            } catch (error) {
                console.error('Error fetching task data', error);
            }
        };

        fetchTask();
    }, [id, token]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.put(
                `https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/task/update/${id}`,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/admin/task');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const formatModulContent = (content) => {
        return content.replace(/\n/g, '<br/>');
    };

    const getLineNumbers = () => {
        const lines = task.modul.split('\n').length;
        return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    };

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Update Task</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Judul:
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={task.judul}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Deskripsi:
                        </label>
                        <textarea
                            name="deskripsi"
                            value={task.deskripsi}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Modul:
                        </label>
                        <div className="flex">
                            {/* Line Numbers Column */}
                            <pre className="bg-gray-200 text-gray-600 p-2 font-mono rounded-l whitespace-pre overflow-x-hidden">
                                {getLineNumbers()}
                            </pre>
                            {/* Textarea */}
                            <textarea
                                name="modul"
                                value={task.modul}
                                onChange={handleChange}
                                rows="10"
                                className="w-full p-2 border border-gray-300 rounded-r shadow-sm pl-12"
                                style={{ resize: 'vertical' }}
                            />
                        </div>
                        {task.modul && (
                            <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">
                                    Modul Preview:
                                </h3>
                                <div
                                    className="p-4 bg-gray-100 border border-gray-200 rounded-md"
                                    dangerouslySetInnerHTML={{
                                        __html: formatModulContent(task.modul),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
