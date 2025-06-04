import {useEffect} from "react";

export const useDocTitle = (title: string, append: boolean = false) => {
    const docTitle = document.title;

    return useEffect(() => {
        document.title = append ? docTitle + title : title;
        return () => {
            document.title = docTitle;
        }
    }, [])
}