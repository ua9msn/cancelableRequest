import { fetcherFactory } from "./fetcher";
import { debounce } from "./debounce";
import "./styles.css";

const simpleFetcher = fetcherFactory();
const delayedSimpleFetcher = debounce(simpleFetcher, 5000);

export default function App() {
  console.log("render app");

  const onSimpleFetch = async () => {
    delayedSimpleFetcher("simple")
      .then((simpleResponse) => {
        console.log("simpleFetch: ", simpleResponse);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <div>
        <button onClick={onSimpleFetch}>Simple Fetch</button>
      </div>
    </div>
  );
}
