// A custom hook that builds on useLocation to parse
// the query string for you.
import {useMemo} from "react";
import { useLocation } from 'react-router-dom'

export default function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}