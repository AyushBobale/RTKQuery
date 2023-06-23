import "./App.css";

import { useServerStatusQuery } from "./redux/slices/rootSlice";

function App() {
  const { data, error, isLoading } = useServerStatusQuery("bulbasaur");
  console.log(data);
  return <div>Test</div>;
}

export default App;
