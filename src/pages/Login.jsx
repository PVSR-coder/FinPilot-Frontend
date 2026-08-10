import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        try {

            const result = await loginUser({

                email,

                password,

            });

            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            navigate("/dashboard");

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    }

    return (

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

            <h1 className="text-3xl font-bold text-center text-emerald-600 mb-2">

                FinPilot

            </h1>

            <p className="text-center text-gray-600 mb-8">

                Welcome Back

            </p>

            <form onSubmit={handleLogin}>

                <div className="mb-4">

                    <label className="block text-gray-700 font-medium mb-2">

                        Email

                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                    />

                </div>

                <div className="mb-6">

                    <label className="block text-gray-700 font-medium mb-2">

                        Password

                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >

                    Login

                </button>

            </form>

            <p className="text-center text-gray-600 mt-6">

                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="text-emerald-600 font-semibold hover:underline"
                >

                    Register

                </Link>

            </p>

        </div>

    );

}

export default Login;