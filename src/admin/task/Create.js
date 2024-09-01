import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Create() {
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [modul, setModul] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!judul || !deskripsi || !modul) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'Please fill in all fields.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'bg-blue-500 rounded-lg hover:bg-blue-700', // Add a custom class to the button
                },
            });
            return;
        }

        const token = localStorage.getItem('token');

        try {
            await axios.post(
                'https://c14f-2a09-bac1-34c0-20-00-277-af.ngrok-free.app/api/task/create',
                {
                    judul: judul,
                    deskripsi: deskripsi,
                    modul: modul,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('Task created successfully!');
            setJudul('');
            setDeskripsi('');
            setModul('');

            navigate('/admin/task');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create Task</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Judul:
                        </label>
                        <input
                            type="text"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Deskripsi:
                        </label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            rows="5"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Modul:
                        </label>
                        <textarea
                            value={modul}
                            onChange={(e) => setModul(e.target.value)}
                            rows="3"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;
