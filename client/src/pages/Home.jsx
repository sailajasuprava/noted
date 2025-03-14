import BlogList from "../components/BlogList";
import MostLikedBlogsList from "../components/MostLikedBlogsList";

function Home() {
  return (
    <div className="flex gap-16 px-12">
      <div className="w-3xl">
        <BlogList />
      </div>
      <div className="flex-1">
        <MostLikedBlogsList />
      </div>
    </div>
  );
}

export default Home;
