import React, { Component, useState } from 'react';
import Header from './components/Header';
import ProductsContainer from './containers/ProductsContainer';
import MessageContainer from './containers/MessageContainer';
import CartContainer from './containers/CartContainer';

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 <Header />
//             <main id="mainContainer">
//                 <div className="container">
//                     <ProductsContainer />
//                     <MessageContainer />
//                     <CartContainer />
//                 </div>
//             </main>
//             <h1>Well come to Hook </h1>
//             <Footer />
//         </div>
//         );
//     }
// }
 function App() {

        return (
            <div>
                <Header />
            <main id="mainContainer">
                <div className="container">
                    <ProductsContainer />
                    <MessageContainer />
                    <CartContainer />
                </div>
            </main>
        </div>
        );
}

export default App;