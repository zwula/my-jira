import "./App.css";
import { useAuth } from "./context/AuthContext";
import UnauthorizedApp from "./unauthorized-app";
import AuthorizedApp from "./authorized-app";
import { ErrorPage } from "./components/lib";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary fallbackRender={ErrorPage}>
      <div className="App">
        {user ? <AuthorizedApp /> : <UnauthorizedApp />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
