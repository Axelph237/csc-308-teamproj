import Markdown from "../../components/Markdown";
import {EyeIcon, UserCircleIcon} from "../../assets/icons";
import {useEffect, useState} from "react";
import {getDiaryPages} from "../../api/backend";

export default function RandomPage() {
    const [ page, setPage ] = useState<string | undefined>();


    useEffect(() => {
        const newPage = "Hello :3"
        setPage(newPage);
    }, [])

    return (
        <div className="flex flex-row justify-center items-center gap-10">
            {/* Entry info */}
            <div className="rounded-lg border-2 border-secondary-500 p-4 flex flex-col gap-2 min-w-1/4">

                <div className="flex flex-row justify-start items-center gap-2">
                    <UserCircleIcon className="icon-sm"/>
                    <h1>Anon user</h1>
                </div>

                <div className="flex flex-row justify-start items-center gap-2 opacity-50">
                    <EyeIcon className="icon-xs"/>
                    <p>1,045,608</p>
                </div>

                <p>🔥😍😻🤢</p>

                <div className="border-2 border-secondary-500 rounded p-4 m-2">
                    Comments
                </div>
            </div>
            {/* Diary */}
            <div className="rounded-lg border-2 border-secondary-500 p-4 flex max-w-1/2">
                <Markdown source={page}/>
            </div>
        </div>
    );
}