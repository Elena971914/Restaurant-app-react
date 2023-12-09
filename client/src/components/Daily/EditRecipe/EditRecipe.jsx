import { useContext, useState, useEffect } from "react";
import styles from "./EditRecipe.module.css";
import UserContext from "../../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Auth from "../Auth/Auth";
import * as compRecipesServices from "../../../services/compRecipesServices";

export default function AddNewRecipe() {
  const { id } = useParams();
  const [showTitleError, setShowTitleError] = useState(false);
  const [showCookingTimeError, setShowCookingTimeError] = useState(false);
  const [showServingsError, setShowServingsError] = useState(false);
  const [showIngredientsError, setShowIngredientsError] = useState(false);
  const [showStepsError, setShowStepsError] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [formValues, setFormValues] = useState({
    author: "",
    title: "",
    description: "",
    ingredients: [""],
    steps: [""],
    type: "",
    servings: "",
    cookingTime: "",
    cuisine: "",
    imageURL: "",
  });

  useEffect(() => {
    compRecipesServices
      .getOne(id)
      .then(setRecipe)
      .catch((error) => {
        console.log("Error in loading recipe:", error);
      });
  }, [id]);

  useEffect(() => {
    setFormValues({
      author: recipe?.author ? recipe.author : "",
      title: recipe?.title ? recipe.title : "",
      description: recipe?.description ? recipe.description : "",
      ingredients: recipe?.ingredients ? recipe.ingredients : [""],
      steps: recipe?.steps ? recipe.steps : [""],
      type: recipe?.type ? recipe.type : "",
      servings: recipe?.servings ? recipe.servings : "",
      cookingTime: recipe?.cookingTime ? recipe.cookingTime : "",
      cuisine: recipe?.cuisine ? recipe.cuisine : "",
      imageURL: recipe?.imageURL ? recipe.imageURL : "",
    });
  }, [recipe]);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  const changeHandler = (e, i) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      e.target.value = Number(value);
    }
    if (name === "ingredients" || name === "steps") {
      const updated = [...formValues[name]];
      updated[i] = value;
      setFormValues((prevState) => ({
        ...prevState,
        [name]: updated,
      }));
      return;
    }
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  const addButtonHandler = (name) => {
    setFormValues((values) => ({
      ...values,
      [name]: [...values[name], ""],
    }));
  };

  const deleteHandler = (i, name) => {
    const allValues = [...formValues[name]];
    allValues.splice(i, 1);
    setFormValues((prevState) => ({
      ...prevState,
      [name]: allValues,
    }));
  };

  const resetButtonHandler = (name) => {
    setFormValues((prevState) => ({ ...prevState, [name]: [""] }));
  };

  const validate = (e) => {
    switch (e.target.name) {
      case "title": {
        if (formValues.title.length < 20) {
          setShowTitleError(true);
        } else {
          setShowTitleError(false);
        }
        return;
      }
      case "cookingTime": {
        if (formValues.cookingTime < 1) {
          setShowCookingTimeError(true);
        } else {
          setShowCookingTimeError(false);
        }
        return;
      }
      case "servings": {
        if (formValues.servings < 1) {
          setShowServingsError(true);
        } else {
          setShowServingsError(false);
        }
        return;
      }
      case "ingredients": {
        const ingredients = formValues.ingredients.filter(
          (ingredient) => ingredient !== ""
        );
        if (ingredients.length === 0) {
          setShowIngredientsError(true);
        } else {
          setShowIngredientsError(false);
        }
        return;
      }
      case "steps": {
        const steps = formValues.steps.filter((step) => step !== "");
        if (steps.length === 0) {
          setShowStepsError(true);
        } else {
          setShowStepsError(false);
        }
        return;
      }
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      await compRecipesServices.edit(formValues, id);
      navigate(`/recipes/${recipe._id}`);
    } catch (error) {
      console.error("Error in submitting:", error);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className={styles.main}>
          <form className={styles.form} onSubmit={onSubmit}>
            <h1>Edit '{formValues.title}' recipe</h1>
            <label htmlFor="name">Title</label>
            {showTitleError && (
              <p className={styles.redPar}>
                The title should be at least 20 symbols long. Be creative!
              </p>
            )}
            <input
              className={styles.wide}
              type="text"
              name="title"
              value={formValues.title}
              onChange={changeHandler}
              onBlur={validate}
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
                onBlur={validate}
              />

              <label htmlFor="cookingTime">Servings</label>
              <input
                type="number"
                name="servings"
                value={formValues.servings}
                onChange={changeHandler}
                onBlur={validate}
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
              <h4 className={styles.space}>Ingredients list</h4>
              {showIngredientsError && (
                <p className={styles.redPar}>
                  You cannot send a recipe without ingredients!
                </p>
              )}
              <ul>
                {formValues.ingredients.map((currentIngredient, index) => (
                  <li key={index} className={styles.gridContainer}>
                    <input
                      type="text"
                      name="ingredients"
                      value={currentIngredient}
                      onChange={(e) => changeHandler(e, index)}
                      onBlur={validate}
                    />
                    <button
                      type="button"
                      onClick={() => deleteHandler(index, "ingredients")}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className={styles.gridContainer}
                style={{ paddingLeft: "2rem" }}
              >
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => addButtonHandler("ingredients")}
                >
                  Add ingredient
                </button>
                <button
                  className={styles.resetBtn}
                  type="button"
                  onClick={() => resetButtonHandler("ingredients")}
                >
                  Reset ingredients
                </button>
              </div>
            </div>

            {/* STEPS */}
            <div className={styles.firstContainer}>
              <h4>Preparation steps</h4>
              {showStepsError && (
                <p className={styles.redPar}>
                  You cannot send a recipe without preparation steps!
                </p>
              )}
              <ul>
                {formValues.steps.map((currentStep, index) => (
                  <li key={index} className={styles.gridContainer}>
                    <input
                      type="text"
                      name="steps"
                      value={currentStep}
                      onChange={(e) => changeHandler(e, index)}
                      onBlur={validate}
                    ></input>
                    <button
                      type="button"
                      onClick={() => deleteHandler(index, "steps")}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className={styles.gridContainer}
                style={{ paddingLeft: "2rem" }}
              >
                <button
                  className={styles.addBtn}
                  type="button"
                  onClick={() => addButtonHandler("steps")}
                >
                  Add a step
                </button>
                <button
                  className={styles.resetBtn}
                  type="button"
                  onClick={() => resetButtonHandler("steps")}
                >
                  Reset steps
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={
                showTitleError ||
                showCookingTimeError ||
                showServingsError ||
                showStepsError ||
                showIngredientsError
              }
            >
              Edit
            </button>
          </form>
        </div>
      )}

      {!isAuthenticated && <Auth />}
    </>
  );
}
