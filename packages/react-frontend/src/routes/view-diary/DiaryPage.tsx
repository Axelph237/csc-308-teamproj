import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon} from "../../assets/icons";
import {useEffect, useState} from "react";
import {getUserDiaries, getDiaryPages} from "../../api/backend";
import {Page} from "types/page";
import {Diary} from "types/diary";

function DiaryHeader({diary}: { diary: Diary }) {

    return (
        <div className="p-5">
            <h1>{diary.title || "Untitled Diary"} </h1>
        </div>
    );
}

function DiaryEntries({diary}: { diary: Diary }) {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPages() {
            try {
                const fetched = await getDiaryPages(diary._id);
                setPages(fetched);
            } catch (err) {
                setError("Failed to load pages.");
            } finally {
                setLoading(false);
            }
        }

        fetchPages();
    }, [diary._id]);

    if (loading) return <div>Loading entries...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="grid grid-cols-2 gap-6 p-6 ">
            {pages.map((page, index) =>
                <div key={index}
                     className="flex flex-col border-2 border-secondary-500 rounded-2xl shadow-lg bg-secondary-500 overflow-hidden max-h-96"
                     style={{minHeight: "150px"}}
                >
                    {/* Diary header */}
                    <div className="flex flex-row p-4 justify-between items-center">
                        {/* Diary title */}
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-secondary-100">{page.title}</h2>

                            <p className="text-sm text-secondary-100 opacity-75">{page.date}</p>
                        </div>
                        <button
                            className="text-primary-700 opacity-50 hover:opacity-75 transition-all cursor-pointer"
                            onClick={() => navigate("/write")}
                        >
                            <PenIcon className="icon-sm"/>
                        </button>
                    </div>

                    <div
                        className="flex bg-primary-600 overflow-y-scroll pl-4 pr-4">
                        <Markdown source={page.body}/>
                    </div>
                </div>
            )}
        </div>
    );
}

function DiaryPage() {
    let {index} = useParams();
    const [diary, setDiary] = useState<Diary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDiary() {
            try {
                const diaries = await getUserDiaries();
                const diary = diaries[parseInt(index!)];
                if (!diary) {
                    setError("Diary not found.");
                    return;
                }
                setDiary(diary);

            } catch (error) {
                setError("Failed to load diary.");
            } finally {
                setLoading(false);
            }
        }

        fetchDiary();
    }, [index]); // runs whenever index changes

    if (loading) return <div>Loading diary...</div>;
    if (error || !diary) return <div className="text-red-500">Error: {error}</div>;


    return (
        <div>
            <DiaryHeader diary={diary}/>
            <DiaryEntries diary={diary}/>
        </div>
    );
}

export default DiaryPage;
