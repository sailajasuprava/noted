import BlogList from "../components/BlogList";
import FilterChipBar from "../components/FilterChipBar";

function Home() {
  return (
    <div className="px-12 pt-8">
      <FilterChipBar />
      <BlogList />
    </div>
  );
}

export default Home;
