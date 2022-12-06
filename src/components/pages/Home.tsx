import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props: { recipe: []; getRecipeData: any; imgURL: string }) => {
    const { recipe, getRecipeData, imgURL } = props;
    useEffect(() => {
        localStorage.removeItem("recipes");
        localStorage.removeItem("img");
    }, []);

    return (
        <div>
            <h1 className="text-center">Recipe's</h1>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input
                    type="text"
                    id="search"
                    className="col-md-8 col-lg-6 mt-1 mb-2"
                    placeholder="Search Recipe's"
                />
                <button
                    type="submit"
                    className="btn btn-dark col-md-3 col-lg-2"
                >
                    Search
                </button>
            </form>
            <div id="recipe-list">
                {/* map function that maps out recipe */}
                {recipe.map((item: any, index: number) => (
                    <Link
                        to={"view-recipe/" + item.RecipeName}
                        className="d-flex flex-column justify-content-center align-items-center w-100"
                        onClick={() => getRecipeData(item)}
                    >
                        <div
                            className="recipe d-flex custom-card col-12 col-sm-8 col-md-8 col-lg-6"
                            key={index}
                        >
                            <div>
                                <h2>{item.RecipeName}</h2>
                                <img
                                    src={
                                        imgURL + "/" + item.RecipeName + ".jpg"
                                    }
                                    alt={item.RecipeName}
                                    height="200px"
                                    width="200px"
                                />
                            </div>
                            <p>{item.RecipeDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Home;
