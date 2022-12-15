import { useEffect, useState } from "react";
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
            <div id="recipe-list">
                {/* map function that maps out recipe */}
                {recipe.map((item: any, index: number) => (
                    <Link
                        to={"view-recipe/" + item.RecipeName}
                        className="d-flex flex-column justify-content-center align-items-center col-md-6 m-auto"
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={() => getRecipeData(item)}
                    >
                        <div
                            className="recipe d-flex flex-sm-column flex-lg-row custom-card col-lg-12"
                            key={index}
                        >
                            <div>
                                <img
                                    src={`${imgURL}/static/${item.RecipeName}.jpg`}
                                    alt={item.RecipeName}
                                    height="200px"
                                    width="200px"
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center w-100">
                                <h2>{item.RecipeName}</h2>
                                <p>{item.RecipeDescription}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Home;
