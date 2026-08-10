function Navbar() {

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    return (

        <div
            className="
            bg-white
            border-b
            border-gray-200
            px-8
            py-5
            flex
            justify-between
            items-center
            sticky
            top-0
            z-10
        "
        >

            {/* Left Side */}

            <div>

                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">

                    Welcome Back 👋

                </h2>

                <p className="text-gray-500 mt-1">

                    Manage your finances efficiently.

                </p>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4">

                <div
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-emerald-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    shadow-md
                "
                >

                    {

                        user?.name?.charAt(0).toUpperCase()

                    }

                </div>

                <div>

                    <h3 className="font-semibold text-gray-800">

                        {user?.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {

                            user?.role === "admin"

                                ? "Administrator"

                                : "User"

                        }

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Navbar;