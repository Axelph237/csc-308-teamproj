import Markdown from "../../components/Markdown";
import {CommentIcon, EyeIcon, PenIcon, UserCircleIcon} from "../../assets/icons";
import {useEffect, useRef, useState} from "react";
import {Page} from "types/page";
import {findRandomPage} from "../../../src/api/backend";
import SvgLine from "@src/components/svgLine";

export default function RandomPage() {
    const [ page, setPage ] = useState<Page | undefined>();
    const [loading, setLoading ] = useState(true);
    const [error, setError ] = useState<string | null>(null);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const commentInputRef = useRef(null);

    useEffect(() => {
        const fetchRandomPage = async () => {
            try{
                const page = await findRandomPage();
                setPage(page);
            } catch(err) {
                console.log(err);
                setError("Failed to load page");
            } finally {
                setLoading(false);
            }
        }

        fetchRandomPage();
    }, []);
    if(loading) return <div className="p-6">Loading...</div>;
    if(error) return <div className="p-6 text-red-500">Error: {error}</div>;


    return (
        <div className="flex flex-row justify-center items-center gap-10 min-h-full p-6">
            {/* Diary */}
            <div className="rounded-lg shadow-lg shadow-primary-900 bg-primary-400 p-4 flex flex-row gap-3 max-w-full">
                {/* Main text */}
                <div className="flex flex-col gap-3">
                    <h1>{page && page.title}</h1>
                    <SvgLine strokeWidth={1} stroke="#ffffff" />
                    {page && <Markdown source={page.body} />}
                </div>
                <SvgLine vertical strokeWidth={1} stroke="#ffffff" />
                {/* Sidebar */}
                <div className="flex flex-col justify-start items-center gap-6 transition-all duration-150 items-center justify-center">
                    <b>React</b>
                    <span className="flex flex-col items-center gap-1">
                        <button
                            className="text-4xl select-none cursor-pointer hover:scale-120 transition-all duration-150">😻</button>
                        <p>{page?.likeCounter ? page.likeCounter : 0}</p>
                    </span>

                    <span className="flex flex-col items-center gap-1">
                        <button
                            className={`${commentsOpen && "opacity-25"} cursor-pointer hover:scale-120 transition-all duration-150`}
                            onClick={() => setCommentsOpen(!commentsOpen)}><CommentIcon className="icon-sm"/></button>
                        <p>{page?.comments ? page.comments.length : 0}</p>
                    </span>
                </div>
                {commentsOpen && (<div className="flex flex-col gap-2 items-center w-1/2">
                    <b>Comments</b>
                    <label
                        className="bg-primary-600 rounded p-4 m-2 w-full min-h-12 items-center justify-center flex flex-col"
                        onClick={() => commentInputRef.current.focus()}>
                        <input ref={commentInputRef} className="outline-none break-words whitespace-pre-wrap w-full" type="text" placeholder="Add Comment"/>
                    </label>
                </div>)}
            </div>
        </div>
    );
}