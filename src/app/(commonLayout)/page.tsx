import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import BlogCard from "../../components/modules/homepage/BlogCard";

export default async function Home() {

  const { data } = await blogService.getBlogPosts();
  console.log(data);

  return (
    <div className="grid grid-cols-3 max-w-7xl max-auto px-4 gap-5">
      {
        data?.data?.map((post: BlogPost) => <BlogCard post={post} key={post.id} />)
      }
    </div>
  );
}
