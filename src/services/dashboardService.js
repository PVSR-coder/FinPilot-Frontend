import axios from "axios";

const API_URL = "https://finpilot-backend-2vld.onrender.com/api/dashboard";

export async function getDashboardData() {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Return only the dashboard object
    return response.data.dashboard;

}