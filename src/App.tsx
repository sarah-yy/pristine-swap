import Layout from "./layout";
import { useAppContext } from "./provider";

function App() {
  const { handleChangeTheme } = useAppContext();

  return (
    <Layout>
      <h4 className="text-h4 font-semibold">
        Hello world!
      </h4>
      <button onClick={handleChangeTheme}>
        Click to Change Theme
      </button>
    </Layout>
  );
}

export default App;