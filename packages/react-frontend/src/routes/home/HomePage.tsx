//src/routes/home
import { Link } from "react-router-dom";
import { BookIcon, SaveIcon } from "../../assets/icons";
import { useEffect, useRef, useState } from "react";
import { createDiary, getUserDiaries } from "../../api/backend";
import { Diary } from "types/diary";
import { useDocTitle } from "@src/lib/useDocTitle";

function HomeHeader() {
  return (
    <div className="flex p-6">
      <h1>Welcome to Diary </h1>
    </div>
  );
}

function HomeBody() {
  useDocTitle("Diary Share | Home");
  // const diaries = [
  //     {title: "Diary 1", date: "2021-01-01"},
  //     {title: "Diary 2", date: "2021-02-01"},
  // ]
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingDiary, setCreatingDiary] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const diaries = await getUserDiaries();
        console.log(diaries);
        setDiaries(diaries);
      } catch (err) {
        setError("Failed to load diaries");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  useEffect(() => {
    if (creatingDiary) inputRef.current.focus();
  }, [creatingDiary]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const handleCreateClick = () => {
    if (!creatingDiary) setCreatingDiary(true);
    else inputRef.current.focus();
  };

  const handleSaveClick = async () => {
    const diaryTitle = inputRef.current.value;

    const newDiary = await createDiary({
      title: diaryTitle,
      lastEntry: undefined,
      numEntries: 0,
      entries: [],
    });

    setDiaries([...diaries, newDiary]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {diaries.map((diary, index) => (
        <Link key={index} to={`/app/diaries/${diary._id}`}>
          <div className="flex flex-col items-start rounded-2xl p-6 shadow-lg shadow-primary-900 bg-primary-400 hover:bg-primary-300 transition min-h-[150px] flex items-center justify-center text-secondary-100">
            <h2 className="text-xl font-bold">{diary.title}</h2>
            <h3 className="text-md opacity-50">
              {diary.entries.length}{" "}
              {diary.entries.length === 1 ? "page" : "pages"}
            </h3>
            {/*<p className="text-sm text-secondary-300">{diary.date}</p>*/}
          </div>
        </Link>
      ))}

      {/* Create Button */}
      <div
        id="create-button-container"
        className={`border-3 ${!creatingDiary && "border-dashed text-secondary-100 hover:text-primary-100"} border-primary-300 rounded-2xl p-6 shadow-lg cursor-pointer flex flex-row justify-center items-center gap-3 transition min-h-[150px]`}
        onClick={handleCreateClick}
      >
        <BookIcon className={`icon-md ${creatingDiary && "hidden"}`} />
        <h2
          className={`text-xl font-bold select-none ${creatingDiary && "hidden"}`}
        >
          Create Diary
        </h2>

        <input
          id="create-diary-input"
          ref={inputRef}
          className={`${!creatingDiary && "hidden"} text-center w-full h-full outline-none text-xl font-bold text-secondary-100`}
        />
        <SaveIcon
          aria-label="save-icon"
          className={`icon-md hover:text-primary-100 ${!creatingDiary && "hidden"}`}
          onClick={handleSaveClick}
        />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <HomeHeader />
      <HomeBody />
    </div>
  );
}

export default HomePage;
