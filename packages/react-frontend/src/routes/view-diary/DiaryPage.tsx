import {useParams} from 'react-router-dom';

function DiaryHeader({index}) {
    return (
        <div className="p-5">
            <h1>Diary {index} </h1>
        </div>
    );
}


function DiaryEntries() {
    const entries = [
        {title: "First Entry!", date: "2021-01-01", body: "Today I did a lot of stuff. I also did stuff here and there. I went rock climbing it was really fun." },
        {title: "Nothing", date: "2021-01-05", body: "Today I did absolutely nothing." },
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
                     style={{minHeight: "150px" }}
                >
                    <h2 className="text-xl font-bold text-accent-300">{entry.title}</h2>
                    <p className="text-sm text-secondary-200">{entry.date}</p>
                    <p className={"mt-3 text-secondary-50"}>{entry.body}</p>
                </div>
            )}
        </div>
    );
}

function DiaryPage() {
    let {index} = useParams();
    return (
        <div>
            <DiaryHeader index={index} />
            <DiaryEntries />
        </div>
    );
}

export default DiaryPage;

