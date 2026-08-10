import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(event) {

        event.preventDefault();

        // Clear previous error
        setErrorMessage("");

        try {

            const result = await registerUser({

                name,
                email,
                password,

            });

            console.log(result);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            setErrorMessage(
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

                Create Your Account

            </p>

            <form onSubmit={handleRegister}>

                <div className="mb-4">

                    <label className="block text-gray-700 font-medium mb-2">

                        Name

                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                    />

                </div>

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

                <div className="mb-4">

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

                {
                    errorMessage && (

                        <p className="text-red-600 text-sm mb-4">

                            {errorMessage}

                        </p>

                    )
                }

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >

                    Register

                </button>

            </form>

            <p className="text-center text-gray-600 mt-6">

                Already have an account?{" "}

                <Link
                    to="/login"
                    className="text-emerald-600 font-semibold hover:underline"
                >

                    Login

                </Link>

            </p>

        </div>

    );

}

export default Register;