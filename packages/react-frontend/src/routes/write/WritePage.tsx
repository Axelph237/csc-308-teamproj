import {Marked} from "marked";
import {ChangeEvent, Fragment, KeyboardEvent, useRef, useState} from "react";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "./WritePage.css";
import {useEditable} from "use-editable";

const SPLITTER = /\r?\n/;
const exampleMd = "# Title\n\n## Contents\n\n## What is a penguin?\nA penguin is a thing that does *not* exist.\n\n### What about those birds?\n**Not real**\n\n## What is an Elephat\nBest animal ever :)\n"

export default function WritePage() {
    const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs language-plaintext',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        })
    );
    marked.setOptions({
        breaks: true, // Enable single newline as a line break
        gfm: true,
    });

    const [text, setText] = useState("");
    const [html, setHtml] = useState("");
    const editorRef = useRef(null);

    const editorHandler = useEditable(editorRef, (text) => {
        setText(text);
        setHtml(marked.parse(text) as string);
    })

    // const handleInput = (e: ChangeEvent<HTMLDivElement>) => {
    //     setHtml(marked.parse(e.currentTarget.innerText) as string);
    // }

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        const TAB_REPLACE = "&emsp;";

        if (e.key === "Tab") {
            e.preventDefault();
            editorHandler.insert(TAB_REPLACE)
        }
    }

    return (
        <div className="p-6 gap-6 flex flex-col bg-primary-600 h-full w-full">
            <h1>Write your Entry!</h1>

            <div className="flex flex-row justify-center items-center h-full w-full">
                {/* Input */}
                <div
                    id="md-editor"
                    ref={editorRef}
                    // onInput={handleInput}
                    onKeyDown={handleKeyPress}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="p-6 bg-primary-900 h-full w-full flex-1">
                    {text.split(/\r?\n/).map((content, i, arr) => (
                        <Fragment key={i}>
                            {/* Split identifiers from text */}
                            {content.split(/(&[a-z]{4};)/).map((innerContent, i) => (
                                <Fragment key={i}>
                                    <span className={`${innerContent.match(/&[a-z]{4};/)?.length > 0 && 'text-gray-700'}`}>
                                        {innerContent}
                                    </span>
                                </Fragment>
                            ))}
                            {i < arr.length - 1 ? '\n' : null}
                        </Fragment>
                    ))}
                </div>

                {/* Preview */}
                <div className="content p-6 bg-primary-900 h-full w-full flex-1" dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        </div>
    );
}