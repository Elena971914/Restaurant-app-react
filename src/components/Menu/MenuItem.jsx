export default function MenuItem(props) {
    return(
        <div className="col-lg-6">
            <div className="d-flex align-items-center">
                <img className="flex-shrink-0 img-fluid rounded" style={{width: '80px'}} src={props.meal.img} alt=""/>
                <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span>{props.meal.name}</span>
                        <span className="text-primary">{props.meal.price}</span>
                    </h5>
                    <small className="fst-italic">{props.meal.recipe}</small>
                </div>
            </div>
        </div>
    )
}
