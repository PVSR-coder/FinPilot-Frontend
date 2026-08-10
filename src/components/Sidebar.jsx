import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    // =========================================
    // Logged-in User
    // =========================================

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    // =========================================
    // Logout
    // =========================================

    function handleLogout() {

        // Remove JWT Token

        localStorage.removeItem("token");

        // Remove User Data

        localStorage.removeItem("user");

        // Redirect to Login

        navigate("/login", { replace: true });

    }

    return (

        <div className="w-64 min-h-screen bg-emerald-600 text-white p-6">

            <h1 className="text-3xl font-bold mb-10">

                FinPilot

            </h1>

            <nav className="flex flex-col gap-5">

                <Link
                    to="/dashboard"
                    className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                >
                    🏠 Dashboard
                </Link>

                <Link
                    to="/income"
                    className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                >
                    💰 Income
                </Link>

                <Link
                    to="/expense"
                    className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                >
                    💸 Expense
                </Link>

                <Link
                    to="/ai-insights"
                    className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                >
                    🤖 AI Insights
                </Link>

                <Link
                    to="/profile"
                    className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                >
                    👤 Profile
                </Link>

                {/* =========================================
                    Admin (Only for Admin Users)
                ========================================= */}

                {

                    user?.role === "admin" && (

                        <Link
                            to="/admin"
                            className="
flex
items-center
gap-3
px-4
py-3
rounded-lg
hover:bg-emerald-700
hover:text-white
transition-all
duration-300
"
                        >
                            👨‍💼 Admin
                        </Link>

                    )

                }

                <button

                    onClick={handleLogout}

                    className="text-left hover:text-red-200 transition mt-6"

                >

                    🚪 Logout

                </button>

            </nav>

        </div>

    );

}

export default Sidebar;