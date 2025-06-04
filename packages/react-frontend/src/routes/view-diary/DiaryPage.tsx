import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon, TrashIcon} from "../../assets/icons";
import {act, Fragment, useEffect, useState} from "react";
import {getUserDiaries, ApiError, removePage} from "../../api/backend";
import {Page} from "types/page";
import {Diary} from "types/diary";
import SvgLine from "@src/components/svgLine";
import {useDocTitle} from "@src/lib/useDocTitle";

function DiaryHeader({diary}: { diary: Diary }) {

    return (
        <div className="p-5">
            <h1>{diary.title || "Untitled Diary"} </h1>
        </div>
    );
}

function DiaryEntry({diary, page, onPageDeleted}: { diary: Diary, page: Page, onPageDeleted: () => void }) {
    const [hovering, setHovering] = useState(false);
    const navigate = useNavigate();
    const handleRemovePage = async () => {
        try {
            await removePage(page._id, diary._id);
            onPageDeleted(); // Rerenders page
        } catch (err) {
            alert("Failed to delete page: " + err);
        }
    }

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

                <div
                    className={`${!hovering && "opacity-50"} lex flex-row gap-2 items-center transition-all duartion-200`}>
                    <button
                        className="text-primary-800 opacity-50 hover:opacity-90 transition-all duration-200 cursor-pointer"
                        onClick={handleRemovePage}
                        aria-label="Remove page"
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
                className="flex flex-col bg-primary-600 min-h-full overflow-y-scroll px-4 pb-24 gap-3">
                <Markdown source={page.body}/>
                <div className="w-full flex flex-col">
                    <SvgLine strokeWidth={1} stroke="#ffffff" />
                    <span className="bg-primary-500 p-3 gap-3 flex flex-col rounded-br-lg rounded-bl-lg">

                    {/*    Comments */}
                        {page.likeCounter && (
                            <span><b>Likes 😻</b> {page.likeCounter} </span>
                        )}
                        {page.comments && (
                            <>
                                <span><b>Comments</b> {page.comments.length}</span>
                                {page.comments.length > 0
                                    ? (<ul>
                                        {page.comments.map((comment, i) => <Fragment key={i}>
                                            <li className="comment">{comment.text}</li>
                                        </Fragment>)}
                                    </ul>)
                                    : "No comments"
                                }
                            </>
                        )}
                    </span>
                </div>
            </div>
        </li>
    )
}

function DiaryEntries({diary, onPageDeleted}: { diary: Diary, onPageDeleted: () => void }) {
    return (
        <ul className="grid md:grid-cols-2 gap-6 p-6 ">
            {diary.entries.length > 0
                ? diary.entries.map((page, index) =>
                    <Fragment key={index}>
                        <DiaryEntry diary={diary} page={page} onPageDeleted={onPageDeleted}/>
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
    useDocTitle("Diary Share | View Diary");
    let {diaryId} = useParams();
    const [diary, setDiary] = useState<Diary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchDiary = async () => {
        try {
            if (!diaryId) {
                setError("Diary not found.");
                return;
            }

            const diary = (await getUserDiaries())
                .find((d) => d._id === diaryId);

            if (!diary)
                setError("Diary not found.");
            act(() => {
                setDiary(diary);
            })

        } catch (error) {
            console.error(error);
            setError("Failed to load diary." + error);
        } finally {
            act(() => {
                setLoading(false);
            })

        }
    }

    useEffect(() => {
        fetchDiary();
    }, [diaryId]); // runs whenever index changes

    if (loading) return <div>Loading diary...</div>;
    if (error || !diary) return <div className="text-red-500">Error: {error}</div>;


    return (
        <div>
            <DiaryHeader diary={diary}/>
            <DiaryEntries diary={diary} onPageDeleted={fetchDiary}/>
        </div>
    );
}

export default DiaryPage;
