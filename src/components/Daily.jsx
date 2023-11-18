import DailyRecipeItem from "./Daily/DailyRecipeItem";
import clientRecipesList from "../assets/competitors-recipes"

export default function Daily() {
    return(
        <div className="container-xxl pt-5 pb-3">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Monthly challenge</h5>
                    <h1 className="mb-5">Current competitor meals</h1>
                </div>
                <div className="row g-4">
                    <DailyRecipeItem recipe={clientRecipesList[0]}/>
                    <DailyRecipeItem recipe={clientRecipesList[1]}/><DailyRecipeItem recipe={clientRecipesList[2]}/>
                    <DailyRecipeItem recipe={clientRecipesList[3]}/>
                </div>
            </div>
        </div>
    )
}