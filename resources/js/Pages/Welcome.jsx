import { Link, Head } from "@inertiajs/react";
import React from "react";

// ログイン・管理者リンクの共通部分をコンポーネント化
const AuthLink = ({ route, label, extraClasses = "" }) => (
    <Link
        href={route}
        className={`mb-10 block w-full text-lg font-semibold text-gray-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-3 px-6 rounded-lg shadow-md bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all ${extraClasses}`}
    >
        {label}
    </Link>
);

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Workly - Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 selection:bg-red-500 selection:text-white">
                <div className="container mx-auto px-6 py-12 lg:px-24 lg:py-20">
                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-center sm:items-center sm:flex-col lg:flex-col">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                                ようこそ、WorkMateへ！
                            </h1>
                            <p className="text-lg text-gray-800 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
                                この管理アプリで、業務の効率化とスムーズな管理を実現してください。
                            </p>
                            {auth.user ? (
                                <AuthLink
                                    route={route("dashboard")}
                                    label="従業員ページ"
                                />
                            ) : (
                                <AuthLink
                                    route={route("login")}
                                    label="ログイン"
                                    extraClasses="mb-4"
                                />
                            )}
                            {auth.user ? (
                                <AuthLink
                                    route={route("admin.dashboard")}
                                    label="管理者ページ"
                                />
                            ) : (
                                <>
                                    <AuthLink
                                        route={route("admin.login")}
                                        label="管理者ログイン"
                                        extraClasses="mb-4"
                                    />
                                    <AuthLink
                                        route={route("admin.register")}
                                        label="管理者登録"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-gradient-to-br {
                    background-image: linear-gradient(135deg, #f1f5f8, #e2e8f0);
                }
                .dark\\:bg-gradient-to-br {
                    background-image: linear-gradient(135deg, #2d3748, #1a202c);
                }
                .text-gray-900 {
                    color: #1a202c; /* dark text for better contrast */
                }
                .dark\\:text-white {
                    color: #ffffff; /* white text in dark mode */
                }
                .text-gray-800 {
                    color: #2d3748; /* slightly lighter dark text */
                }
                .dark\\:text-gray-200 {
                    color: #e2e8f0; /* lighter gray text for better contrast */
                }
                .text-lg {
                    font-size: 1.125rem; /* Larger font for better readability */
                }
                .text-5xl {
                    font-size: 3rem; /* Bigger title text for visibility */
                }
            `}</style>
        </>
    );
}
