import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {login} from "@src/api/auth";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        console.log("Logging in...");

        const formData = new FormData(formRef.current);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        login(username, password)
            .then(() => {
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-primary-700 bg-opacity-10">
            <form ref={formRef} className="grid grid-cols-1 justify-center gap-6 p-8 rounded-2xl border-1">
                <h1 className="text-2xl font-bold text-white pl-5">
                    Login to your diaries
                </h1>

                <div className="flex justify-left items-center p-6">
                    <label className="grid grid-cols-2">
                        Username:
                        <input type="text" name="username" placeholder="username"/>
                    </label>
                </div>

                <div className="flex justify-left items-center p-6">
                    <label className="grid grid-cols-2">
                        Password:
                        <input type="password" name="password" placeholder="password"/>
                    </label>
                </div>

                <div className={`${loading && "hidden"}`}>
                    <button
                        className="btn"
                        type="submit"
                        onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </form>

        </div>
    );
}