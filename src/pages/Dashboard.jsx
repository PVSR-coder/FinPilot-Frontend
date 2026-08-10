import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import ExpensePieChart from "../components/ExpensePieChart";
import { getDashboardData } from "../services/dashboardService";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        async function fetchDashboard() {

            try {

                const data = await getDashboardData();

                setDashboardData(data);

            }

            catch (error) {

                console.log(error);

            }

        }

        fetchDashboard();

    }, []);

    // =========================================
    // Loading
    // =========================================

    if (!dashboardData) {

        return (

            <div className="flex items-center justify-center h-[70vh]">

                <div className="text-2xl font-semibold text-gray-600 animate-pulse">

                    Loading Dashboard...

                </div>

            </div>

        );

    }

    return (

        <div className="p-6">

            {/* =========================================
                Dashboard Heading
            ========================================= */}

            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-8">

                📊 Dashboard

            </h1>

            {/* =========================================
                Summary Cards
            ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <SummaryCard
                    title="Total Balance"
                    amount={dashboardData.balance}
                />

                <SummaryCard
                    title="Income"
                    amount={dashboardData.totalIncome}
                />

                <SummaryCard
                    title="Expense"
                    amount={dashboardData.totalExpense}
                />

            </div>

            {/* =========================================
                Charts
            ========================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

                <ExpensePieChart
                    data={dashboardData.expenseByCategory}
                />

                <MonthlyBalanceChart
                    data={dashboardData.monthlyBalance}
                />

            </div>

            {/* =========================================
                Recent Transactions
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
                p-6
            "
            >

                <h2 className="text-2xl font-bold text-gray-800 mb-5">

                    Recent Transactions

                </h2>
                                {

                    dashboardData.recentTransactions.length > 0 ? (

                        <table className="w-full border-collapse">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="text-left p-4 font-semibold text-gray-700">

                                        Title

                                    </th>

                                    <th className="text-left p-4 font-semibold text-gray-700">

                                        Type

                                    </th>

                                    <th className="text-left p-4 font-semibold text-gray-700">

                                        Amount

                                    </th>

                                    <th className="text-left p-4 font-semibold text-gray-700">

                                        Date

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    dashboardData.recentTransactions.map(

                                        (transaction) => (

                                            <tr
                                                key={transaction._id}
                                                className="
                                                border-b
                                                hover:bg-gray-50
                                                transition-colors
                                                duration-200
                                            "
                                            >

                                                <td className="p-4">

                                                    {transaction.title}

                                                </td>

                                                <td className="p-4">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                            transaction.type === "Income"

                                                                ? "bg-green-100 text-green-700"

                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                    >

                                                        {transaction.type}

                                                    </span>

                                                </td>

                                                <td
                                                    className={`p-4 font-bold ${
                                                        transaction.type === "Income"

                                                            ? "text-emerald-600"

                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {

                                                        transaction.type === "Income"

                                                            ? "+"

                                                            : "-"

                                                    }

                                                    ₹ {transaction.amount}

                                                </td>

                                                <td className="p-4 text-gray-600">

                                                    {

                                                        new Date(

                                                            transaction.date

                                                        ).toLocaleDateString()

                                                    }

                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                            </tbody>

                        </table>

                    ) : (

                        <div className="text-center py-10">

                            <p className="text-5xl mb-3">

                                📭

                            </p>

                            <p className="text-lg font-semibold text-gray-700">

                                No Transactions Found

                            </p>

                            <p className="text-gray-500 mt-2">

                                Add an income or expense to see it here.

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default Dashboard;