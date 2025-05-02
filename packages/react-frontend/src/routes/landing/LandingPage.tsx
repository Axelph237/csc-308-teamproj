/*
in line - onClick={() => window.location.href='http://localhost:5173/login'}
it would be more appropriate to change 'http://localhost:5173/login' to
the current link with the addition of /login.
This is true for each onClick() in this class.
 */

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center gap-6 p-12 min-h-screen">
            <h1 className="text-2xl font-bold ">Welcome to Diary</h1>
            <h2>In Diary you can store and create diary entries, just like any great diary!</h2>

            <button
                onClick={() => window.location.href='http://localhost:5173/login'}
                className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800">
                Login
            </button>

            <button
                onClick={() => window.location.href='http://localhost:5173/createProfile'}
                className="flex p-4 rounded-2xl bg-accent-500 cursor-pointer hover:bg-accent-800">
                Create Profile
            </button>
        </div>
    );
}

