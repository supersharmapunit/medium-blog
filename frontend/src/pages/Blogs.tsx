import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard'
import BlogSkeleton from '../components/BlogSkeleton';
import { useBlogs } from '../hooks';

export default function Blogs() {
    const {loading, blogs} = useBlogs();
    if(loading) {
        return (
            <div>
                <Appbar />
                <div className='flex justify-center'>
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Appbar />
            <div className='flex justify-center'>
                <div className=''>
                    {blogs.map((blog) => {
                        return <BlogCard blogId={blog.id}    key={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate='April 15, 2024' />
                    })}
                </div>
            </div>
        </div>
    );
}