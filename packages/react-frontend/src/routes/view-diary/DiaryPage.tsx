import {useParams} from 'react-router-dom';

function DiaryHeader({index}) {
    return (
        <>
            <h1>Diary {index} </h1>
        </>
    );
}


function DiaryEntries() {
    const entries = [
        {title: "Stuff", date: "2021-01-01", body: "Today I did a lot of stuff." },
        {title: "Nothing", date: "2021-01-05", body: "Today I did absolutely nothing." },
    ]
    // const rows = props.characterData.map((row, index) => {
    const rows = [];
    for (let i = 0; i < entries.length; i += 2) {
        rows.push(entries.slice(i, i + 2));
    }
    return (
        <div className="flex justify-center items-center flex-1">
            <table border={1} style={{width: "100%"}}>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((diary, index) => (
                            <td key={index}>
                                <a href={"#"}>{diary.title}</a>
                                <td>{diary.date}</td>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
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

