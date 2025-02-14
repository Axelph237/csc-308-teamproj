// src/Home.jsx
function HomeHeader() {
    return (
        <>
            <h1>Welcome to Diary </h1>
        </>
    );
}


function HomeBody() {
    const diaries = [
        {title: "Diary 1", date: "2021-01-01"},
        {title: "Diary 2", date: "2021-02-01"},
    ]
    // const rows = props.characterData.map((row, index) => {
    const rows = [];
    for (let i = 0; i < diaries.length; i += 2) {
        rows.push(diaries.slice(i, i + 2));
    }
    return (
        <table border={1} style={{width: "100%"}}>
            <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((diary, index) => (
                        <td key={index}>
                            <a href={"#"}>{diary.title}</a>
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function HomePage() {
    return (
        <div>
            <HomeHeader/>
            <HomeBody/>
        </div>
    );
}

export default HomePage;

