import { useEffect, useState } from "react";

import {

    getProfile,

    updateProfile,

} from "../services/profileService";

function Profile() {

    // =========================================
    // States
    // =========================================

    const [user, setUser] = useState(null);

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    // =========================================
    // Load Profile
    // =========================================

    useEffect(() => {

        async function fetchProfile() {

            try {

                const data = await getProfile();

                setUser(data.user);

                setName(data.user.name);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        fetchProfile();

    }, []);

    // =========================================
    // Save Profile
    // =========================================

    async function handleSave() {

        try {

            setSaving(true);

            const data = await updateProfile(name);

            setUser(data.user);

            setSuccessMessage("✅ Profile updated successfully.");

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setSaving(false);

        }

    }

    // =========================================
    // Loading
    // =========================================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-center">

                    <div className="text-5xl animate-pulse mb-4">

                        👤

                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700">

                        Loading Profile...

                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div className="p-8">

            {/* =========================================
                Page Heading
            ========================================= */}

            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-8">

                👤 My Profile

            </h1>

            {/* =========================================
                Profile Card
            ========================================= */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    p-8
                "
            >

                {/* Avatar */}

                <div className="flex flex-col items-center">

                    <div
                        className="
                            w-28
                            h-28
                            rounded-full
                            bg-emerald-600
                            text-white
                            flex
                            items-center
                            justify-center
                            text-5xl
                            font-bold
                            shadow-lg
                            ring-4
                            ring-emerald-100
                        "
                    >

                        {

                            user.name.charAt(0).toUpperCase()

                        }

                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mt-5">

                        {user.name}

                    </h2>

                    <p className="text-gray-500 mt-2">

                        {user.email}

                    </p>

                </div>

                {/* =========================================
                    Member Since
                ========================================= */}
                                <div className="mt-10 border-t border-gray-200 pt-6">

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">

                        Member Since

                    </h3>

                    <p className="text-gray-600">

                        {

                            new Date(

                                user.createdAt

                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                {/* =========================================
                    Profile Information
                ========================================= */}

                <div className="mt-10 border-t border-gray-200 pt-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">

                        Profile Information

                    </h2>

                    {/* Name */}

                    <div className="mb-6">

                        <label className="block text-gray-700 font-semibold mb-2">

                            Name

                        </label>

                        <input

                            type="text"

                            value={name}

                            onChange={(e) => setName(e.target.value)}

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-lg
                                px-4
                                py-3
                                outline-none
                                focus:ring-2
                                focus:ring-emerald-500
                                focus:border-emerald-500
                                transition
                                duration-300
                            "

                        />

                    </div>

                    {/* Email */}

                    <div className="mb-8">

                        <label className="block text-gray-700 font-semibold mb-2">

                            Email

                        </label>

                        <input

                            type="email"

                            value={user.email}

                            readOnly

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-lg
                                px-4
                                py-3
                                bg-gray-100
                                text-gray-600
                                cursor-not-allowed
                            "

                        />

                    </div>

                    {/* Success Message */}

                    {

                        successMessage && (

                            <div
                                className="
                                    mb-6
                                    bg-green-100
                                    border
                                    border-green-300
                                    text-green-700
                                    px-4
                                    py-3
                                    rounded-lg
                                    font-medium
                                "
                            >

                                {successMessage}

                            </div>

                        )

                    }

                    {/* Save Button */}

                    <button

                        onClick={handleSave}

                        disabled={saving}

                        className="
                            w-full
                            bg-emerald-600
                            hover:bg-emerald-700
                            active:scale-95
                            disabled:bg-gray-400
                            transition-all
                            duration-300
                            text-white
                            font-semibold
                            py-3
                            rounded-lg
                        "

                    >

                        {

                            saving

                                ? "Saving..."

                                : "Save Changes"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;