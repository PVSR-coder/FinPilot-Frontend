function SummaryCard({
    title,
    amount,
    icon,
    color,
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

            <div>

                <h3 className="text-gray-500 text-sm">

                    {title}

                </h3>

                <p className="text-3xl font-bold mt-2">

                    ₹ {amount}

                </p>

            </div>

            <div
                className={`text-4xl ${color}`}
            >

                {icon}

            </div>

        </div>

    );

}

export default SummaryCard;