import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

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