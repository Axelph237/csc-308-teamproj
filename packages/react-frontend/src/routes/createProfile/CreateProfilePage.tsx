import {Link} from "react-router-dom";

export default function CreateProfilePage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-primary-700 bg-opacity-10">
            <div className="grid grid-cols-1 justify-center gap-3 p-8 rounded-2xl border-1">
                <h1 className="text-2xl font-bold text-white pl-5">
                    Create Profile
                </h1>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Email:
                    <input type="email" id="email" placeholder="email"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Username:
                    <input type="text" id="username" placeholder="username"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Password:
                    <input type="password" id="password" placeholder="password"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Confirm Password:
                    <input type="password" id="confirmPassword" placeholder="password"/>
                    </label>
                </div>

                <div><Link to={'/home'} className="pl-6">

                    <button className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800">Create Profile
                    </button>
                </Link></div>
            </div>

        </div>
    );
}