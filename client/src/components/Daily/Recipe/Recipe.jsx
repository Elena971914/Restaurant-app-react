import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as compRecipesService from "../../../services/compRecipesServices";
import styles from "./Recipe.Module.css";
import UserContext from "../../../contexts/UserContext";
import DeleteModal from "./DeleteModal/DeleteModal";

export default function Recipe() {
  const navigate = useNavigate()
  const { id } = useParams();
  const {userId} = useContext(UserContext)
  const [recipe, setRecipe] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    compRecipesService.getOne(id).then(setRecipe);
  }, []);

  const deleteClickHandler = () => {
    setShowDeleteModal(true)
  }

  const deleteRecipe = async () => {
    try {
      await compRecipesService.remove(id);
      navigate('/recipes');
    } catch (error) {
      console.log('Error in deleteRecipe:', error);
    }
  };
  

  return (
    <div className={styles.mainContainer}>
      <h1>{recipe.title}</h1>
      {showDeleteModal && <DeleteModal handleClose={() => setShowDeleteModal(false)} handleDelete={deleteRecipe}/>}
      <h3>Posted by: {recipe.author}</h3>
      <img className={styles.recipeImg} src={recipe.imageURL} />

      <div className={styles.flexContainer} style={{justifyContent:"space-around"}}>
        <div>
          <h4>Cooking time</h4>
          <p>{recipe.cookingTime} minutes</p>
        </div>

        <div>
          <h4>Type</h4>
          <p>{recipe.type}</p>
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

      <div className={styles.flexContainer}>
        <div className={styles.recipeContainer}>
          <h4>How to make?</h4>
          <ul>
            {recipe.steps &&
              recipe.steps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        </div>
        <div className={styles.ingredientsContainer}>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingr) => <li key={ingr}>{ingr}</li>)}
          </ul>
        </div>
      </div>

      {recipe?._ownerId === userId && <Link to={`/recipes/${recipe._id}/edit`}><Button className={styles.button}>Edit</Button></Link>}
      {recipe?._ownerId === userId && <Button className={styles.button} onClick={deleteClickHandler}>Delete</Button>}
      <Link to="/recipes">
        <button className={styles.button}>
          Back to all competitor's recipes
        </button>
      </Link>
      <Link to="/recipes/new">
        <button className={styles.button}>
          Add new recipe
        </button>
      </Link>
    </div>
  );
}
