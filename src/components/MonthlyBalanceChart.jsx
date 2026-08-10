import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function MonthlyBalanceChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-6">

                Monthly Income vs Expense

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={data}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="income"
                        fill="#10B981"
                        name="Income"
                    />

                    <Bar
                        dataKey="expense"
                        fill="#EF4444"
                        name="Expense"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MonthlyBalanceChart;