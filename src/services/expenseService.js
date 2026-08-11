import axios from "axios";

const API_URL = "https://finpilot-backend-2vld.onrender.com/api/expense";

// =========================================
// Add Expense
// =========================================

export async function addExpense(expenseData) {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        expenseData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

}

// =========================================
// Get All Expense
// =========================================

export async function getAllExpense() {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.expenses;

}

// =========================================
// Update Expense
// =========================================

export async function updateExpense(
    expenseId,
    expenseData
) {

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API_URL}/${expenseId}`,

        expenseData,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}

// =========================================
// Delete Expense
// =========================================

export async function deleteExpense(expenseId) {

    const token = localStorage.getItem("token");

    const response = await axios.delete(

        `${API_URL}/${expenseId}`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}