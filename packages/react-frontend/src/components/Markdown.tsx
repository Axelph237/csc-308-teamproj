import {Marked} from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "./Markdown.css"

export default function Markdown({rawBody}: {rawBody: string} ) {
    // Create mark down handler with marked
    // Add syntax highlighting for code blocks
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
    // Set options for markdown lexer
    marked.setOptions({
        breaks: true, // Enable single newline as a line break
        gfm: true,
    });

    return (
        <div className="content" dangerouslySetInnerHTML={{ __html: marked.parse(rawBody) }}/>
    )
}