import AuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-100 leading-tight">
                        {auth.user.name}さん
                    </h2>
                }
            >
                <Head title="Dashboard" />
            </AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-8 text-gray-100 text-center space-y-16">
                            {/* シフト提出ボタン */}
                            <div className="bg-gray-600 rounded-xl py-6 hover:shadow-md transition">
                                <a
                                    href="/admin/table"
                                    className="block text-xl font-bold text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    出勤管理
                                </a>
                            </div>
                            <div className="bg-gray-600 rounded-xl py-6 hover:shadow-md transition">
                                <a
                                    href="/admin/need"
                                    className="block text-xl font-bold text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    シフト編集
                                </a>
                            </div>
                            <div className="bg-gray-600 rounded-xl py-6 hover:shadow-md transition">
                                <Link
                                    href={route("register")}
                                    className="block text-xl font-bold text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    従業員登録
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function Dashboard({ auth }) {
//     return (
//         <>
//             <AuthenticatedLayout
//                 user={auth.user}
//                 header={
//                     <h2 className="font-semibold text-xl text-gray-100 leading-tight">
//                         {auth.user.name}さん
//                     </h2>
//                 }
//             >
//                 <Head title="Dashboard" />
//             </AuthenticatedLayout>

//             {/* メインコンテンツ */}
//             <div className="py-12">
// <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//     <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
//         <div className="p-8 text-gray-100 text-center space-y-6">
//             {/* シフト提出ボタン */}
//             <div className="bg-gray-600 rounded-xl py-6 hover:shadow-md transition">
//                                 <a
//                                     href="/shift"
//                                     className="block text-xl font-bold text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                                 >
//                                     シフト提出
//                                 </a>
//                             </div>

//                             {/* 勤怠管理ボタン */}
//                             <div className="bg-gray-600 rounded-xl py-6 hover:shadow-md transition">
//                                 <a
//                                     href="/attendances"
// className="block text-xl font-bold text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                                 >
//                                     勤怠管理
//                                 </a>
//                             </div>
//                             <Link
//                                 href={route("register")}
//                                 className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//                             >
//                                 従業員登録
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
