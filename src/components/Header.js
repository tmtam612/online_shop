import React from 'react';
import CartDetail from '../containers/CartDetail';
import App from '../App';
import ProductManageListContainer from './ProductManageListContainer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const Header = () => {
    return (
        <Router>
            <header>
                <nav className="navbar fixed-top navbar-toggleable-md navbar-expand-lg navbar-dark scrolling-navbar double-nav">

                    <div className="float-left">
                        
                    </div>

                    <div className="breadcrumb-dn mr-auto">
                        <Link to="/">Trang Chủ</Link>
                    </div>

                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li className="nav-item dropdown">
                            <i className="fa fa-shopping-cart"></i><Link to="/cartDetail"> Xem Giỏ Hàng</Link>
                        </li>
                    </ul>

                </nav>

            </header>
            <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/CartDetail">
                <CartDetail />
            </Route>
            <Route path="/admin/products">
                <ProductManageListContainer />
            </Route>
            </Switch>
        </Router>
        
    );
}

export default Header;