import MenuItem from "./Menu/MenuItem";
import menuList from "../assets/menu";
import MenuNavItem from "./Menu/MenuNavItem";
import menuNavItems from "../assets/menu-nav"
import { useState, useEffect} from "react"

export default function Menu() {
    const [menu, setMenu] = useState([])
    const [menuNav, setMenuNav] = useState([])
    const [menuType, setMenuType] = useState('lunch')

    useEffect(() => {
        setMenu(menuList)
        setMenuNav(menuNavItems)
    }, [])

    const showMenuClickHandler = (type) => {
        setMenuType(type)
    }

    return(
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                    <h1 className="mb-5">Most Popular Items</h1>
                </div>
                <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.1s">
                    <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                        {menuNav.map((navItem) => < MenuNavItem menuNavItemData={navItem} key={navItem.id} showMenu={showMenuClickHandler}/>)}
                    </ul>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                            {menu.map((item) => item.type === `${menuType}` && < MenuItem meal={item} key={item.id}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}