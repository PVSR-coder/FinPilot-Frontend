import { useEffect, useState } from "react";

import {
    addExpense,
    getAllExpense,
    deleteExpense,
    updateExpense,
} from "../services/expenseService";

function Expense() {

    // =========================================
    // States
    // =========================================

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [expenses, setExpenses] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState(null);

    // =========================================
    // Load Expenses
    // =========================================

    useEffect(() => {

        fetchExpense();

    }, []);

    // =========================================
    // Fetch All Expense
    // =========================================

    async function fetchExpense() {

        try {

            const data = await getAllExpense();

            setExpenses(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Add / Update Expense
    // =========================================

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            if (isEditing) {

                await updateExpense(

                    editingExpenseId,

                    {

                        title,
                        amount,
                        category,
                        date,

                    }

                );

            }

            else {

                await addExpense({

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
            setEditingExpenseId(null);

            // Refresh Table

            fetchExpense();

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Delete Expense
    // =========================================

    async function handleDelete(expenseId) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this expense?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteExpense(expenseId);

            fetchExpense();

        }

        catch (error) {

            console.log(error);

        }

    }

    // =========================================
    // Edit Expense
    // =========================================

    function handleEdit(expense) {

        setTitle(expense.title);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date.split("T")[0]);

        setEditingExpenseId(expense._id);

        setIsEditing(true);

    }

    return (

        <div className="p-6">

            {/* =========================================
                Page Heading
            ========================================= */}

            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-8">

                💸 Expense

            </h1>

            {/* =========================================
                Expense Form
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
                            focus:ring-red-500
                            focus:border-red-500
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
                            focus:ring-red-500
                            focus:border-red-500
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
                            focus:ring-red-500
                            focus:border-red-500
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
                            focus:ring-red-500
                            focus:border-red-500
                            transition
                            duration-300
                        "

                    />

                </div>

                <button

                    type="submit"

                    className="
                        mt-6
                        bg-red-600
                        hover:bg-red-700
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

                            ? "Update Expense"

                            : "Add Expense"

                    }

                </button>

            </form>

            {/* =========================================
                Expense Table
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

                    <thead className="bg-red-600 text-white uppercase text-sm tracking-wide">

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

                            expenses.length > 0

                                ? (

                                    expenses.map((expense) => (

                                        <tr
                                            key={expense._id}
                                            className="
                                                border-b
                                                hover:bg-red-50
                                                transition-colors
                                                duration-200
                                            "
                                        >

                                            <td className="p-4 font-medium">

                                                {expense.title}

                                            </td>

                                            <td className="p-4">

                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

                                                    {expense.category}

                                                </span>

                                            </td>

                                            <td className="p-4 font-bold text-red-600">

                                                ₹ {expense.amount}

                                            </td>

                                            <td className="p-4 text-gray-600">

                                                {

                                                    new Date(

                                                        expense.date

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="p-4 text-center">

                                                <button

                                                    onClick={() => handleEdit(expense)}

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

                                                    onClick={() => handleDelete(expense._id)}

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

                                                    💸

                                                </p>

                                                <p className="text-lg font-semibold text-gray-700">

                                                    No Expenses Added Yet

                                                </p>

                                                <p className="text-gray-500 mt-2">

                                                    Add your first expense to get started.

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

export default Expense;