import { useContext, useState } from "react";
import styles from "./AddNewRecipe.module.css";
import UserContext from "../../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../../services/compRecipesServices";

const INITIAL_VALUES = {
  name: "",
  image: "",
  description: "",
  cookingTime: 20,
  type: "Breakfast",
  servings: 2,
  cuisine: "balkan",
  ingredients: [{ ingredient: "", quantity: "" }],
  previewIngredients: "",
  steps: [{ step: "" }],
  previewSteps: "",
};

export default function AddNewRecipe() {
  const navigate = useNavigate()
  const { isAuthenticated, email, fullName } = useContext(UserContext);
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [ingredients, setIngredients] = useState(INITIAL_VALUES.ingredients);
  const [steps, setSteps] = useState(INITIAL_VALUES.steps);

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
    setPreviewIngredients(
      ingredients.map((element, index) => (
        <li key={index}>
          {element.quantity} {element.ingredient}
        </li>
      ))
    );
  };

  const resetIngredientsButtonHandler = () => {
    setIngredients(INITIAL_VALUES.ingredients);
    setPreviewIngredients(INITIAL_VALUES.previewIngredients);
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
    setSteps(INITIAL_VALUES.steps);
    setPreviewSteps(INITIAL_VALUES.previewSteps);
  };

  //SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    const objServer = { ...formValues };
    objServer.ingredients = formValues.ingredients.map(
      (ingredient) => `${ingredient.quantity} ${ingredient.ingredient}`
    );
    objServer.steps = formValues.steps.map((step) => `${step.step}`);
    delete objServer.previewSteps;
    delete objServer.previewIngredients;
    objServer.author = fullName || email;
    
    const result = await create(objServer);
    navigate('/recipes')
  };

  return (
    <>
  {isAuthenticated && (
    <div className={styles.main}>
    <form className={styles.form} onSubmit={onSubmit}>
      <h1>Add new recipe</h1>
      <label htmlFor="name">Title</label>
      <input
        className={styles.wide}
        type="text"
        name="name"
        value={formValues.name}
        onChange={changeHandler}
      />
      <br />
      <label htmlFor="name">Image URL</label>
      <input
        className={styles.wide}
        type="text"
        name="image"
        value={formValues.image}
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
            className={styles.addBtn}
            onClick={addIngredientButtonHandler}
          >
            Add ingredient
          </button>
          <button
            className={styles.resetBtn}
            type="button"
            onClick={resetIngredientsButtonHandler}
          >
            Reset ingredients
          </button>
        </div>
      

        <div className={styles.firstContainer}>
          <h4>Preparation steps</h4>
          {steps.map((currentStep, index) => (
            <ul key={index} className={styles.steps}>
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

      <button type="submit" style={{ marginTop: "30px"}}>Submit</button>
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
