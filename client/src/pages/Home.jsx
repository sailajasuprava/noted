import BlogList from "../components/BlogList";
import FilterChipBar from "../components/FilterChipBar";
import MostLikedBlogsList from "../components/MostLikedBlogsList";

function Home() {
  return (
    <div className="px-12 pt-8">
      <FilterChipBar />
      <div className="flex gap-16 mt-10">
        <div className="w-3xl">
          <BlogList />
        </div>
        <div className="flex-1">
          <MostLikedBlogsList />
        </div>
      </div>
    </div>
  );
}

export default Home;
