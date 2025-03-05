//src/routes/home
import {Link, useParams} from "react-router-dom";
import {BookIcon} from "../../assets/icons";
import {useEffect, useState} from "react";
import {getUserDiaries} from "../../api/user";

function HomeHeader() {
    return (
        <div className="flex p-6">
            <h1>Welcome to Diary </h1>
        </div>
    );
}


function HomeBody() {

    const [diaries, setDiaries] = useState([]); // State for storing diaries
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDiaries() {
            try {
                const data = await getUserDiaries(); // response.json();
                setDiaries(data); // Assuming data is an array of diary objects
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDiaries();
    }, []);

    if (loading) return <p>Loading diaries...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {diaries.map((diary, index) => (
                <Link key={index} to={`/diaries/${index}`}>
                    <div
                        className="border border-secondary-900 rounded-2xl p-6 shadow-lg bg-secondary-500 hover:bg-secondary-700 transition min-h-[150px]">
                        <h2 className="text-xl font-bold text-secondary-100">{diary.title}</h2>
                        <p className="text-sm text-secondary-300">{diary.date}</p>
                    </div>
                </Link>
            ))}

            {/* Create Button */}
            <div
                className="border-3 border-dashed border-secondary-500 rounded-2xl p-6 shadow-lg cursor-pointer flex flex-row justify-center items-center gap-3 transition min-h-[150px] text-white hover:text-secondary-500">
                <BookIcon className="icon-md"/>
                <h2 className="text-xl font-bold select-none">Create Diary</h2>
            </div>
        </div>
    );
}

function HomePage() {
    return (
        <div>
            <HomeHeader/>
            <HomeBody/>
        </div>
    );
}

export default HomePage;

