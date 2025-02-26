import {useParams, useNavigate} from 'react-router-dom';
import Markdown from "../../components/Markdown";
import {PenIcon} from "../../assets/icons";

function DiaryHeader({index}) {
    return (
        <div className="p-5">
            <h1>Diary {index} </h1>
        </div>
    );
}


function DiaryEntries() {
    const navigate = useNavigate();

    const entries = [
        {
            title: "First Entry!",
            date: "2021-01-01",
            body: "# Intro\nToday I did a lot of stuff. I also did stuff here and there.\n## Other things\nI went rock climbing it was really fun."
        },
        {title: "Nothing", date: "2021-01-05", body: "Today I did absolutely **_nothing_**."},
    ]
    // const rows = props.characterData.map((row, index) => {
    const rows = [];
    for (let i = 0; i < entries.length; i += 2) {
        rows.push(entries.slice(i, i + 2));
    }
    return (
        <div className="grid grid-cols-2 gap-6 p-6 ">
            {entries.map((entry, index) =>
                <div key={index}
                     className="border border-accent-700 rounded-2xl p-6 shadow-lg bg-primary-100 text-white relative"
                     style={{minHeight: "150px"}}
                >
                    <div className="flex justify-between items-center">

                        <h2 className="text-xl font-bold text-accent-300">{entry.title}</h2>
                        <button
                            className="btn"
                            onClick={() => navigate("/write")}
                        >
                            <PenIcon className="icon-xs"/>
                            Edit Entry
                        </button>
                    </div>

                    <p className="text-sm text-secondary-200">{entry.date}</p>
                    {/* Markdown parser */}
                    <div className="mt-3">
                        <Markdown source={entry.body}/>
                    </div>
                </div>
            )}
        </div>
    );
}

function DiaryPage() {
    let {index} = useParams();
    return (
        <div>
            <DiaryHeader index={index}/>
            <DiaryEntries/>
        </div>
    );
}

export default DiaryPage;

