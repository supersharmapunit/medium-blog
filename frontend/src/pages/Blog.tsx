import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        blogId : id || ""
    });
    if(loading || !blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}