import { useParams } from "react-router-dom";

function Category() {
  const { category } = useParams();
  return (
    <div>
      <h1 className="uppercase text-center font-bold bg-gray-100 text-3xl py-10">
        Category: <span>{category}</span>
      </h1>
    </div>
  );
}

export default Category;
