import FoodItems from "./component/admin/FoodItems"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  return (
    <div>
     <Router>
        <Route
          exact
          strict
          component={FoodItems}
          path="/fooditems"
          history={props.history}
        ></Route>
        </Router>

    </div>
  );
}

export default App;
