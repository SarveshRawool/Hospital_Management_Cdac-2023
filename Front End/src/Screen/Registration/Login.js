import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { serverUrl } from "../../Router/Const";

function Login() {
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const history = useHistory();

    const set1=(args)=>{
      setEmail(args.target.value);
    }
    const set2=(args)=>{
     
      setPassword(args.target.value);
    }
    const Home=()=>{
      history.push("/");
    }

//Permanent2
    // const signIn=()=>{
    //     if(Email!=""&&Password!=""){

    //       const helper=new XMLHttpRequest();
    //       helper.onreadystatechange=()=>{
    //         if(helper.status==200&&helper.readyState==4){
    //           let data1=JSON.parse(helper.responseText);
    //           console.log(data1);
    //           if(data1.name===null&&data1.id===null){
    //             toast.error("Invalid Username or Password")
    //             setEmail("");
    //             setPassword("");
    //           }
    //           else{
    //             sessionStorage.setItem("isLoggedIn","true");
    //             window.sessionStorage.setItem("userId",data1.id);
    //             window.sessionStorage.setItem("userName",data1.name);

    //             if(data1.name=="Admin")
    //             history.push('/AdminHome');
    //             if(data1.name=="Doctor")
    //             history.push('/DoctorHome');
    //             if(data1.name=="Hospital")
    //             history.push('/HospitalHome');
    //             if(data1.name=="Patient"){
    //              // window.sessionStorage.setItem("userName","User");
    //               history.push('/');
    //             }
                
    //             }
    //         }
    //       }
    //       helper.open('GET',"http://localhost:7070/signin/"+Email+"/"+Password);
    //       helper.setRequestHeader("Content-Type","application/json");
    //       helper.send();
    //     }
    //     else{
    //       toast.error("Enter Details First!!!", {
    //         position: "top-center",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //     }
    // }

    const signIn=()=>{
      console.log(serverUrl);
      if(Email!=""&&Password!=""){

        const helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>{
          if(helper.status==200&&helper.readyState==4){
            //console.log(helper.responseText);
            let data1=JSON.parse(helper.responseText);
            //console.log(data1);
            if(data1.name===null&&data1.id===null){
              toast.error("Invalid Username or Password")
              setEmail("");
              setPassword("");
            }
            else{
              sessionStorage.setItem("isLoggedIn","true");
              window.sessionStorage.setItem("userId",data1.id);
              window.sessionStorage.setItem("userName",data1.name);
              window.sessionStorage.setItem("token",data1.token);
              
              if(data1.name=="Admin")
              history.push('/AdminHome');
              if(data1.name=="Doctor")
              history.push('/DoctorHome');
              if(data1.name=="Hospital")
              history.push('/HospitalHome');
              if(data1.name=="Patient"){
               // window.sessionStorage.setItem("userName","User");
                history.push('/');
              }
              
              }
          }
          if(helper.status==500&&helper.readyState==4){
            let data1=JSON.parse(helper.responseText);
            if(data1.message==="UserDetailsService returned null, which is an interface contract violation")
            toast.error("INVALID CREDENTIALS");
            if(data1.message==="INVALID_CREDENTIALS");
            toast.error(data1.message)
          }
        }
        var url=serverUrl;
        helper.open('GET',"http://localhost:7070/signin/authenticate/"+Email+"/"+Password);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
      }
      else{
        toast.error("Enter Details First!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  }


    const register=()=>{
      //debugger;
      history.push("/RegisterPatient");
    }

    return ( 
        <>
        <nav className="navbar  navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src="http://localhost:3000/Imgs/logo.png"
            width="130"
            height="100"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand">
            <i>
              <b className="text-color">Welcome To True Life Care</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">Contact Us</b>
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li className="nav-item"> 
        <div className="nav-link active" aria-current="page" ><button className='btn' onClick={Home}> Home</button></div>
      </li>
    </ul>
          </div>
        </div>
      </nav>
        <center>
            <br/><br/><br/><br/><br/><br/><br/>
        <div style={{width:400}}>
                <main class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" name="Email" placeholder="name@example.com" value={Email} onChange={set1}/>
      <label for="floatingInput">Email address</label>
    </div>
    <br></br>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" name="Password" placeholder="Password" value={Password} onChange={set2}/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" onClick={signIn}>Sign in</button>
    <br></br>
    <br></br>
    <div className="table-responsive">
      <table className="table">
        <tr>
          <td>
            <h4>Don't have account? </h4>
          </td>
          <td>
            <button class="btn btn-primary w-100 py-2" onClick={register}>Register</button>
          </td>
        </tr>
      </table>
    </div>
    
    <br/><br/>
</main>
<ToastContainer />
</div>
</center>
        </>
     );

}
export default Login;