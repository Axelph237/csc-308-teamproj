import Markdown from "../../components/Markdown";
import {
  CommentIcon,
  EyeIcon,
  PenIcon,
  SendIcon,
  UserCircleIcon,
} from "../../assets/icons";
import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  Fragment,
} from "react";
import { Page } from "types/page";
import { addLike, findRandomPage, postComment } from "../../../src/api/backend";
import SvgLine from "@src/components/svgLine";
import "./heartParticle.css";
import { useDocTitle } from "@src/lib/useDocTitle";

export default function RandomPage() {
  useDocTitle("Diary Share | Random Diaries");
  const [pageInfo, setPageInfo] = useState<
    { parentDiaryId: string; page: Page } | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [commentsOpen, setCommentsOpen] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchRandomPage = async () => {
      try {
        const result = await findRandomPage();
        setPageInfo(result);
      } catch (err) {
        console.log(err);
        setError("Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPage();
  }, []);

  const handleCommentSubmit = () => {
    const comment = commentInputRef.current.value;
    commentInputRef.current.value = "";

    postComment(pageInfo.parentDiaryId, pageInfo.page._id, comment)
      .then((page: Page) =>
        setPageInfo({ parentDiaryId: pageInfo.parentDiaryId, page }),
      )
      .catch((err) => {
        console.log(err);
        commentInputRef.current.value = comment;
      });
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCommentSubmit();
    }
  };

  const handleAddLike = (event: MouseEvent<HTMLButtonElement>) => {
    heartEffect(event.currentTarget);

    addLike(pageInfo.parentDiaryId, pageInfo.page._id)
      .then((page: Page) =>
        setPageInfo({ parentDiaryId: pageInfo.parentDiaryId, page }),
      )
      .catch((err) => console.log(err));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-row justify-center items-center gap-10 min-h-full p-6">
      {/* Diary */}
      <div className="rounded-lg shadow-lg shadow-primary-900 bg-primary-400 p-4 flex flex-col gap-3 max-w-full">
        {/* Main text */}
        <div className="flex flex-col gap-3">
          <h1>{pageInfo.page && pageInfo.page.title}</h1>
          <SvgLine strokeWidth={1} stroke="#ffffff" />
          {pageInfo.page && <Markdown source={pageInfo.page.body} />}
        </div>
        <SvgLine strokeWidth={1} stroke="#ffffff" />
        {/* Sidebar */}
        <div className="flex flex-row justify-center items-end gap-6 transition-all duration-150 items-center justify-center">
          {/* Likes button */}
          <span className="flex flex-col items-center gap-1">
            <button
              className="relative text-4xl select-none cursor-pointer hover:scale-120 transition-all duration-150"
              onClick={handleAddLike}
            >
              😻
            </button>
            <p>{pageInfo.page?.likeCounter ? pageInfo.page.likeCounter : 0}</p>
          </span>

          {/* Comments button */}
          <span className="flex flex-col items-center gap-1">
            <button
              className={`${commentsOpen && "opacity-25"} cursor-pointer hover:scale-120 transition-all duration-150`}
              aria-label="toggle-comments"
              onClick={() => setCommentsOpen(!commentsOpen)}
            >
              <CommentIcon className="icon-sm" />
            </button>
            <p>{pageInfo.page?.comments ? pageInfo.page.comments.length : 0}</p>
          </span>
        </div>
        {/* Comments section */}
        <div
          className={`${commentsOpen || "hidden"} flex flex-col gap-2 items-center`}
        >
          <label
            className="bg-primary-600 rounded p-4 m-2 w-full min-h-12 items-center justify-center flex flex-row"
            onClick={() => commentInputRef.current.focus()}
          >
            <input
              ref={commentInputRef}
              className="outline-none break-words whitespace-pre-wrap w-full"
              type="text"
              placeholder="Add Comment"
              onKeyDown={handleEnter}
            />
            <SendIcon
              className="icon-sm opacity-25 hover:opacity-100 hover:scale-120 transition-all duration-150 cursor-pointer"
              aria-label="send-button"
              onClick={handleCommentSubmit}
            />
          </label>

          <b>Comments</b>

          {/* Posted comments */}
          <ul className="flex flex-col justify-start gap-2 w-full">
            {pageInfo.page.comments &&
              pageInfo.page.comments.map((comment, i) => (
                <Fragment key={i}>
                  <li className="comment">{comment.text}</li>
                </Fragment>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function heartEffect(parent: HTMLElement) {
  const MAX_FORCE = 12;
  const MAX_LIFETIME = 2;
  const MIN_LIFETIME = 1.5;
  // Basic styling
  const particle = document.createElement("span");

  particle.style.position = "absolute"; // Ensure particle is outside typically DOM layout
  particle.classList.add("heart-particle"); // Particle animation handled in css
  particle.style.setProperty(
    "--force-x",
    `${Math.random() * MAX_FORCE * (Math.random() < 0.5 ? -1 : 1)}`,
  );
  particle.style.setProperty(
    "--lifetime",
    `${Math.random() * (MAX_LIFETIME - MIN_LIFETIME) + MIN_LIFETIME}s`,
  );

  // Text styling
  const hearts = ["😻", "💞", "💖", "💗", "💓", "️💘", "😍", "🥰"];
  particle.innerText = hearts[Math.round(Math.random() * (hearts.length - 1))]; // Random heart

  parent.appendChild(particle); // Add particle to element
}
