export interface DiaryEntryProps {
    title: string,
    date: string,
    body: string
}

export default function DiaryEntry({title, date, body}: DiaryEntryProps ) {
    return (
        <div className="border border-accent-700 rounded-2xl p-6 shadow-lg bg-primary-100 text-white relative min-h-[150px]" >
            <h2 className="text-xl font-bold text-accent-300">{title}</h2>
            <p className="text-sm text-secondary-200">{date}</p>
            <p className={"mt-3 text-secondary-50"}>{body}</p>
        </div>
    )
}