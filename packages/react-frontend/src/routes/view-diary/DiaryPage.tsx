import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon} from "../../assets/icons";
import {useEffect, useState} from "react";
import {DiaryEntry, getDiaryEntries, getUserDiaries} from "../../api/user";

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
                const data: DiaryEntry[] = await getDiaryEntries(diary.title);
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
                     className="border border-accent-700 rounded-2xl p-6 shadow-lg bg-primary-100 text-white relative"
                     style={{minHeight: "150px"}}
                >
                    <div className="flex justify-between items-center">

                        <h2 className="text-xl font-bold text-accent-300">{entry.title}</h2>
                        <button
                            className="btn"
                            onClick={() => navigate("/write")}
                        >
                            <PenIcon className="icon-xs"/>
                            Edit Entry
                        </button>
                    </div>

                    <p className="text-sm text-secondary-200">{entry.date}</p>
                    {/* Markdown parser */}
                    <div className="mt-3">
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
    return (
        <div>
            <DiaryHeader/>
            <DiaryEntries/>
        </div>
    );
}

export default DiaryPage;

