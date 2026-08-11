import axios from "axios";

const API_URL = "https://finpilot-backend-2vld.onrender.com/api/auth";

// ==========================
// Login User
// ==========================

export async function loginUser(loginData) {

    const response = await axios.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;

}

// ==========================
// Register User
// ==========================

export async function registerUser(registerData) {

    const response = await axios.post(
        `${API_URL}/register`,
        registerData
    );

    return response.data;

}