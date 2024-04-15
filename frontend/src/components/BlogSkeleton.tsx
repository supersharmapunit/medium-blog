import { Circle } from "./BlogCard";

export default function BlogSkeleton() {
    return (

        <div className="p-4 max-w-lg animate-pulse border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer" role="status">
            <div className="flex">
                <div className="flex">
                    <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
                <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="flex justify-center flex-col font-thin pl-2 text-slate-400 text-sm">
                    
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
                <div className="h-4 bg-gray-200 rounded-full w-28 mb-4"></div>
            </div>
        </div>
    );
}