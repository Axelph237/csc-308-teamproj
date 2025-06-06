import { Link } from "react-router-dom";
import { useDocTitle } from "@src/lib/useDocTitle";

export default function LandingPage() {
  useDocTitle("Diary Share");
  return (
    <div className="flex flex-col items-center gap-6 p-12 min-h-screen">
      <h1 className="text-2xl font-bold" data-testid="cypress-title">
        Welcome to Diary Share
      </h1>
      <h2>
        In Diary Share you can store and create diary entries, just like any
        great diary!
      </h2>

      <div>
        <Link to={"/login"} className="pl-6" data-testid="cypress-login-link">
          <button className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800">
            Login
          </button>
        </Link>
      </div>

      <div>
        <Link
          to={"/createprofile"}
          className="pl-6"
          data-testid="cypress-createProfile-link"
        >
          <button className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800">
            Create Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
