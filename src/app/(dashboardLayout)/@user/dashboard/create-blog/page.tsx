import CreateBlogFormServer from "@/components/modules/user/createBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {

    const { data } = await blogService.getBlogPosts();

    return (
        <div>
            <h1 className="text-2xl font-bold">Create Blog</h1>
            <CreateBlogFormServer />
            {
                data.map((blog: BlogPost) => (
                    <div key={blog.id} className="border p-4 rounded-md mt-4">
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                    </div>
                ))
            }
        </div>
    );
};

export default CreateBlogPage;