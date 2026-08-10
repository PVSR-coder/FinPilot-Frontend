import { useEffect, useState } from "react";

import {
    addIncome,
    getAllIncome,
    deleteIncome,
    updateIncome,
} from "../services/incomeService";

function Income() {

    // =========================================
    // States
    // =========================================

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [incomes, setIncomes] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingIncomeId, setEditingIncomeId] = useState(null);

    // =========================================
    // Load Income
    // =========================================

    useEffect(() => {

        fetchIncome();

    }, []);

    // =========================================
    // Fetch All Income
    // =========================================

    async function fetchIncome() {

        try {

            const data = await getAllIncome();

            setIncomes(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Add / Update Income
    // =========================================

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            if (isEditing) {

                await updateIncome(

                    editingIncomeId,

                    {

                        title,
                        amount,
                        category,
                        date,

                    }

                );

            }

            else {

                await addIncome({

                    title,
                    amount,
                    category,
                    date,

                });

            }

            // Clear Form

            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");

            // Exit Edit Mode

            setIsEditing(false);
            setEditingIncomeId(null);

            // Refresh Table

            fetchIncome();

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Delete Income
    // =========================================

    async function handleDelete(incomeId) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this income?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteIncome(incomeId);

            fetchIncome();

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Edit Income
    // =========================================

    function handleEdit(income) {

        setTitle(income.title);
        setAmount(income.amount);
        setCategory(income.category);
        setDate(income.date.split("T")[0]);

        setEditingIncomeId(income._id);

        setIsEditing(true);

    }

    return (

        <div className="p-6">

            {/* =========================================
                Page Heading
            ========================================= */}

            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-8">

                💰 Income

            </h1>

            {/* =========================================
                Income Form
            ========================================= */}

            <form

                onSubmit={handleSubmit}

                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    hover:shadow-xl
                    transition-all
                    duration-300
                    p-6
                    mb-8
                "

            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input

                        type="text"

                        placeholder="Title"

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                        className="
                            border
                            border-gray-300
                            rounded-lg
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-500
                            focus:border-emerald-500
                            transition
                            duration-300
                        "

                    />

                    <input

                        type="number"

                        placeholder="Amount"

                        value={amount}

                        onChange={(e) => setAmount(e.target.value)}

                        className="
                            border
                            border-gray-300
                            rounded-lg
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-500
                            focus:border-emerald-500
                            transition
                            duration-300
                        "

                    />

                    <input

                        type="text"

                        placeholder="Category"

                        value={category}

                        onChange={(e) => setCategory(e.target.value)}

                        className="
                            border
                            border-gray-300
                            rounded-lg
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-500
                            focus:border-emerald-500
                            transition
                            duration-300
                        "

                    />

                    <input

                        type="date"

                        value={date}

                        onChange={(e) => setDate(e.target.value)}

                        className="
                            border
                            border-gray-300
                            rounded-lg
                            p-3
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-500
                            focus:border-emerald-500
                            transition
                            duration-300
                        "

                    />

                </div>

                <button

                    type="submit"

                    className="
                        mt-6
                        bg-emerald-600
                        hover:bg-emerald-700
                        active:scale-95
                        transition-all
                        duration-300
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        font-semibold
                    "

                >

                    {

                        isEditing

                            ? "Update Income"

                            : "Add Income"

                    }

                </button>

            </form>

            {/* =========================================
                Income Table
            ========================================= */}
                        <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    overflow-hidden
                    hover:shadow-xl
                    transition-all
                    duration-300
                "
            >

                <table className="w-full border-collapse">

                    <thead className="bg-emerald-600 text-white uppercase text-sm tracking-wide">

                        <tr>

                            <th className="p-4 text-left">

                                Title

                            </th>

                            <th className="p-4 text-left">

                                Category

                            </th>

                            <th className="p-4 text-left">

                                Amount

                            </th>

                            <th className="p-4 text-left">

                                Date

                            </th>

                            <th className="p-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            incomes.length > 0

                                ? (

                                    incomes.map((income) => (

                                        <tr
                                            key={income._id}
                                            className="
                                                border-b
                                                hover:bg-emerald-50
                                                transition-colors
                                                duration-200
                                            "
                                        >

                                            <td className="p-4 font-medium">

                                                {income.title}

                                            </td>

                                            <td className="p-4">

                                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">

                                                    {income.category}

                                                </span>

                                            </td>

                                            <td className="p-4 font-bold text-emerald-600">

                                                ₹ {income.amount}

                                            </td>

                                            <td className="p-4 text-gray-600">

                                                {

                                                    new Date(

                                                        income.date

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="p-4 text-center">

                                                <button

                                                    onClick={() => handleEdit(income)}

                                                    className="
                                                        bg-blue-500
                                                        hover:bg-blue-600
                                                        active:scale-95
                                                        transition-all
                                                        duration-300
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        mr-2
                                                        font-medium
                                                    "

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    onClick={() => handleDelete(income._id)}

                                                    className="
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        active:scale-95
                                                        transition-all
                                                        duration-300
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        font-medium
                                                    "

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )

                                : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-12"
                                        >

                                            <div>

                                                <p className="text-5xl mb-3">

                                                    💰

                                                </p>

                                                <p className="text-lg font-semibold text-gray-700">

                                                    No Income Added Yet

                                                </p>

                                                <p className="text-gray-500 mt-2">

                                                    Add your first income to get started.

                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Income;