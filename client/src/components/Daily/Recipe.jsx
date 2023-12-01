import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as compRecipesService from "../../services/compRecipesServices";
import { Link } from "react-router-dom";
import styles from "./Recipe.Module.css";

export default function Recipe() {
  // useNavigate

  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    compRecipesService.getOne(id).then(setRecipe);
  }, []);

  return (
    <div className="main-container">
      <h1>{recipe.name}</h1>
      <h3>Posted by: {recipe.author}</h3>
      <img className="recipeImg" src={recipe.imageURL} />

      <div className="flex-container" style={{justifyContent:"space-around"}}>
        <div>
          <h4>Cooking time</h4>
          <p>{recipe.cookingTime} minutes</p>
        </div>

        <div>
          <h4>Cuisine</h4>
          <p>{recipe.cuisine}</p>
        </div>

        <div>
          <h4>Servings</h4>
          <p>{recipe.servings}</p>
        </div>
      </div>

      <div className="flex-container">
        <div className="recipe-container">
          <h4>How to make?</h4>
          <ul>
            {recipe.steps &&
              recipe.steps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        </div>
        <div className="ingredients-container">
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingr) => <li key={ingr}>{ingr}</li>)}
          </ul>
        </div>
      </div>

      <Link to="/recipes">
        <button className="button-back">
          Back to all competitor's recipes
        </button>
      </Link>
      <Link to="/recipes/new">
        <button className="button-back">
          Add new recipe
        </button>
      </Link>
    </div>
  );
}
