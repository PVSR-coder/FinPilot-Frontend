import { useEffect, useState, useRef } from "react";
import {
    getAIInsights,
    askAI,
} from "../services/aiService";

function AI() {

    // =========================================
    // States
    // =========================================

    const [insights, setInsights] = useState(null);

    const [loading, setLoading] = useState(true);

    const [question, setQuestion] = useState("");

    const [chatHistory, setChatHistory] = useState([]);

    const [chatLoading, setChatLoading] = useState(false);

    const chatEndRef = useRef(null);

    // =========================================
    // Load AI Insights
    // =========================================

    useEffect(() => {

        async function fetchAIInsights() {

            try {

                const data = await getAIInsights();

                setInsights(data.insights);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        fetchAIInsights();

    }, []);

    // =========================================
    // Auto Scroll
    // =========================================

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [chatHistory, chatLoading]);

    // =========================================
    // Ask AI
    // =========================================

    async function handleAskAI() {

        if (!question.trim()) {

            return;

        }

        try {

            setChatLoading(true);

            const userMessage = {

                role: "user",

                message: question,

            };

            setChatHistory((previous) => [

                ...previous,

                userMessage,

            ]);

            const currentQuestion = question;

            setQuestion("");

            const data = await askAI(

                currentQuestion,

                [

                    ...chatHistory,

                    userMessage,

                ]

            );

            setChatHistory((previous) => [

                ...previous,

                {

                    role: "assistant",

                    message: data.answer,

                },

            ]);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setChatLoading(false);

        }

    }

    // =========================================
    // Loading Screen
    // =========================================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-center">

                    <div className="text-5xl animate-pulse mb-4">

                        🤖

                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700">

                        Generating AI Insights...

                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div className="p-6">

            {/* =========================================
                Page Heading
            ========================================= */}

            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-8">

                🤖 AI Financial Advisor

            </h1>

            {/* =========================================
                Top Cards
            ========================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

                {/* =========================================
                    Financial Health Score
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
                        text-center
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        ⭐ Financial Health Score

                    </h2>

                    <div
                        className={`text-7xl font-bold mb-4

                        ${

                            insights.healthScore >= 70

                                ? "text-green-600"

                                : insights.healthScore >= 40

                                ? "text-yellow-500"

                                : "text-red-600"

                        }`}
                    >

                        {insights.healthScore}

                    </div>

                    <p className="text-xl font-semibold text-gray-600">

                        {

                            insights.healthScore >= 70

                                ? "Excellent"

                                : insights.healthScore >= 40

                                ? "Average"

                                : "Needs Improvement"

                        }

                    </p>

                </div>

                {/* =========================================
                    Spending Analysis
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

                    <h2 className="text-2xl font-bold mb-6">

                        📊 Spending Analysis

                    </h2>

                    <p className="text-gray-700 leading-8">

                        {insights.spendingAnalysis}

                    </p>

                </div>

            </div>

            {/* =========================================
                Bottom Cards
            ========================================= */}
                        {/* =========================================
                Bottom Cards
            ========================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* =========================================
                    Saving Tips
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

                    <h2 className="text-2xl font-bold mb-6">

                        💰 Saving Tips

                    </h2>

                    <ul className="space-y-4">

                        {

                            insights.savingTips.map((tip, index) => (

                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >

                                    <span className="text-emerald-600 text-xl">

                                        ✔️

                                    </span>

                                    <span className="text-gray-700 leading-7">

                                        {tip}

                                    </span>

                                </li>

                            ))

                        }

                    </ul>

                </div>

                {/* =========================================
                    Budget Recommendation
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

                    <h2 className="text-2xl font-bold mb-6">

                        🎯 Budget Recommendation

                    </h2>

                    <table className="w-full border-collapse">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-4 font-semibold text-gray-700">

                                    Category

                                </th>

                                <th className="text-left p-4 font-semibold text-gray-700">

                                    Recommended Budget

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                Object.entries(

                                    insights.budgetRecommendation

                                ).map(([category, amount]) => (

                                    <tr
                                        key={category}
                                        className="
                                            border-b
                                            hover:bg-emerald-50
                                            transition-colors
                                            duration-200
                                        "
                                    >

                                        <td className="p-4 font-medium">

                                            {category}

                                        </td>

                                        <td className="p-4 font-bold text-emerald-600">

                                            ₹ {amount}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* =========================================
                Ask AI
            ========================================= */}
                        {/* =========================================
                Ask AI
            ========================================= */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    hover:shadow-xl
                    transition-all
                    duration-300
                    p-8
                    mt-8
                "
            >

                <h2 className="text-2xl font-bold mb-6">

                    💬 Ask FinPilot AI

                </h2>

                {/* =========================================
                    Chat Messages
                ========================================= */}

                <div
                    className="
                        border
                        border-gray-200
                        rounded-xl
                        p-5
                        h-96
                        overflow-y-auto
                        bg-gray-50
                        mb-6
                    "
                >

                    {

                        chatHistory.length === 0

                            ? (

                                <div className="text-center mt-16">

                                    <p className="text-5xl mb-4">

                                        🤖

                                    </p>

                                    <p className="text-lg text-gray-600 font-medium">

                                        Start chatting with FinPilot AI

                                    </p>

                                    <p className="text-gray-500 mt-2">

                                        Ask anything about your income, expenses, savings or budget.

                                    </p>

                                </div>

                            )

                            : (

                                chatHistory.map((chat, index) => (

                                    <div

                                        key={index}

                                        className={`mb-4 ${

                                            chat.role === "user"

                                                ? "text-right"

                                                : "text-left"

                                        }`}

                                    >

                                        <div

                                            className={`

                                                inline-block

                                                px-5

                                                py-3

                                                rounded-2xl

                                                max-w-[75%]

                                                shadow-sm

                                                ${

                                                    chat.role === "user"

                                                        ? "bg-emerald-600 text-white shadow-md"

                                                        : "bg-white border border-gray-200"

                                                }

                                            `}

                                        >

                                            {chat.message}

                                        </div>

                                    </div>

                                ))

                            )

                    }

                    {/* =========================================
                        AI Typing Indicator
                    ========================================= */}

                    {

                        chatLoading && (

                            <div className="text-left mb-4">

                                <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">

                                    <span className="text-lg">

                                        🤖

                                    </span>

                                    <span className="animate-pulse">

                                        ● ● ●

                                    </span>

                                </div>

                            </div>

                        )

                    }

                    <div ref={chatEndRef}></div>

                </div>

                {/* =========================================
                    Input Section
                ========================================= */}

                <div className="flex gap-4">

                    <input

                        type="text"

                        value={question}

                        onChange={(e) => setQuestion(e.target.value)}

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleAskAI();

                            }

                        }}

                        placeholder="Ask anything about your finances..."

                        className="
                            flex-1
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

                    <button

                        onClick={handleAskAI}

                        disabled={chatLoading}

                        className="
                            bg-emerald-600
                            hover:bg-emerald-700
                            active:scale-95
                            disabled:bg-gray-400
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

                            chatLoading

                                ? "Thinking..."

                                : "Ask AI"

                        }

                    </button>

                </div>

                {/* =========================================
                    Suggested Questions
                ========================================= */}

                <div className="mt-8">

                    <h3 className="text-lg font-semibold mb-4">

                        💡 Try asking

                    </h3>

                    <div className="flex flex-wrap gap-3">

                        <button

                            onClick={() =>

                                setQuestion("Can I afford a new laptop?")

                            }

                            className="
                                border
                                border-gray-300
                                rounded-full
                                px-4
                                py-2
                                hover:bg-emerald-50
                                hover:border-emerald-500
                                transition-all
                                duration-300
                            "

                        >

                            Can I afford a new laptop?

                        </button>

                        <button

                            onClick={() =>

                                setQuestion("What if my salary increases by ₹20,000?")

                            }

                            className="
                                border
                                border-gray-300
                                rounded-full
                                px-4
                                py-2
                                hover:bg-emerald-50
                                hover:border-emerald-500
                                transition-all
                                duration-300
                            "

                        >

                            What if my salary increases?

                        </button>

                        <button

                            onClick={() =>

                                setQuestion("How can I save more money every month?")

                            }

                            className="
                                border
                                border-gray-300
                                rounded-full
                                px-4
                                py-2
                                hover:bg-emerald-50
                                hover:border-emerald-500
                                transition-all
                                duration-300
                            "

                        >

                            How can I save more?

                        </button>

                        <button

                            onClick={() =>

                                setQuestion("Can I afford an international vacation?")

                            }

                            className="
                                border
                                border-gray-300
                                rounded-full
                                px-4
                                py-2
                                hover:bg-emerald-50
                                hover:border-emerald-500
                                transition-all
                                duration-300
                            "

                        >

                            Can I afford a vacation?

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AI;