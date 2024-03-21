import MapProvider from "./components/GoogleMaps/MapProvider";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="w-full h-screen bg-gray-50">
      <MapProvider />
    </div>
  );
};

export default App;
