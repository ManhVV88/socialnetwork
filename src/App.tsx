import Routes from "../src/components/RouteCustom/Routes";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    
      <AuthProvider>
        <Routes />
      </AuthProvider>
    
  );
};

export default App;
