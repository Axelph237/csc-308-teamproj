import Markdown from "../../components/Markdown";
import {CommentIcon, EyeIcon, PenIcon, UserCircleIcon} from "../../assets/icons";
import {useEffect, useRef, useState} from "react";
import {Page} from "types/page";
import {findRandomPage} from "../../../src/api/backend";

export default function RandomPage() {
    const [ page, setPage ] = useState<Page | undefined>();
    const [loading, setLoading ] = useState(true);
    const [error, setError ] = useState<string | null>(null);
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
        <div className="flex flex-row justify-center items-center gap-10 min-h-full">
            {/* Entry info */}
            <div className="rounded-lg border-2 border-secondary-500 p-4 flex flex-col gap-2 min-w-1/4 max-w-1/3">

                <div className="flex flex-row justify-start items-center gap-2">
                    <CommentIcon className="icon-sm"/>
                    <h1>Comments</h1>
                </div>

                {/* Likes Counter - UNUSED */}
                {/*<div className="flex flex-row justify-start items-center gap-2 opacity-50">*/}
                {/*    <EyeIcon className="icon-xs"/>*/}
                {/*    <p>1,045,608</p>*/}
                {/*</div>*/}

                <p>🔥😍😻🤢</p>

                {/* Comment Input */}
                <label className="border-2 border-secondary-500 rounded p-4 m-2 max-w-full min-h-12 items-center justify-center flex flex-col" onClick={() => commentInputRef.current.focus()}>
                    <span>Add Comment</span>
                    <span contentEditable suppressContentEditableWarning ref={commentInputRef} className="outline-none break-words whitespace-pre-wrap w-full"></span>
                </label>
            </div>
            {/* Diary */}
            <div className="rounded-lg border-2 border-secondary-500 p-4 flex max-w-1/2">
                {page && page.body && <Markdown source={page.body} />}
            </div>
        </div>
    );
}