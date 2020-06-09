import React, { Component } from 'react';
import Header from './components/Header';
import ProductsContainer from './containers/ProductsContainer';
import MessageContainer from './containers/MessageContainer';
import CartContainer from './containers/CartContainer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ProductManageListContainer from './containers/ProductManageListContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <main id="mainContainer">
                    <Router>
                        <Switch>
                            <Route path="/admin/products">
                                <ProductManageListContainer />
                            </Route>
                            <Route path="/">

                                <div className="container">
                                    <ProductsContainer />
                                    <MessageContainer />
                                    <CartContainer />
                                </div>
                            </Route>
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}

export default App;