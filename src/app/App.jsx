import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";


import Header from "../common/components/Header/Header.jsx";
import MainLayout from "../common/components/Main/MainLayout.jsx";
import OrderScreen from "../features/Order/OrderScreen.jsx";


function App() {


  return (
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                <>
                    <Header />
                    <MainLayout />
                </>
            }
            />

            <Route
                path="/your-order"
                element={
                <>
                    <Header></Header>
                    <OrderScreen />
                </>
                }
            />


        </Routes>
    </Router>
  )
}

export default App
