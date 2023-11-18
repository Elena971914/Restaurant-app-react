import { useParams } from "react-router-dom";
import competitorsRecipes from "../../assets/competitors-recipes";
import { useEffect, useState } from "react";
import styles from "./Recipe.Module.css";

export default function Recipe() {
  // useNavigate
  // fetch data from the server
  
  const { id } = useParams();
  const recipe = competitorsRecipes.filter(
    (recipe) => recipe.id === Number(id)
  )[0];

  return (
    <div className="main-container">
      <h1>{recipe.name}</h1>
      <h3>Posted by: {recipe.author}</h3>
      <img className="recipeImg" src={recipe.imageURL} />

    <div className='flex-container' >
      <div className="recipe-container">
        <h4>How to make?</h4>
        <ul>
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="ingredients-container">
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              {ingredient.quantity} {ingredient.name}
            </li>
          ))}
        </ul>
      </div></div>

      <button className="button-back">Back to all competitor's recipes</button>
    </div>
  );
}
