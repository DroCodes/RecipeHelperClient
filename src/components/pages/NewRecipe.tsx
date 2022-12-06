import React, { Component } from "react";

type myState = {
    RecipeName: string;
    RecipeDescription: string;
    RecipeIngredients: { IngredientName: string; IngredientQuantity: string }[];
    RecipeInstructions: string[];
    RecipeDifficulty: string;
    RecipeCookTime: string;
    RecipeServingSize: string;
    RecipeImage: any;
};
export class NewRecipe extends Component<any, myState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            RecipeName: "",
            RecipeDescription: "",
            RecipeIngredients: [{ IngredientName: "", IngredientQuantity: "" }],
            RecipeInstructions: [],
            RecipeDifficulty: "",
            RecipeCookTime: "",
            RecipeServingSize: "",
            RecipeImage: null,
        };
    }
    ingredientArray = [{ IngredientName: "", IngredientQuantity: "" }];
    ingredientName = "";
    ingredientquantity = "";
    instructionArray = [""];
    instructions = "";

    handleIngredientNameChange = (event: any) => {
        this.ingredientName = event.target.value;
    };

    handleIngredientQuantityChange = (event: any) => {
        this.ingredientquantity = event.target.value;
    };

    onIngredientSubmit = (event: any) => {
        event.preventDefault();
        this.ingredientArray.push({
            IngredientName: this.ingredientName,
            IngredientQuantity: this.ingredientquantity,
        });

        this.setState({
            RecipeIngredients: this.ingredientArray,
        });
    };

    handleInstructionChange = (event: any) => {
        this.instructions = event.target.value;

        console.log(this.instructions);
    };

    onInstructionSubmit = (event: any) => {
        event.preventDefault();
        this.instructionArray.push(this.instructions);

        this.setState({
            RecipeInstructions: this.instructionArray,
        });

        console.log(this.state.RecipeInstructions);
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<
            myState,
            keyof myState
        >);
    };

    fileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const files = target.files![0];
        this.setState({ RecipeImage: files });
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            RecipeName,
            RecipeDescription,
            RecipeIngredients,
            RecipeInstructions,
            RecipeDifficulty,
            RecipeCookTime,
            RecipeServingSize,
        } = this.state;

        const recipe = {
            RecipeName,
            RecipeDescription,
            RecipeIngredients,
            RecipeInstructions,
            RecipeDifficulty,
            RecipeCookTime,
            RecipeServingSize,
        };

        fetch("https://recipe-guru.herokuapp.com/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    render() {
        return (
            <div>
                <h1>New Recipe</h1>
                <form
                    onSubmit={this.onSubmit}
                    action="/uploadfile"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <label htmlFor="RecipeName">Recipe Name</label>
                    <input
                        type="text"
                        name="RecipeName"
                        id="RecipeName"
                        onChange={this.handleChange}
                        value={this.state.RecipeName}
                    />
                    <label htmlFor="RecipeDescription">
                        Recipe Description
                    </label>
                    <input
                        type="text"
                        name="RecipeDescription"
                        id="RecipeDescription"
                        onChange={this.handleChange}
                        value={this.state.RecipeDescription}
                    />
                    <label htmlFor="IngredientName">Recipe Ingredients</label>
                    <input
                        type="text"
                        name="IngredientName"
                        id="IngredientName"
                        onChange={this.handleIngredientNameChange}
                        // value={this.state.RecipeIngredients}
                    />
                    <label htmlFor="IngredientQuantity">Recipe Quantity</label>
                    <input
                        type="text"
                        name="IngredientQuantity"
                        id="IngredientQuantity"
                        onChange={this.handleIngredientQuantityChange}
                        // value={this.state.RecipeIngredients}
                    />
                    <button
                        className="btn btn-dark"
                        onClick={(event) => this.onIngredientSubmit(event)}
                    >
                        Add Ingredient
                    </button>
                    <label htmlFor="RecipeInstructions">
                        Recipe Instructions
                    </label>
                    <input
                        type="text"
                        name="RecipeInstructions"
                        id="RecipeInstructions"
                        onChange={this.handleInstructionChange}
                        // value={this.state.RecipeInstructions}
                    />
                    <button
                        className="btn btn-dark"
                        onClick={(event) => this.onInstructionSubmit(event)}
                    >
                        Add Instructions
                    </button>
                    <label htmlFor="RecipeDifficulty">Recipe Difficulty</label>
                    <input
                        type="text"
                        name="RecipeDifficulty"
                        id="RecipeDifficulty"
                        onChange={this.handleChange}
                        value={this.state.RecipeDifficulty}
                    />
                    <label htmlFor="RecipeCookTime">Recipe Cook Time</label>
                    <input
                        type="text"
                        name="RecipeCookTime"
                        id="RecipeCookTime"
                        onChange={this.handleChange}
                        value={this.state.RecipeCookTime}
                    />
                    <label htmlFor="RecipeServingSize">
                        Recipe Serving Size
                    </label>
                    <input
                        type="text"
                        name="RecipeServingSize"
                        id="RecipeServingSize"
                        onChange={this.handleChange}
                        value={this.state.RecipeServingSize}
                    />
                    <input
                        type="file"
                        id="imageUpload"
                        name="recipeImage"
                        onChange={this.fileOnChange}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            let formData = new FormData();

                            formData.append(
                                "recipeImage",
                                this.state.RecipeImage
                            );
                            formData.append(
                                "RecipeName",
                                this.state.RecipeName
                            );
                            fetch("http://localhost:8080/uploadFile", {
                                method: "POST",
                                body: formData,
                            });
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default NewRecipe;
