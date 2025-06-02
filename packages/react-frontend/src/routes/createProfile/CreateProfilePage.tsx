import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {signup} from "@src/api/auth";
import FormInput from "@src/components/FormInput";

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

        signup(email, username, password)
            .then(() => {
                navigate("/app/home");
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
            <form ref={formRef} className="w-1/2 flex flex-col justify-center gap-6 p-8 rounded-2xl border-2 border-secondary-300">
                <h1 className="text-2xl font-bold text-secondary-300" data-testid="cypress-title">
                    Create Profile
                </h1>


                <FormInput label="Username" name="username" type="text" placeholder="your username" data-testid="cypress-usernameForm"/>
                <FormInput label="Email" name="email" type="email" placeholder="your email" data-testid="cypress-emailForm"/>
                <FormInput label="Password" name="password" type="password" placeholder="your password" data-testid="cypress-passwordForm1"/>
                <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="retype password" data-testid="cypress-passwordForm2"/>

                <div className={`${loading && "hidden"}`}>
                    <button
                        className="btn"
                        type="submit"
                        onClick={handleSubmit}
                        data-testid="cypress-createProfile-button">
                        Create Profile
                    </button>
                </div>
            </form>
        </div>
    );
}