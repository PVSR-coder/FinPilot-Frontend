import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// =========================================
// Get Profile
// =========================================

export async function getProfile() {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/profile`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}

// =========================================
// Update Profile
// =========================================

export async function updateProfile(name) {

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API_URL}/profile`,

        {

            name,

        },

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}