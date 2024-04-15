import axios from "axios";
import Appbar from "../components/Appbar"
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full">
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" />
                    <TextEditor onchange={(e) => setContent(e.target.value)} />
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        navigate(`/blog/${response.data.data.id}`);
                    }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onchange }: { onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (

        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label htmlFor="editor" className="sr-only">Publish post</label>
                        <textarea onChange={onchange} id="editor" rows={8} className="pl-2 block w-full px-0 text-sm text-gray-800 bg-white outline-none" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
            </div >
        </div>
    );
}