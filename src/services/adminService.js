import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

// =========================================
// Get All Users
// =========================================

export async function getAllUsers() {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/users`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}

// =========================================
// Get Single User
// =========================================

export async function getUser(userId) {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/users/${userId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}

// =========================================
// Delete User
// =========================================

export async function deleteUser(userId) {

    const token = localStorage.getItem("token");

    const response = await axios.delete(

        `${API_URL}/users/${userId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}