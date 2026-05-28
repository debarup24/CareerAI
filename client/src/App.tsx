import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { useAppData } from "./context/AppContext";
import Loading from "./components/Loading";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Analyse from "./pages/Analyse";
import JobMatcher from "./pages/JobMatcher";
import InterviewPrep from "./pages/InterviewPrep";
import BuildResumePage from "./pages/BuildResume";

const App = () => {
  const { loading } = useAppData();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Account />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/jobmatcher" element={<JobMatcher />} />
          <Route path="/interviewprep" element={<InterviewPrep />} />
          <Route path="/resumebuilder" element={<BuildResumePage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
