import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div>
            <nav className="bg-gray-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* ロゴ */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/images/ホームアイコン .png"
                                    alt="Workers"
                                    className="h-10 w-10 bg-white rounded-xl"
                                />
                                <span className="ml-2 text-gray-100 text-xl font-semibold">
                                    WorkMate
                                </span>
                            </Link>
                        </div>

                        {/* ナビゲーション */}
                        <div className="hidden space-x-8 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="text-gray-100 hover:text-gray-300 transition duration-300"
                            >
                                Dashboard
                            </NavLink>
                        </div>

                        {/* ユーザードロップダウン */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* モバイルメニュー */}
                        <div className="sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (prevState) => !prevState
                                    )
                                }
                                className="p-2 rounded-md text-gray-100 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {showingNavigationDropdown ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* モバイルナビゲーション */}
                <div
                    className={`${
                        showingNavigationDropdown ? "block" : "hidden"
                    } sm:hidden`}
                >
                    <div className="bg-gray-800 text-gray-100 space-y-1 py-2 px-4">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* ヘッダー */}
            {header && (
                <header className="bg-gray-600 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-100">
                        {header}
                    </div>
                </header>
            )}

            {/* メインコンテンツ */}
            <main>{children}</main>
        </div>
    );
}
