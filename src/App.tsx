import { Layout } from "./layout";
import { DetailsUser } from "./pages/details-user";
import Home from "./pages/freelancers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccount } from "./pages/add-user";
import { SignIn } from "./pages/sign-in";
import { Profile } from "./pages/freelance-profile";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/users" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/create_user"
            element={<CreateAccount />}
          />
          <Route path="/users/:id" element={<DetailsUser />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
