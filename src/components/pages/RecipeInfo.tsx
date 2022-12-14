import { useEffect, useState } from "react";

const RecipeInfo = (props: { data: any; img: string }) => {
    const [ingredientCollapsed, setIngredientCollapsed] = useState(true);
    const [instructionsCollapsed, setInstructionsCollapsed] = useState(true);
    const { data, img } = props;
    const [recipe, setRecipe] = useState(
        !localStorage.getItem("recipes")
            ? data
            : JSON.parse(localStorage.getItem("recipes")!)
    );
    const [servingAdjustment, setServingAdjustment] = useState(1);

    const ingredientList = (
        <div>
            <h3>Ingredients</h3>
            <ul>
                {recipe.RecipeIngredients.map((item: any, index: any) =>
                    item.IngredientName !== "" ? (
                        <li key={index}>
                            {item.IngredientName} -{" "}
                            {parseInt(item.IngredientQuantity) *
                                servingAdjustment}
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );

    const instructionsList = (
        <div>
            <h3>Instructions</h3>
            <ol>
                {recipe.RecipeInstructions.map((item: any, index: any) =>
                    item !== "" ? <li key={index}>{item}</li> : null
                )}
            </ol>
        </div>
    );

    useEffect(() => {
        const data = localStorage.getItem("recipes");
        if (data === null) {
            localStorage.setItem("recipes", JSON.stringify(recipe));
        }
    }, [recipe]);

    const onServingAdjustmentChange = () => {
        const servingSize = document.getElementById(
            "servingSize"
        ) as HTMLSelectElement;
        const servingSizeValue = servingSize.value;
        if (servingSizeValue === "") {
            setServingAdjustment(1);
        } else {
            setServingAdjustment(parseFloat(servingSizeValue));
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Recipe Info</h1>
            <div id="recipeHeading" className="row row-cols-sm-1 row-cols-md-2">
                <div className="row">
                    <div className="container col-md-6">
                        <img
                            src={`${img}/static/${recipe.RecipeName}.jpg`}
                            alt="recipe"
                            className="img-fluid d-block"
                            height="300"
                            width="300"
                        />
                    </div>
                </div>
                <div className="container">
                    <h2 className="">{recipe.RecipeName}</h2>
                    <h4>Description</h4>
                    <p id="description" className="m-auto">
                        {recipe.RecipeDescription}
                    </p>
                    <div className="">
                        <h5>{recipe.RecipeServingSize * servingAdjustment}</h5>
                        <div>
                            <label
                                className="d-none"
                                htmlFor="servingAdjustment"
                            >
                                Change serving size
                            </label>
                            <select
                                name="servingAdjustment"
                                id="servingSize"
                                onChange={onServingAdjustmentChange}
                            >
                                <option value="1">Serving Size</option>
                                <option value="1">Regular</option>
                                <option value=".5">Half</option>
                                <option value="2">double</option>
                            </select>
                            <div>
                                <p id="prepTime">
                                    Cook Time-
                                    <span>{recipe.RecipeCookTime}</span>
                                </p>
                            </div>
                            <div>
                                <p id="difficulty">{recipe.RecipeDifficulty}</p>
                            </div>
                        </div>
                    </div>
                    <div className="m-2">
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                ingredientCollapsed
                                    ? setIngredientCollapsed(false)
                                    : setIngredientCollapsed(true)
                            }
                        >
                            Ingredients
                        </button>
                        {!ingredientCollapsed ? ingredientList : null}
                    </div>
                    <div className="m-2">
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                instructionsCollapsed
                                    ? setInstructionsCollapsed(false)
                                    : setInstructionsCollapsed(true)
                            }
                        >
                            Instructions
                        </button>
                        {!instructionsCollapsed ? instructionsList : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeInfo;
