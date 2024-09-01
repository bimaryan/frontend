import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const charLimit = 20;

    const truncateText = (text, limit) => {
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(
                    'https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/home',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTasks(response.data);
            } catch (error) {
                console.error(
                    'Error fetching tasks:',
                    error.response?.data || error.message
                );
            }
        };

        fetchTasks();
    }, [token]);

    const handleCardClick = (judul) => {
        navigate(`/home/task/${encodeURIComponent(judul)}`);
    };

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="p-4 space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No tasks available
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                onClick={() => handleCardClick(task.judul)}
                                className="p-4 bg-white shadow-lg rounded-lg space-y-3 mb-2 cursor-pointer"
                            >
                                <p className="text-1xl font-bold">
                                    {task.judul}
                                </p>
                                <hr />
                                <p>{truncateText(task.deskripsi, charLimit)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
