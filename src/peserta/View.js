import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View() {
    const { judul } = useParams();
    const [task, setTask] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTask = async () => {
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(
                    `https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/home/task/${encodeURIComponent(judul)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTask(response.data);
            } catch (error) {
                console.error(
                    'Error fetching task details:',
                    error.response?.data || error.message
                );
            }
        };

        fetchTask();
    }, [judul, token]);

    const formatModulContent = (content) => {
        return content.replace(/\n/g, '<br/>');
    };

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="p-4 bg-white shadow-lg rounded-lg space-y-3">
                <h2 className="text-2xl font-bold">{task.judul}</h2>
                <hr />
                <p>{task.deskripsi}</p>
                <div
                    className="bg-gray-100 p-4 border border-gray-200 rounded-md"
                    dangerouslySetInnerHTML={{
                        __html: formatModulContent(task.modul),
                    }}
                />
            </div>
        </div>
    );
}

export default View;
