import AppRouter from "./routers/AppRouter";
import "./styles/styles.scss";
import { MediaProvider } from "./context/provider";

function App() {

  return (
    <MediaProvider>
      <AppRouter />
    </MediaProvider>
  )
}

export default App
