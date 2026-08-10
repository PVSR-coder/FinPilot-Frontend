import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

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