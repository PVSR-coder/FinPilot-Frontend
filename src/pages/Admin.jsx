import { useEffect, useState } from "react";

import {

    getAllUsers,

    deleteUser,

} from "../services/adminService";

function Admin() {

    // =========================================
    // States
    // =========================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // =========================================
    // Fetch Users
    // =========================================

    useEffect(() => {

        fetchUsers();

    }, []);

    async function fetchUsers() {

        try {

            const data = await getAllUsers();

            setUsers(data.users);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    // =========================================
    // View User
    // =========================================

    function handleView(user) {

        setSelectedUser(user);

        setShowModal(true);

    }

    // =========================================
    // Delete User
    // =========================================

    async function handleDelete(userId) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this user?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteUser(userId);

            fetchUsers();

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Loading
    // =========================================

    if (loading) {

        return (

            <div className="p-8">

                <h2 className="text-2xl font-semibold">

                    Loading Users...

                </h2>

            </div>

        );

    }
        return (

        <div className="p-6">

            {/* =========================================
                Page Heading
            ========================================= */}

            <h1 className="text-3xl font-bold mb-8">

                👨‍💼 Admin Dashboard

            </h1>

            {/* =========================================
                Total Users
            ========================================= */}

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

                <h2 className="text-xl font-semibold">

                    Total Users

                </h2>

                <p className="text-4xl font-bold text-emerald-600 mt-2">

                    {users.length}

                </p>

            </div>

            {/* =========================================
                Users Table
            ========================================= */}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-6 py-4">

                                Name

                            </th>

                            <th className="text-left px-6 py-4">

                                Email

                            </th>

                            <th className="text-left px-6 py-4">

                                Role

                            </th>

                            <th className="text-center px-6 py-4">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4">

                                        {user.name}

                                    </td>

                                    <td className="px-6 py-4">

                                        {user.email}

                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                user.role === "admin"

                                                    ? "bg-red-100 text-red-600"

                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >

                                            {user.role}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button

                                            onClick={() => handleView(user)}

                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-3"

                                        >

                                            View

                                        </button>

                                        <button

                                            onClick={() => handleDelete(user._id)}

                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>
                    {/* =========================================
            View User Modal
        ========================================= */}

        {

            showModal && selectedUser && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            👤 User Details

                        </h2>

                        <div className="space-y-4">

                            <div>

                                <p className="text-gray-500">

                                    Name

                                </p>

                                <p className="text-lg font-semibold">

                                    {selectedUser.name}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Email

                                </p>

                                <p className="text-lg font-semibold">

                                    {selectedUser.email}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Role

                                </p>

                                <p className="text-lg font-semibold">

                                    {selectedUser.role}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Joined On

                                </p>

                                <p className="text-lg font-semibold">

                                    {

                                        new Date(

                                            selectedUser.createdAt

                                        ).toLocaleDateString()

                                    }

                                </p>

                            </div>

                        </div>

                        <div className="mt-8 text-right">

                            <button

                                onClick={() => setShowModal(false)}

                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"

                            >

                                Close

                            </button>

                        </div>

                    </div>

                </div>

            )

        }

    </div>

);

}

export default Admin;