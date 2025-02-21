//src/routes/home
import {Link} from "react-router-dom";
import {BookIcon} from "../../assets/icons";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {diaries.map((diary, index) => (
                <Link key={index} to={`/diaries/${index + 1}`}>
                    <div
                        className="border border-secondary-900 rounded-2xl p-6 shadow-lg bg-secondary-500 hover:bg-secondary-700 transition min-h-[150px]">
                        <h2 className="text-xl font-bold text-secondary-100">{diary.title}</h2>
                        <p className="text-sm text-secondary-300">{diary.date}</p>
                    </div>
                </Link>
            ))}

            <div
                className="border-3 border-dashed border-secondary-500 rounded-2xl p-6 shadow-lg cursor-pointer flex flex-row justify-center items-center gap-3 transition min-h-[150px] text-white hover:text-secondary-500">
                <BookIcon className="icon-md" />
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

