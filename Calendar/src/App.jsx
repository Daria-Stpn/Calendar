import { BrowserRouter } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import StoreProvider from "./store/ContextStore";

function App() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Header />
                <Main />
                <Footer />
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
