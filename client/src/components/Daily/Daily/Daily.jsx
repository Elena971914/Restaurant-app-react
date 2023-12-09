import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DailyRecipeItem from "../DailyRecipeItem/DailyRecipeItem";
import * as compRecipesServices from "../../../services/compRecipesServices";
import styles from "./Daily.module.css";

export default function Daily() {
  const [compRecipes, setCompRecipes] = useState([]);

  useEffect(() => {
    compRecipesServices
      .getAll()
      .then((result) => setCompRecipes(result))
      .catch((error) => {
        console.error("Error fetching competitor recipes:", error);
      });
  }, []);

  return (
    <div className={styles.space}>
      <div className="container-xxl pt-5 pb-3">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Monthly challenge
            </h5>
            <h1 className="mb-5">Current competitor meals</h1>
          </div>
          <div className="row g-4">
            {compRecipes.map((recipe) => (
              <DailyRecipeItem key={recipe._id} {...recipe} />
            ))}
          </div>
          <Link to="/recipes/new">
            <button className={styles.addButton}>Add your recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
