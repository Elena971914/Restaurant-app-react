import DailyRecipeItem from "../DailyRecipeItem/DailyRecipeItem";
import * as compRecipesService from "../../../services/compRecipesServices"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Daily.Module.css"

export default function Daily() {
    const [compRecipes, setCompRecipes] = useState([])
    
    useEffect(() => {
        compRecipesService.getAll()
        .then(result=> setCompRecipes(result))
    }, []
    )

    return(
        <div className="container-xxl pt-5 pb-3">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Monthly challenge</h5>
                    <h1 className="mb-5">Current competitor meals</h1>
                </div>
                <div className="row g-4">
                    {compRecipes.map(recipe => <DailyRecipeItem key={recipe._id} {...recipe}/>)}
                </div>
                <Link to='/recipes/new'><button className={styles.addButton}>Add your recipe</button></Link>
            </div>
        </div>
    )
}