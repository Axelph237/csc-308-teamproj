import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { login } from "@src/api/auth";
import FormInput from "@src/components/FormInput";
import { LockIcon, UserCircleIcon } from "@src/assets/icons";
import { useDocTitle } from "@src/lib/useDocTitle";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  useDocTitle("Diary Share | Login");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    console.log("Logging in...");

    login(username, password)
      .then(() => {
        navigate("/app/home");
      })
      .catch((err) => {
        const message =
          typeof err === "string" ? err : err?.message || "Login failed";
        toast.error(message);
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
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col justify-center gap-6 p-8 rounded-2xl border-2 border-secondary-300"
      >
        <h1 className="text-2xl font-bold text-secondary-300" data-testid="cypress-title">
          Login to your diaries
        </h1>

        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="cypress-usernameFormInput"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="cypress-passwordFormInput"
        />

        <div className={`${loading && "hidden"}`}>
          <button className="btn" type="submit" data-testid="cypress-loginButton">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
