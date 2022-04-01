import "./App.css";
import { useAuth } from "./context/AuthContext";
import UnauthorizedApp from "./unauthorized-app";
import AuthorizedApp from "./authorized-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">{user ? <AuthorizedApp /> : <UnauthorizedApp />}</div>
  );
}

export default App;
