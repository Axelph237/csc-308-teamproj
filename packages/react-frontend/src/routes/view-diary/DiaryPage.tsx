import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon} from "../../assets/icons";
import {useEffect, useState} from "react";
import {getDiaryPages, getUserDiaries} from "../../api/backend";

function DiaryHeader() {
    const {index} = useParams();
    const [diaryTitle, setDiaryTitle] = useState("Loading....");
    useEffect(() => {
        async function fetchDiaryTitle() {
            try {
                const diaries = await getUserDiaries();
                const diary = diaries[index];
                if (!diary) {
                    setDiaryTitle("Diary not found.");
                    return;
                }
                setDiaryTitle(diary.title || "Untitled Diary");

            } catch (error) {
                setDiaryTitle("Error Loading Title");
            }
        }
        fetchDiaryTitle();
    }, [index]); // runs whenever index changes

    return (
        <div className="p-5">
            <h1>{diaryTitle} </h1>
        </div>
    );
}

function DiaryEntries() {
    const {index} = useParams();
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEntries() {
            try {
                const diaries = await getUserDiaries();
                const diary = diaries[index];
                if (!diary) {
                    setError("Diary not found.");
                    return;
                }
                const data: DiaryEntry[] = await getDiaryPages(diary._id);
                setEntries(data);
            } catch (err) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchEntries();
    }, [index]);

    const navigate = useNavigate();

    if (loading) return <div>Loading entries...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;


    return (
        <div className="grid grid-cols-2 gap-6 p-6 ">
            {entries.map((entry, index) =>
                <div key={index}
                     className="flex flex-col border-2 border-secondary-500 rounded-2xl shadow-lg bg-secondary-500 overflow-hidden max-h-96"
                     style={{minHeight: "150px"}}
                >
                    {/* Diary header */}
                    <div className="flex flex-row p-4 justify-between items-center">
                        {/* Diary title */}
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-secondary-100">{entry.title}</h2>

                            <p className="text-sm text-secondary-100 opacity-75">{entry.date}</p>
                        </div>
                        <button
                            className="text-primary-700 opacity-50 hover:opacity-75 transition-all cursor-pointer"
                            onClick={() => navigate("/write")}
                        >
                            <PenIcon className="icon-sm"/>
                        </button>
                        {/* Date */}
                    </div>


                    {/* Markdown parser */}
                    <div
                        className="flex bg-primary-600 overflow-y-scroll pl-4 pr-4">
                        <Markdown source={entry.body}/>
                    </div>
                </div>
            )}
        </div>
    );
    // return (<p> da</p>);
}

function DiaryPage() {
    let {index} = useParams();

    useEffect(() => {

    }, [])

    return (
        <div>
            <DiaryHeader/>
            <DiaryEntries/>
        </div>
    );
}

export default DiaryPage;

