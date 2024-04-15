import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    blogId: string;
}

export default function BlogCard({
    authorName,
    blogId,
    title,
    content,
    publishedDate
}: BlogCardProps) {
    return (
        <Link to={`/blog/${blogId}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="flex">
                        <Avatar name={authorName} />
                    </div>
                    <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
                        {authorName}
                    </div>
                    <div className="pl-2 flex justify-center flex-col">
                        <Circle />
                    </div>
                    <div className="flex justify-center flex-col font-thin pl-2 text-slate-400 text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-2">
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
            </div>
        </Link>
    );
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded bg-slate-400">
        </div>
    )
}