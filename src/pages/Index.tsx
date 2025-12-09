import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the landing page
  return <Navigate to="/home" replace />;
};

export default Index;