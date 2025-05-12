//src/routes/home
import {Link} from "react-router-dom";
import {BookIcon, SaveIcon} from "../../assets/icons";
import {useEffect, useRef, useState} from "react";
import {createDiary, getUserDiaries} from "../../api/backend";
import {Diary} from "types/diary";

function HomeHeader() {
    return (
        <div className="flex p-6">
            <h1>Welcome to Diary </h1>
        </div>
    );
}


function HomeBody() {
    // const diaries = [
    //     {title: "Diary 1", date: "2021-01-01"},
    //     {title: "Diary 2", date: "2021-02-01"},
    // ]
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creatingDiary, setCreatingDiary] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const diaries = await getUserDiaries()
                console.log(diaries);
                setDiaries(diaries);
            } catch (err) {
                setError("Failed to load diaries");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDiaries();
    }, []);

    useEffect(() => {
        if (creatingDiary)
            inputRef.current.focus();
    }, [creatingDiary]);

    if(loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;


    const handleCreateClick = () => {
        if (!creatingDiary)
            setCreatingDiary(true);
        else
            inputRef.current.focus();
    }

    const handleSaveClick = async () => {
        const diaryTitle = inputRef.current.value;

        const newDiary = await createDiary({
            title: diaryTitle,
            lastEntry: undefined,
            numEntries: 0,
            entries: []
        });

        setDiaries([ ...diaries, newDiary ]);
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {diaries.map((diary, index) => (
                <Link key={index} to={`/diaries/${index + 1}`}>
                    <div
                        className="rounded-2xl p-6 shadow-lg bg-secondary-500 hover:bg-secondary-700 transition min-h-[150px] flex items-center justify-center">
                        <h2 className="text-xl font-bold text-secondary-100">{diary.title}</h2>
                        {/*<p className="text-sm text-secondary-300">{diary.date}</p>*/}
                    </div>
                </Link>
            ))}

            {/* Create Button */}
            <div
                id="create-button-container"
                className={`border-3 ${!creatingDiary && "border-dashed"} border-secondary-500 rounded-2xl p-6 shadow-lg cursor-pointer flex flex-row justify-center items-center gap-3 transition min-h-[150px] text-white hover:text-secondary-500`}
                onClick={handleCreateClick}
            >
                <BookIcon className={`icon-md ${creatingDiary && "hidden"}`}/>
                <h2 className={`text-xl font-bold select-none ${creatingDiary && "hidden"}`}>Create Diary</h2>

                <input id="create-diary-input" ref={inputRef} className={`${!creatingDiary && "hidden"} text-center w-full h-full outline-none text-xl font-bold text-secondary-100`} />
                <SaveIcon className={`icon-md text-white hover:text-secondary-500 ${!creatingDiary && "hidden"}`}  onClick={handleSaveClick}/>
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

