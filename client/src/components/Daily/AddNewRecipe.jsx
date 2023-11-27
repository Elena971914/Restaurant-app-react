import { useState } from "react";
import styles from "./AddNewRecipe.module.css";

const INITIAL_VALUES = {
  name: "",
  image: "",
  description: "",
  cookingTime: 20,
  preparationTime: 20,
  servings: 0,
  cuisine: "balkan",
  ingredients: [{ ingredient: "", quantity: "" }],
  previewIngredients: "",
  steps: [{ step: "" }],
  previewSteps: "",
};

export default function AddNewRecipe() {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [ingredients, setIngredients] = useState(INITIAL_VALUES.ingredients);
  const [previewIngredients, setPreviewIngredients] = useState(
    INITIAL_VALUES.previewIngredients
  );
  const [steps, setSteps] = useState(INITIAL_VALUES.steps);
  const [previewSteps, setPreviewSteps] = useState(INITIAL_VALUES.previewSteps);

  const changeHandler = (e) => {
    let value = "";
    if (e.target.type === "number") {
      value = Number(e.target.value);
    }
    setFormValues((state) => ({ ...state, [e.target.name]: value }));
  };

  // INGREDIENTS
  const addIngredientButtonHandler = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };
  const changeIngredientsHandler = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...ingredients];
    onchangeVal[i][name] = value;
    setIngredients(onchangeVal);
    setPreviewIngredients(
      ingredients.map((element, index) => (
        <li key={index}>
          {" "}
          {element.quantity} {element.ingredient}
        </li>
      ))
    );
  };

  const deleteIngredientHandler = (i) => {
    const deleteVal = [...ingredients];
    deleteVal.splice(i, 1);
    setIngredients(deleteVal);
    setPreviewIngredients(
      ingredients.map((element, index) => (
        <li key={index}>
          {" "}
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
    setSteps([...steps, { step: "" }]);
  };
  const changeStepsHandler = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...steps];
    onchangeVal[i][name] = value;
    setSteps(onchangeVal);
    setPreviewSteps(
      steps.map((element, index) => <li key={index}> {element.step}</li>)
    );
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
  const submitButtonHandler = () => {};

  return (
    <div className={styles.main}>
      <form className={styles.form}>
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
          name="name"
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
          <label htmlFor="cookingTime">Preparation time</label>
          <input
            type="number"
            name="preparationTime"
            value={formValues.preparationTime}
            onChange={changeHandler}
          />

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
            <option value="universal">Universal</option>
            <option value="american">American</option>
            <option value="italian">Italian</option>
            <option value="asian">Asian</option>
            <option value="balkan">Balkan</option>
            <option value="english">English</option>
          </select>
        </div>

        {/* INGREDIENTS  */}
        <div className={styles.doubleContainer}>
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

          <div className={styles.containerTwo}>
            <h4>Ingredients preview</h4>
            <ol>{previewIngredients}</ol>
          </div>
        </div>

        <div className={styles.doubleContainer2}>
        
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
            <button className={styles.addBtn} type="button" onClick={addStepButtonHandler}>
              Add a step
            </button>
          <button className={styles.resetBtn} type="button" onClick={resetStepsButtonHandler}>
            Reset steps
          </button>
          </div>

          <div className={styles.secondContainer}>
            <h4>Steps preview</h4>
            <ol>{previewSteps}</ol>
          </div>
          
        </div>

        <button type="button" onClick={submitButtonHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}
