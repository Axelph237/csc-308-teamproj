import {getRandomDiaryPage} from "../../api/user";

export default function RandomPage() {
    return (
        <div style={{display: "flex", gap: "100px"}}>
            {getRandomDiaryPage().body}
        </div>
    );
}