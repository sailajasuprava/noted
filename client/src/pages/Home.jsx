import BlogList from "../components/BlogList";
import FilterChipBar from "../components/FilterChipBar";
import useHome from "../hooks/useHome";

function Home() {
  const {
    active,
    blogs,
    hasMore,
    isLoading,
    fetchAllBlogs,
    handleCategoryClick,
  } = useHome();

  return (
    <div className="px-12 pt-8">
      <FilterChipBar
        active={active}
        handleCategoryClick={handleCategoryClick}
      />
      <BlogList
        blogs={blogs}
        hasMore={hasMore}
        isLoading={isLoading}
        fetchAllBlogs={fetchAllBlogs}
      />
    </div>
  );
}

export default Home;
