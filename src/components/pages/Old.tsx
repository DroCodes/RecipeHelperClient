import React from "react";

interface IngredientInterface {
  ingredient: string,
  quantity: number;
}
 const ingredientArray:object[] = []
  const ingredientObject:{} = {ingredient: "", quantity: 0}



const NewRecipe = () => {
 
  return (
    <div className="container">
      <h1 className="text-center">New Recipe</h1>
      <div>
        <form className="container form" action="" method="post" encType="multipart/form-data">
          <div className="form-group  col-md-6 m-auto my-3">
            <label htmlFor="difficulty" className="form-control d-none">
              Recipe Name
            </label>
            <input
              type="text"
              name="recipeName"
              id="recipeName"
              placeholder="Recipe Name"
              className="form-control"
            />
          </div>
          <div className="form-group  col-md-6 m-auto my-3">
            <label htmlFor="servingSize" className="form-control d-none">
              serving size
            </label>
            <input
              type="text"
              name="servingSize"
              id="servingsize"
              placeholder="Serving size"
              className="form-control"
            />
          </div>
          <div className="form-group  col-md-6 m-auto my-3">
            <label htmlFor="cookTime" className="form-control d-none">
              cook time
            </label>
            <input
              type="text"
              name="cookTime"
              id="cookTime"
              placeholder="Cook Time"
              className="form-control"
            />
          </div>
          <div className="form-group  col-md-6 m-auto my-3">
            <label htmlFor="difficulty" className="form-control d-none">
              Recipe Name
            </label>
            <input
              type="text"
              name="difficulty"
              id="difficulty"
              placeholder="Dificulty"
              className="form-control"
            />
          </div>
          <div className="form-group  col-md-6 m-auto my-3">
            <label htmlFor="ingredients" className="form-control d-none">
              Recipe Name
            </label>
            <p className="mb-0">
              Enter ingredient and quantity then click add ingredient
            </p>
            <div className="row row-cols-2">
              <div>
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  placeholder="ingredient"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  placeholder="quantity"
                  className="form-control"
                />
              </div>
            </div>
            <p className="btn btn-dark m-2" onClick={setArray}>Add Ingredient</p>
          </div>
           <div className="form-group  col-md-6 m-auto my-3">
                <textarea name="instructions" id="instructions" className="form-control" rows={10} cols={50} placeholder="Instructions"></textarea>
            </div>
            <div className="form-group  col-md-6 m-auto my-3">
              <input type="file" name="recipeImage" id="recipeImage" className="form-control"  />
            </div>
            <div className="form-group  col-md-6 m-auto my-3">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-primary mx-2">Clear</button>
            </div>
        </form>
      </div>
    </div>
  );
};

function setArray(e:any){
  const ingredientVar = (document.getElementById('ingredient') as HTMLInputElement).value
  const quantityVar = (document.getElementById('quantity') as HTMLInputElement).value

  if(ingredientVar != null && quantityVar != null){
  ingredientArray.push({
    ingredient: ingredientVar,
    quantity: quantityVar
  }); 
  console.log(ingredientArray);
}

return alert("please enter ingredient")

  e.preventDefault();
}

export default NewRecipe;
