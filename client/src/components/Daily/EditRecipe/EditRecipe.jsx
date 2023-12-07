import { useContext, useState, useEffect } from "react";
import styles from "./EditRecipe.module.css";
import UserContext from "../../../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as compRecipesServices from "../../../services/compRecipesServices"

export default function AddNewRecipe() {
    let {id} = useParams()
    const [recipe, setRecipe] = useState({})
    const [formValues, setFormValues] = useState({
        author: recipe?.author ? recipe.author : "",
        name: recipe?.name ? recipe.name : "",
        description: recipe?.description ? recipe.description : "",
        ingredients: recipe?.ingredients
          ? recipe.ingredients.map(ingr => ({
              ingredient: ingr.split(" ")[1],
              quantity: ingr.split(" ")[0],
            }))
          : [],
        steps: recipe?.steps ? recipe.steps.map(stepVal => ({ step: stepVal })) : [],
        type: recipe?.type ? recipe.type : "",
        servings: recipe?.servings ? recipe.servings : "",
        cookingTime: recipe?.cookingTime ? recipe.cookingTime : "",
        cuisine: recipe?.cuisine ? recipe.cuisine : "",
        imageURL: recipe?.imageURL ? recipe.imageURL : "",
      });

      useEffect(() => {
        compRecipesServices.getOne(id)
          .then(setRecipe)
          .catch(error => {
            console.log('Error in useEffect:', error);
          });
      }, [id]);
      

      useEffect(() => {
        setFormValues({
            author: recipe?.author ? recipe.author : "",
            name: recipe?.name ? recipe.name : "",
            description: recipe?.description ? recipe.description : "",
            ingredients: recipe?.ingredients
              ? recipe.ingredients.map(ingr => ({
                  ingredient: ingr.split(" ")[1],
                  quantity: ingr.split(" ")[0],
                }))
              : [],
            steps: recipe?.steps ? recipe.steps.map(stepVal => ({ step: stepVal })) : [],
            type: recipe?.type ? recipe.type : "",
            servings: recipe?.servings ? recipe.servings : "",
            cookingTime: recipe?.cookingTime ? recipe.cookingTime : "",
            cuisine: recipe?.cuisine ? recipe.cuisine : "",
            imageURL: recipe?.imageURL ? recipe.imageURL : "",
        });
      }, [recipe])

      useEffect(() => {
        setSteps(formValues.steps); // Update 'steps' state when 'formValues.steps' changes
      }, [formValues.steps]);

      useEffect(() => {
        setIngredients(formValues.ingredients); // Update 'steps' state when 'formValues.steps' changes
      }, [formValues.ingredients]);

  const navigate = useNavigate()
  const { isAuthenticated, email, fullName } = useContext(UserContext);
  const [ingredients, setIngredients] = useState(formValues.ingredients);
  const [steps, setSteps] = useState(formValues.steps);

  const changeHandler = (e) => {
    if (e.target.type === "number") {
      e.target.value = Number(e.target.value);
    }
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  // INGREDIENTS
  const addIngredientButtonHandler = () => {
    setIngredients((ingredients) => [
      ...ingredients,
      { ingredient: "", quantity: "" },
    ]);
  };

  const changeIngredientsHandler = (e, i) => {
    const { name, value } = e.target;
    const updatedIngredients = [...ingredients];
    updatedIngredients[i][name] = value;
    setIngredients(updatedIngredients);

    setFormValues((prevState) => ({
      ...prevState,
      ingredients: updatedIngredients.map((ingredient) => ({ ...ingredient })),
    }));
  };

  const deleteIngredientHandler = (i) => {
    const deleteVal = [...ingredients];
    deleteVal.splice(i, 1);
    setIngredients(deleteVal);
  };

  const resetIngredientsButtonHandler = () => {
    setIngredients([]);
  };

  //STEPS
  const addStepButtonHandler = () => {
    setSteps((steps) => [...steps, { step: "" }]);
  };

  const changeStepsHandler = (e, i) => {
    const { value } = e.target;
    const updatedSteps = [...steps];
    updatedSteps[i].step = value;
    setSteps(updatedSteps);
    setFormValues((prevState) => ({
      ...prevState,
      steps: updatedSteps.map((step) => ({ step: step.step })),
    }));
  };

  const deleteStepHandler = (i) => {
    const deleteVal = [...steps];
    deleteVal.splice(i, 1);
    setSteps(deleteVal);
    setPreviewSteps(
      steps.map((element, index) => <li key={index}> {element.step}</li>)
    );
  };

  const resetStepsButtonHandler = () => {
    setSteps([]);
  };

  //SUBMIT
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const objServer = { ...formValues };
      objServer.ingredients = formValues.ingredients.map(
        (ingredient) => `${ingredient.quantity} ${ingredient.ingredient}`
      );
      objServer.steps = formValues.steps.map((step) => `${step.step}`);
      objServer.author = fullName || email;
  
      await compRecipesServices.edit(objServer, id);
      navigate(`/recipes/${recipe._id}`);
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };
  

  return (
    <>
  {isAuthenticated && (
    <div className={styles.main}>
    <form className={styles.form} onSubmit={onSubmit}>
      <h1>Edit recipe "{recipe.name}"</h1>
      <label htmlFor="name">Title</label>
      <input
        className='wide'
        type="text"
        name="name"
        value={formValues.name}
        onChange={changeHandler}
      />
      <br />
      <label htmlFor="name">Image URL</label>
      <input
        className='wide'
        type="text"
        name="imageURL"
        value={formValues.imageURL}
        onChange={changeHandler}
      />
      <br />
      <label htmlFor="name">Description</label>
      <textarea
        rows="4"
        cols="80"
        type="text"
        name="description"
        value={formValues.description}
        onChange={changeHandler}
      />
      <br />
      <div className={styles.properties}>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" onChange={changeHandler}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <label htmlFor="cookingTime">Cooking time</label>
        <input
          type="number"
          name="cookingTime"
          value={formValues.cookingTime}
          onChange={changeHandler}
        />

        <label htmlFor="cookingTime">Servings</label>
        <input
          type="number"
          name="servings"
          value={formValues.servings}
          onChange={changeHandler}
        />

        <label htmlFor="cuisine">Cuisine</label>
        <select id="cuisine" name="cuisine" onChange={changeHandler}>
          <option value="Universal">Universal</option>
          <option value="American">American</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="Balkan">Balkan</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* INGREDIENTS  */}
        <div className={styles.containerOne}>
          <h4>Ingredients list</h4>
          <div className={styles.gridContainer}>
            <label htmlFor="quantity">Quantity</label>
            <label htmlFor="ingredient">Ingredient</label>
          </div>
          {ingredients.map((currentIngredient, index) => (
            <ul key={index} className={styles.gridContainer}>
              <input
                type="text"
                name="quantity"
                value={currentIngredient.quantity}
                onChange={(e) => changeIngredientsHandler(e, index)}
              ></input>

              <input
                type="text"
                name="ingredient"
                value={currentIngredient.ingredient}
                onChange={(e) => changeIngredientsHandler(e, index)}
              />
              <button
                type="button"
                onClick={() => deleteIngredientHandler(index)}
              >
                Delete
              </button>
            </ul>
          ))}
          <button
            type="button"
            className='addBtn'
            onClick={addIngredientButtonHandler}
          >
            Add ingredient
          </button>
          <button
            className='resetBtn'
            type="button"
            onClick={resetIngredientsButtonHandler}
          >
            Reset ingredients
          </button>
        </div>
      

        <div className={styles.stepsContainer}>
          <h4>Preparation steps</h4>
          {steps.map((currentStep, index) => (
            <ul key={index} className='steps'>
              <input
                type="text"
                name="step"
                value={currentStep.step}
                onChange={(e) => changeStepsHandler(e, index)}
              ></input>

              <button type="button" onClick={() => deleteStepHandler(index)}>
                Delete
              </button>
            </ul>
          ))}
          <button
            className={styles.addBtn}
            type="button"
            onClick={addStepButtonHandler}
          >
            Add a step
          </button>
          <button
            className={styles.resetBtn}
            type="button"
            onClick={resetStepsButtonHandler}
          >
            Reset steps
          </button>
        </div>

      <button type="submit" style={{ marginTop: "30px"}}>Edit this recipe</button>
    </form>
  </div>
  )} 

   {!isAuthenticated && (
    <div style={{margin: "30px auto", width: '50vw', textAlign:'center'}}>
      <h6>Please, login or register first.</h6>
      <div>
        <Link to="/login">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "45%", marginRight: "30px" }}
          >
            Login
          </button>
        </Link>
        <Link to="/register">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "45%" }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
    )}
    </>
  )
}

