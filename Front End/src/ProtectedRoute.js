import { Route } from "react-router-dom";
import Login from "./Screen/Registration/Login";

function ProtectedRoute(props) {
     const isLoggedIn=sessionStorage.getItem("isLoggedIn");
        if(isLoggedIn!=null&&isLoggedIn==='true'){
            //debugger;
            return <Route exact path={props.path} component={props.component}></Route>
        }
        else{
            //debugger
            return <Login></Login>
        }
}

export default ProtectedRoute;