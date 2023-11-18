import {Link} from 'react-router-dom'
import { useState } from "react";

export default function DailyRecipeItem(props) {
    const [likes, setLikes] = useState(0)

    const likeHandler = (e) => {
        e.preventDefault()
        setLikes(likes + 1)}
    const dislikeHandler = (e) => {
        e.preventDefault()
        setLikes(likes - 1)}

    return(
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                    <img className="img-fluid" src={props.recipe.imageURL} alt=""/>
                </div>
                <h5 className="mb-0">{props.recipe.name}</h5>
                <small>{props.recipe.author}</small>
                <h5>Likes: {likes}</h5>
                <h6>Current position: 1</h6>
                <div className="d-flexjustify-content-center mt-3">
                    <a className="btn btn-square btn-primary mx-1" href="" onClick={likeHandler}><i className="fa-solid fa-thumbs-up" style={{color: "#ffffff"}}></i></a>
                    <Link className="btn btn-square btn-primary mx-1" to={`/recipes/${props.recipe.id}`}><i className="fa-solid fa-info"></i></Link>
                    <a className="btn btn-square btn-primary mx-1" href="" onClick={dislikeHandler}><i className="fa-solid fa-thumbs-down"></i></a>
                </div>
            </div>
        </div>
    )
}