import {Marked} from "marked";
import {ChangeEvent, useRef, useState} from "react";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "./WritePage.css";

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

    const [html, setHtml] = useState("");
    const editorRef = useRef(null);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHtml(marked.parse(e.target.value) as string);
    }

    return (
        <div className="p-6 gap-6 flex flex-col bg-secondary-800 h-full w-full">
            <h1>Write your Entry!</h1>

            <div className="flex flex-row justify-center items-center">
                {/* Input */}
                <textarea
                    id="md-editor"
                    ref={editorRef}
                    onInput={handleInput}
                    className="p-6 bg-primary-700 flex-1">
                </textarea>

                {/* Preview */}
                <div className="content bg-primary-700 p-6 flex-1" dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        </div>
    );
}