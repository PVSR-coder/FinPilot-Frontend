import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

// =========================================
// Get AI Insights
// =========================================

export async function getAIInsights() {

    const token = localStorage.getItem("token");

    const response = await axios.post(

        `${API_URL}/insights`,

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}
// =========================================
// Ask AI
// =========================================

export async function askAI(question, chatHistory) {

    const token = localStorage.getItem("token");

    const response = await axios.post(

        `${API_URL}/chat`,

        {

            question,

            chatHistory,

        },

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}