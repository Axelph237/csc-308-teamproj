import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon, TrashIcon} from "../../assets/icons";
import {Fragment, useEffect, useState} from "react";
import {getUserDiaries, getDiaryPages, ApiError} from "../../api/backend";
import {Page} from "types/page";
import {Diary} from "types/diary";

function DiaryHeader({diary}: { diary: Diary }) {

    return (
        <div className="p-5">
            <h1>{diary.title || "Untitled Diary"} </h1>
        </div>
    );
}

function DiaryEntry({ diary, page }: { diary: Diary, page: Page }) {
    const [hovering, setHovering] = useState(false);
    const navigate = useNavigate();

    return (
        <li
            className="flex flex-col rounded-2xl shadow-lg shadow-primary-900 bg-primary-400 overflow-hidden max-h-96"
            style={{minHeight: "150px"}}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Entries display */}
            {/* Diary header */}
            <div className="flex flex-row p-4 justify-between items-center">
                {/* Diary title */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-secondary-100">{page.title}</h2>

                    <p className="text-sm text-secondary-100 opacity-75">{page.date}</p>
                </div>

                <div className={`${!hovering && "opacity-50"} lex flex-row gap-2 items-center transition-all duartion-200`}>
                    <button
                        className="text-primary-800 opacity-50 hover:opacity-90 transition-all duration-200 cursor-pointer"
                        onClick={() => alert("Can't delete that right now :/")}
                    >
                        <TrashIcon className="icon-sm"/>
                    </button>

                    <button
                        className="text-primary-800 opacity-50 hover:opacity-90 transition-all cursor-pointer"
                        onClick={() => navigate(`/app/write?diary=${diary._id}&page=${page._id}`)}
                    >
                        <PenIcon className="icon-sm"/>
                    </button>
                </div>
            </div>

            <div
                className="flex bg-primary-600 min-h-full overflow-y-scroll pl-4 pr-4">
                <Markdown source={page.body}/>
            </div>
        </li>
    )
}

function DiaryEntries({diary}: { diary: Diary }) {
    return (
        <ul className="grid grid-cols-2 gap-6 p-6 ">
            {diary.entries.length > 0
                ? diary.entries.map((page, index) =>
                    <Fragment key={index}>
                        <DiaryEntry diary={diary} page={page} />
                    </Fragment>
                )
                : <div>
                    {/* No entries display */}
                    No diary entries
                </div>}
        </ul>
    );
}

function DiaryPage() {
    let {diaryId} = useParams();
    const [diary, setDiary] = useState<Diary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDiary() {
            try {
                if (!diaryId) {
                    setError("Diary not found.");
                    return;
                }

                const diary = (await getUserDiaries())
                    .find((d) => d._id === diaryId);

                if (!diary)
                    setError("Diary not found.");

                setDiary(diary);
                console.log("Loaded diary:", diary);
            } catch (error) {
                console.error(error);
                setError("Failed to load diary." + error);
            } finally {
                setLoading(false);
            }
        }

        fetchDiary();
    }, [diaryId]); // runs whenever index changes

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
