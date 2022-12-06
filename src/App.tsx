import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NewRecipe from "./components/pages/NewRecipe";
import Navbar from "./components/layout/Navbar";
import RecipeInfo from "./components/pages/RecipeInfo";
import "./App.css";

function App() {
    const apiUrl = "http://localhost:8080/recipes";

    const [recipes, setRecipes]: any = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const imgURL = "http://localhost:8080/static/";

    function useRecipeData(r: []) {
        setRecipeData(r);
    }

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
            });
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                recipe={recipes}
                                imgURL={imgURL}
                                getRecipeData={useRecipeData}
                            />
                        }
                    />
                    <Route path="/new-recipe" element={<NewRecipe />} />
                    <Route
                        path="/view-recipe/:id"
                        element={<RecipeInfo data={recipeData} img={imgURL} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
