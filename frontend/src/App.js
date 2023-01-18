import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./services/Layout";
import PublicRoute from "./services/PublicRoute";
import RequireAuth from "./services/RequireAuth";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                    </Route>

                    {/* private routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    {/* 404 page */}
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
