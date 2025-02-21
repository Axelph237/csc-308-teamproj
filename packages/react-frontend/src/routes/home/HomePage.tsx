//src/routes/home
import {Link} from "react-router-dom";

function HomeHeader() {
    return (
        <div className="flex p-6">
            <h1>Welcome to Diary </h1>
        </div>
    );
}


function HomeBody() {
    const diaries = [
        {title: "Diary 1", date: "2021-01-01"},
        {title: "Diary 2", date: "2021-02-01"},
    ]

    return (
        <div className="grid grid-cols-2 gap-6 p-6">
            {diaries.map((diary, index) => (
                <Link key={index}
                    to={`/diaries/${index + 1}`}
                    className="border border-secondary-900 rounded-2xl p-6 shadow-lg bg-secondary-500 text-white relative justify-between hover:bg-secondary-700 transition"
                    style={{minHeight: "150px" }}
                >
                    <h2 className="text-xl font-bold text-secondary-100">{diary.title}</h2>
                    <p className="text-sm text-secondary-300">{diary.date}</p>
                </Link>
            ))}
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

