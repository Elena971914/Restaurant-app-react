import { useContext, useState } from "react";
import styles from "./AddNewRecipe.module.css";
import UserContext from "../../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import * as compRecipesServices from "../../../services/compRecipesServices";
import * as likesServices from "../../../services/likesServices";

const INITIAL_VALUES = {
  name: "",
  imageURL: "",
  description: "",
  cookingTime: 20,
  type: "Breakfast",
  servings: 2,
  cuisine: "balkan",
  ingredients: [{ ingredient: "", quantity: "" }],
  steps: [{ step: "" }],
};

export default function AddNewRecipe() {
  const navigate = useNavigate();
  const { isAuthenticated, email, fullName, userId } = useContext(UserContext);
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [ingredients, setIngredients] = useState(INITIAL_VALUES.ingredients);
  const [steps, setSteps] = useState(INITIAL_VALUES.steps);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showCookingTimeError, setShowCookingTimeError] = useState(false);
  const [showServingsError, setShowServingsError] = useState(false);
  const [showIngredientsError, setShowIngredientsError] = useState(false);
  const [showStepsError, setShowStepsError] = useState(false);

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
    setIngredients(INITIAL_VALUES.ingredients);
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
  };

  const resetStepsButtonHandler = () => {
    setSteps(INITIAL_VALUES.steps);
  };

  //SUBMIT
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const objServer = { ...formValues };
      objServer.ingredients = formValues.ingredients
        .map((ingredient) => `${ingredient.quantity} ${ingredient.ingredient}`)
        .filter((ingredient) => ingredient !== " ");
      objServer.steps = formValues.steps
        .map((step) => `${step.step}`)
        .filter((step) => step !== "");
      objServer.author = fullName || email;
  
      onBlurTitle();
      onBlurCookingTime();
      onBlurServings();
  
      if (objServer.ingredients.length === 0) {
        setShowIngredientsError(true);
        return;
      } else {
        setShowIngredientsError(false);
      }
      if (objServer.steps.length === 0) {
        setShowStepsError(true);
        return;
      } else {
        setShowStepsError(false);
      }
  
      const result = await compRecipesServices.create(objServer);
  
      const data = { recipeId: result._id, _ownerId: userId, likedBy: [] };
      await likesServices.create(data);
  
      setIngredients(INITIAL_VALUES.ingredients);
      setSteps(INITIAL_VALUES.steps);
      setFormValues(INITIAL_VALUES);
      navigate("/recipes");
    } catch (error) {
      console.error('Error in onSubmit:', error);
      throw error;
    }
  };
  

  const onBlurTitle = () => {
    if (formValues.name.length < 20) {
      setShowTitleError(true);
    } else {
      setShowTitleError(false);
    }
  };

  const onBlurCookingTime = () => {
    if (formValues.cookingTime < 1) {
      setShowCookingTimeError(true);
    } else {
      setShowCookingTimeError(false);
    }
  };

  const onBlurServings = (e) => {
    if (formValues.servings < 1) {
      setShowServingsError(true);
    } else {
      setShowServingsError(false);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className={styles.main}>
          <form className={styles.form} onSubmit={onSubmit}>
            <h1>Add new recipe</h1>
            <label htmlFor="name">Title</label>
            {showTitleError && (
              <p className={styles.redPar}>
                The title should be at least 20 symbols long. Be creative!
              </p>
            )}
            <input
              className={styles.wide}
              type="text"
              name="name"
              value={formValues.name}
              onChange={changeHandler}
              onBlur={onBlurTitle}
            />
            <br />
            <label htmlFor="name">Image URL</label>
            <input
              className={styles.wide}
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
            {showCookingTimeError && (
              <p className={styles.redPar}>
                The cooking time cannot be below 1 minute!
              </p>
            )}
            {showServingsError && (
              <p className={styles.redPar}>The servings cannot be below 1!</p>
            )}
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
                onBlur={onBlurCookingTime}
              />

              <label htmlFor="cookingTime">Servings</label>
              <input
                type="number"
                name="servings"
                value={formValues.servings}
                onChange={changeHandler}
                onBlur={onBlurServings}
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
              {showIngredientsError && (
                <p className={styles.redPar}>
                  You cannot send a recipe without ingredients!
                </p>
              )}
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

            {/* STEPS */}
            <div className={styles.firstContainer}>
              <h4>Preparation steps</h4>
              {showStepsError && (
                <p className={styles.redPar}>
                  You cannot send a recipe without preparation steps!
                </p>
              )}
              {steps.map((currentStep, index) => (
                <ul key={index} className={styles.steps}>
                  <input
                    type="text"
                    name="step"
                    value={currentStep.step}
                    onChange={(e) => changeStepsHandler(e, index)}
                  ></input>

                  <button
                    type="button"
                    onClick={() => deleteStepHandler(index)}
                  >
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

            <button type="submit" style={{ marginTop: "30px" }}>
              Submit
            </button>
          </form>
        </div>
      )}

      {!isAuthenticated && (
        <div
          style={{ margin: "30px auto", width: "50vw", textAlign: "center" }}
        >
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
  );
}
