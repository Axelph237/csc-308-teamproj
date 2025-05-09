import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {signup} from "@src/api/auth";

export default function CreateProfilePage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (password !== formData.get("confirmPassword")) {
            alert("Passwords don't match");
            return;
        }

        setLoading(true);
        console.log("Signing up...");

        signup(username, email, password)
            .then(() => {
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-primary-700 bg-opacity-10">
            <form ref={formRef} className="grid grid-cols-1 justify-center gap-3 p-8 rounded-2xl border-1">
                <h1 className="text-2xl font-bold text-white pl-5">
                    Create Profile
                </h1>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Email:
                    <input type="email" id="email" name="email" placeholder="email"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Username:
                    <input type="text" id="username" name="username" placeholder="username"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Password:
                    <input type="password" id="password" name="password" placeholder="password"/>
                    </label>
                </div>

                <div className="p-6">
                    <label className="grid grid-cols-2"> Confirm Password:
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="retype password"/>
                    </label>
                </div>

                <div className={`${loading && "hidden"}`}>
                    <button
                        className="btn"
                        type="submit"
                        onClick={handleSubmit}>
                        Create Profile
                    </button>
                </div>
            </form>

        </div>
    );
}