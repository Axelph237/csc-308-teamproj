// src/Table.jsx
import PropTypes from "prop-types";

// src/Table.jsx
function HomeHeader() {
    return (
        <>
            <h1>Welcome to Diary </h1>
        </>
    );
}

function NavigationBar() {
    return (
        <div style={{display: "flex", gap: "100px"}}>
            <a href="/home">Home</a>
            <a>Random Page</a>
            <a>New Entry</a>
            <a>Settings</a>
        </div>
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
        <table border="1" style={{width: "100%"}}>
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

function Home() {
    return (
        <div>
            <NavigationBar/>
            <HomeHeader/>
            <HomeBody/>
            <Journal diaryName={'Diary'}/>
        </div>
    );
}

export default Home;

function Journal({diaryName}) {
    return (
        <div className='flex flex-col justify-center items-center rounded-xl w-fit h-fit p-6 bg-gray-500'>
            <h1 className='text-white text-2xl font-bold'>{diaryName}</h1>
        </div>
    )
}

Journal.propTypes = {
    diaryName: PropTypes.string.isRequired,
}