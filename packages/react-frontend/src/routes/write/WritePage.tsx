import {Fragment, KeyboardEvent, ClipboardEvent, useRef, useState} from "react";
import {useEditable} from "use-editable";
import {SaveIcon} from "../../assets/icons";
import Markdown from "../../components/Markdown";
import "./WritePage.css";
import {Page} from "types/page";
import {createPage} from "../../api/backend";
import {useParams, useNavigate} from "react-router-dom";

enum Status {
    saved = "Saved!",
    changed = "Unsaved"
}

export default function WritePage() {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("Untitled Page");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [status, setStatus] = useState("");
    const editorRef = useRef(null);
    const {diaryId} = useParams();
    const navigate = useNavigate();

    const editorHandler = useEditable(editorRef, (text) => {
        setText(text);
        setStatus(Status.changed);
    })

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        const TAB_REPLACE = "&emsp;";

        if (e.key === "Tab") {
            e.preventDefault();
            editorHandler.insert(TAB_REPLACE)
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (typeof e.clipboardData === "string") {
            editorHandler.insert(e.clipboardData);
        }

    }

    const handleSubmit = async () => {
        const {text} = editorHandler.getState();
        const page = {
            title: "Untitled Page",
            date: date,
            body: text,
        };
        try {
            if (!diaryId) throw new Error("No diary ID selected");
            await createPage(diaryId, page);
            setStatus(Status.saved);
            navigate(`/diary/${diaryId}`);
        } catch (err) {
            setStatus("Failed to save");
            console.error(err);
        }

    }

    return (
        <div className="p-6 gap-6 flex flex-col bg-primary-600 h-full w-full">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 p-4">

                <div className="text-center">
                    <input
                        type="text"
                        placeholder="Untitled Page"
                        className="2-full text-4xl font-bold bg-transparent text-secondary-300 placeholder-primary-300 focus:outline-none text-center"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex justify-between items-center text-xl">
                    <div className="text-accent-200">
                        {date}
                    </div>
                    <div className="flex justify-end gap-6">
                        <div className="text-accent-500">
                            <p>{status}</p>
                        </div>
                        <button
                            className="btn flex items-center gap-2"
                            onClick={handleSubmit}
                        >
                            <SaveIcon className="icon-xs"/>
                            Submit
                        </button>
                    </div>

                </div>


                <div className="flex justify-center items-center flex-1">

                </div>
            </div>

            <div className="bg-primary-900 py-4 flex flex-row justify-center items-center h-full w-full">
                {/* Input */}
                <div
                    id="md-editor"
                    data-testid="md-editor"
                    ref={editorRef}
                    // onInput={handleInput}
                    onKeyDown={handleKeyPress}
                    onPaste={handlePaste}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="py-2 px-6 h-full w-full md:border-r-2 border-secondary-400 flex-1">
                    {text.split(/\r?\n/).map((content, i, arr) => (
                        <Fragment key={i}>
                            {/* Split identifiers from text */}
                            {content.split(/(&[a-z]{4};)/).map((innerContent, i) => (
                                <Fragment key={i}>
                                    <span
                                        className={`${innerContent.match(/&[a-z]{4};/)?.length > 0 && 'text-gray-700'}`}>
                                        {innerContent}
                                    </span>
                                </Fragment>
                            ))}
                            {i < arr.length - 1 ? '\n' : null}
                        </Fragment>
                    ))}
                </div>

                {/* Preview */}
                <div className="content py-2 px-6 h-full w-full flex-1">
                    <Markdown source={text}/>
                </div>
            </div>
        </div>
    );
}