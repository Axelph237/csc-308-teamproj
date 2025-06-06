import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { signup } from "@src/api/auth";
import FormInput from "@src/components/FormInput";
import { useDocTitle } from "@src/lib/useDocTitle";
import toast, { Toaster } from "react-hot-toast";

export default function CreateProfilePage() {
  useDocTitle("Diary Share | Signup");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  function isStrongPassword(password: string): string | null {
    const errors = [];

    if (password.length < 8) errors.push("at least 8 characters");
    if ((password.match(/[A-Z]/g) || []).length < 2)
      errors.push("at least 2 uppercase letters");
    if ((password.match(/[a-z]/g) || []).length < 2)
      errors.push("at least 2 lowercase letters");
    if ((password.match(/[0-9]/g) || []).length < 1)
      errors.push("at least 1 number");
    if ((password.match(/[^A-Za-z0-9]/g) || []).length < 1)
      errors.push("at least 1 special character");

    return errors.length > 0
      ? "Password must include " + errors.join(", ")
      : null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (password !== formData.get("confirmPassword")) {
      toast.error("Passwords don't match");
      return;
    }

    const passwordError = isStrongPassword(password);
    if (passwordError) {
      toast.error(passwordError);
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
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-700 bg-opacity-10">
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-secondary-400 hover:bg-secondary-600 text-accent-900 hover:text-white font-medium px-4 py-2 rounded-md shadow transition-all duration-300"
        type="button"
      >
        ← Back
      </button>
      <form
        ref={formRef}
        className="w-1/2 flex flex-col justify-center gap-6 p-8 rounded-2xl border-2 border-secondary-300"
      >
        <h1
          className="text-2xl font-bold text-secondary-300"
          data-testid="cypress-title"
        >
          Create Profile
        </h1>

        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder="your username"
          data-testid="cypress-usernameForm"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="your email"
          data-testid="cypress-emailForm"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="your password"
          data-testid="cypress-passwordForm1"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="retype password"
          data-testid="cypress-passwordForm2"
        />

        <div className={`${loading && "hidden"}`}>
          <button
            className="btn"
            type="submit"
            onClick={handleSubmit}
            data-testid="cypress-createProfile-button"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
}
