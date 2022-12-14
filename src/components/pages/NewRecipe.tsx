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
    apiURL: string;
    imgURL: string;
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
            RecipeImage: null || undefined,
            apiURL: this.props.api,
            imgURL: this.props.img,
        };
    }
    ingredientArray = [{ IngredientName: "", IngredientQuantity: "" }];
    ingredientName = "";
    ingredientQuantity = "";
    instructionArray = [""];
    instructions = "";

    handleIngredientNameChange = (event: any) => {
        this.ingredientName = event.target.value;
    };

    handleIngredientQuantityChange = (event: any) => {
        this.ingredientQuantity = event.target.value;
    };

    onIngredientSubmit = (event: any) => {
        event.preventDefault();

        if (this.ingredientName === "" || this.ingredientQuantity === "") {
            return alert("Please enter an ingredient name and quantity");
        }
        this.ingredientArray.push({
            IngredientName: this.ingredientName,
            IngredientQuantity: this.ingredientQuantity,
        });

        this.setState({
            RecipeIngredients: this.ingredientArray,
        });
    };

    handleInstructionChange = (event: any) => {
        this.instructions = event.target.value;
    };

    onInstructionSubmit = (event: any) => {
        event.preventDefault();
        this.instructionArray.push(this.instructions);

        this.setState({
            RecipeInstructions: this.instructionArray,
        });
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

        if (this.state.RecipeImage === null) {
            return alert("Please upload an image");
        } else if (this.state.RecipeName === "") {
            return alert("Please enter a recipe name");
        } else if (this.state.RecipeDescription === "") {
            return alert("Please enter a recipe description");
        } else if (this.state.RecipeIngredients.length === 1) {
            return alert("Please enter at least one ingredient");
        } else if (this.state.RecipeInstructions.length === 1) {
            return alert("Please enter at least one instruction");
        } else if (this.state.RecipeDifficulty === "") {
            return alert("Please enter a recipe difficulty");
        } else if (this.state.RecipeCookTime === "") {
            return alert("Please enter a recipe cook time");
        } else if (this.state.RecipeServingSize === "") {
            return alert("Please enter a recipe serving size");
        }

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

        this.setState({
            RecipeName: "",
            RecipeDescription: "",
            RecipeIngredients: [{ IngredientName: "", IngredientQuantity: "" }],
            RecipeInstructions: [],
            RecipeDifficulty: "",
            RecipeCookTime: "",
            RecipeServingSize: "",
            RecipeImage: null,
        });

        fetch(this.state.apiURL, {
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
            <div className="container">
                <h1>New Recipe</h1>
                <form
                    onSubmit={this.onSubmit}
                    action="/uploadfile"
                    method="POST"
                    encType="multipart/form-data"
                    className="container form"
                >
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label
                            htmlFor="RecipeName"
                            className="form-control d-none"
                        >
                            Recipe Name
                        </label>
                        <input
                            type="text"
                            name="RecipeName"
                            id="RecipeName"
                            className="form-control"
                            placeholder="Recipe Name"
                            onChange={this.handleChange}
                            value={this.state.RecipeName}
                        />
                    </div>
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label htmlFor="RecipeDescription" className="d-none">
                            Recipe Description
                        </label>
                        <input
                            type="text"
                            name="RecipeDescription"
                            id="RecipeDescription"
                            className="form-control"
                            placeholder="Recipe Description"
                            onChange={this.handleChange}
                            value={this.state.RecipeDescription}
                        />
                    </div>

                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label htmlFor="RecipeDifficulty" className="d-none">
                            Recipe Difficulty
                        </label>
                        <input
                            type="text"
                            name="RecipeDifficulty"
                            id="RecipeDifficulty"
                            className="form-control"
                            placeholder="Recipe Difficulty"
                            onChange={this.handleChange}
                            value={this.state.RecipeDifficulty}
                        />
                    </div>
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label htmlFor="RecipeCookTime" className="d-none">
                            Recipe Cook Time
                        </label>
                        <input
                            type="text"
                            name="RecipeCookTime"
                            id="RecipeCookTime"
                            className="form-control"
                            placeholder="Recipe Cook Time"
                            onChange={this.handleChange}
                            value={this.state.RecipeCookTime}
                        />
                    </div>
                    <div className="form-control col-md-6 m-auto my1 border border-0">
                        <label htmlFor="RecipeServingSize" className="d-none">
                            Recipe Serving Size
                        </label>
                        <input
                            type="text"
                            name="RecipeServingSize"
                            id="RecipeServingSize"
                            className="form-control"
                            placeholder="Recipe Serving Size"
                            onChange={this.handleChange}
                            value={this.state.RecipeServingSize}
                        />
                    </div>
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label htmlFor="IngredientName" className="d-none">
                            Recipe Ingredients
                        </label>
                        <p className="m-0">
                            Please enter an ingredient and quantity and select
                            "Add Ingredient"
                        </p>
                        <div className="d-flex">
                            <input
                                type="text"
                                name="IngredientName"
                                id="IngredientName"
                                className="form-control mx-1"
                                placeholder="Ingredient Name"
                                // value={this.ingredientName}
                                onChange={this.handleIngredientNameChange}
                            />
                            <label
                                htmlFor="IngredientQuantity"
                                className="d-none"
                            >
                                Recipe Quantity
                            </label>
                            <input
                                type="text"
                                name="IngredientQuantity"
                                id="IngredientQuantity"
                                className="form-control mx-1"
                                placeholder="Ingredient Quantity"
                                onChange={this.handleIngredientQuantityChange}
                            />
                        </div>
                        <button
                            className="btn btn-dark m-1"
                            onClick={(event) => this.onIngredientSubmit(event)}
                        >
                            Add Ingredient
                        </button>
                    </div>
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <label htmlFor="RecipeInstructions" className="d-none">
                            Recipe Instructions
                        </label>
                        <p className="m-0">
                            Please enter an instruction below and click "Add
                            instruction"
                        </p>
                        <input
                            type="text"
                            name="RecipeInstructions"
                            id="RecipeInstructions"
                            className="form-control"
                            placeholder="Recipe Instructions"
                            onChange={this.handleInstructionChange}
                        />
                        <button
                            className="btn btn-dark m-1"
                            onClick={(event) => this.onInstructionSubmit(event)}
                        >
                            Add Instructions
                        </button>
                    </div>
                    <div className="form-control col-md-6 m-auto my-1 border border-0">
                        <p className="my-0 ">Please upload an image</p>
                        <input
                            type="file"
                            id="imageUpload"
                            name="recipeImage"
                            className="form-control"
                            onChange={this.fileOnChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => {
                            if (this.state.RecipeImage === null) {
                                return alert("Please upload an image");
                            }
                            let formData = new FormData();

                            formData.append(
                                "recipeImage",
                                this.state.RecipeImage
                            );
                            formData.append(
                                "RecipeName",
                                this.state.RecipeName
                            );
                            fetch(`${this.state.imgURL}/uploadFile`, {
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
