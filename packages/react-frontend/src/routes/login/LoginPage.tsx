import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-primary-700 bg-opacity-10">
            <div className="grid grid-cols-1 justify-center gap-6 p-8 rounded-2xl border-1">
                <h1 className="text-2xl font-bold text-white pl-5">
                    Login
                </h1>
                <div className="flex justify-left items-center p-6">
                    <body className="grid grid-cols-2"> Username:</body>
                    <input type="text" placeholder="username"/>
                </div>
                <div className="flex justify-left items-center p-6">
                    <body className="grid grid-cols-2"> Password:</body>
                    <input type="text" placeholder="password"/>
                </div>

                <Link to={'/home'} className="pl-6">

                    <button className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800"> Login
                    </button>
                </Link>
            </div>

        </div>
    );
}