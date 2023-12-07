import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";

import * as likesServices from "../../../services/likesServices"
import UserContext from '../../../contexts/UserContext';
import styles from "./DailyRecipeItem.module.css"

export default function DailyRecipeItem({
    imageURL, title, author, _id
}) {
    const [likesObj, setLikesObj] = useState({})
    const {userId} = useContext(UserContext)

    useEffect(() => {
        likesServices.getAll()
          .then(result => result.find(obj => obj.recipeId === _id))
          .then(setLikesObj)
          .catch(error => {
            console.log('Error in loading likes:', error);
            throw error;
          });
      }, []);
      

    const onLikeClick = () => {
        if (!likesObj.likedBy.includes(userId)) {
            likesObj._ownerId = userId
            likesObj.likedBy.push(userId)
            likesServices.like(likesObj._id, likesObj)
        }
    }

    return(
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                    <img className="img-fluid" src={imageURL} alt=""/>
                </div>
                <h5 className={styles.padding}>{title}</h5>
                <small>{author}</small>
                <h5>Likes: {likesObj?.likedBy?.length}</h5>
                <div className="d-flexjustify-content-center mt-3">
                    <Link className="btn btn-square btn-primary mx-1" onClick={onLikeClick}><i className="fa-solid fa-thumbs-up" style={{color: "#ffffff"}}></i></Link>
                    <Link className="btn btn-square btn-primary mx-1" to={`/recipes/${_id}`}><i className="fa-solid fa-info"></i></Link>
                </div>
            </div>
        </div>
    )
}