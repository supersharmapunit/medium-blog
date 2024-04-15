import { SignUpInput } from "@supersharmapunit/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            alert("something went wrong");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold ">
                            Create an account
                        </div>
                        <div className="text-slate-500" >
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"} >{type === "signup" ? "Sign in" : "Sign up"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        <LabelledInput label="Email" placeholder="punit@gmail.com" onchange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
                        {type === "signup" && <LabelledInput label="Name" placeholder="Punit Sharma..." onchange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} />}
                        <LabelledInput label="Password" placeholder="123456" onchange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} type="password" />
                    </div>
                    <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({ label, placeholder, onchange, type }: LabelledInputType) {
    return (
        <div>
            <label htmlFor={label} className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input onChange={onchange} type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}