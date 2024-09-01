import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import Task from './admin/task/Task';
import Create from './admin/task/Create';
import Update from './admin/task/Update';
import Navbar from './layout/Navbar'; // Import ProtectedRoute
import ProtectedRoute from './auth/PrivateRoute';
import Home from './peserta/Home';
import View from './peserta/View';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <br />
                <br />
                <br />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* HALAMAN ADMIN */}
                    <Route
                        path="/admin/task/create"
                        element={
                            <ProtectedRoute
                                element={<Create />}
                                allowedRoles={['1']}
                            />
                        }
                    />
                    <Route
                        path="/admin/task/update/:id"
                        element={
                            <ProtectedRoute
                                element={<Update />}
                                allowedRoles={['1']}
                            />
                        }
                    />
                    <Route
                        path="/admin/task/"
                        element={
                            <ProtectedRoute
                                element={<Task />}
                                allowedRoles={['1']}
                            />
                        }
                    />

                    {/* HALAMAN PESERTA */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={<Home />}
                                allowedRoles={['2']}
                            />
                        }
                    />
                    <Route
                        path="/task/:judul"
                        element={
                            <ProtectedRoute
                                element={<View />}
                                allowedRoles={['2']}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
