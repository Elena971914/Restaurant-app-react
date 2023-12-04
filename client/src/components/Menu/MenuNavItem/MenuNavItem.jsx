export default function MenuNavItem({menuNavItemData, showMenu}) {
    const onClickHandler = () => {
        showMenu(menuNavItemData.titleBold.toLowerCase())
    }
    return(
        <li className="nav-item" onClick={onClickHandler}>
            <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
            <i className={menuNavItemData.icon}></i>
                <div className="ps-3">
                    <small className="text-body">{menuNavItemData.titleSmall}</small>
                    <h6 className="mt-n1 mb-0">{menuNavItemData.titleBold}</h6>
                </div>
            </a>
        </li>
    )
}