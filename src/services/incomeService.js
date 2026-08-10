import axios from "axios";

const API_URL = "http://localhost:5000/api/income";

// =========================================
// Add Income
// =========================================

export async function addIncome(incomeData) {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        incomeData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

}

// =========================================
// Get All Income
// =========================================

export async function getAllIncome() {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Return only the incomes array
    return response.data.incomes;

}

// =========================================
// Delete Income
// =========================================

export async function deleteIncome(incomeId) {

    const token = localStorage.getItem("token");

    const response = await axios.delete(

        `${API_URL}/${incomeId}`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}
// =========================================
// Update Income
// =========================================

export async function updateIncome(incomeId, incomeData) {

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API_URL}/${incomeId}`,

        incomeData,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}