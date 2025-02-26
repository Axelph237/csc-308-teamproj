import {Fragment, KeyboardEvent, useRef, useState} from "react";
import {useEditable} from "use-editable";
import {SaveIcon} from "../../assets/icons";
import Markdown from "../../components/Markdown";
import "./WritePage.css";


export default function WritePage() {
    const [text, setText] = useState("");
    const editorRef = useRef(null);

    const editorHandler = useEditable(editorRef, (text) => {
        setText(text);
    })

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        const TAB_REPLACE = "&emsp;";

        if (e.key === "Tab") {
            e.preventDefault();
            editorHandler.insert(TAB_REPLACE)
        }
    }

    const handleSubmit = () => {
        const {text} = editorHandler.getState();

        uploadEntry(text);
    }

    return (
        <div className="p-6 gap-6 flex flex-col bg-primary-600 h-full w-full">
            {/* Toolbar */}
            <div className="flex flex-row">
                <div className="flex justify-center items-center flex-1">
                    <h1>Write your Entry!</h1>
                </div>
                <div className="flex justify-center items-center flex-1">
                    <button
                        className="btn"
                        onClick={handleSubmit}>
                        <SaveIcon className="icon-xs"/>
                        Submit
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="bg-primary-900 py-4 grid grid-cols-2 justify-center items-center flex-1">
                {/* Input */}
                <div
                    id="md-editor"
                    ref={editorRef}
                    // onInput={handleInput}
                    onKeyDown={handleKeyPress}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="py-2 px-6 h-full w-full md:border-r-2 border-secondary-400">
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
                <div id="md-preview" className="py-2 px-6 size-full">
                    <Markdown source={text}/>
                </div>
            </div>
        </div>
    );
}

function uploadEntry(entry: string) {
    console.log(entry);
}