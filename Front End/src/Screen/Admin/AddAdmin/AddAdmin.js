import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";

function AddAdmin() {
    const history=useHistory();
    const [admin,addAdmin]=useState({
        email: "",
        password: "",
        id: 0
      }
      );

    var inputTxt=(args)=>{
        //    debugger; 
            var copy={...admin};
            copy[args.target.name]=args.target.value;
            addAdmin(copy)  
           
            }
    
    const Home=()=>{
    history.push("/");
    }

    const save=()=>{
        if(admin.email!=""&&admin.password!=""){
          var helper=new XMLHttpRequest();
          helper.onreadystatechange=()=>{
             // debugger;
              if(helper.status===201&&helper.readyState===4){
                 //console.log("data added successfully");
                 addAdmin({
                    email: "",
                    password: "",
                    id: 0
                  });
                  toast.success("Admin Added Successfully!!!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  window.setTimeout(()=>{
                    history.push('/');
                },3000);
              }
              //console.log("data added unsccessfully");
          }
          helper.open("POST","http://localhost:7070/admin");
          helper.setRequestHeader("Content-Type","application/json")
          helper.send(JSON.stringify(admin));
        }
        else{
          toast.error("Fill all the details correctly!!!", {
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


    return ( <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          {/* <a class="navbar-brand col-lg-3 me-0" href="#">Home</a> */}
         
          <div class="navbar-brand col-lg-1 me-0 btn" aria-current="page" onClick={Home}>Home</div>
          <div class="navbar-brand col-lg-1 me-0" aria-current="page"></div>
          <div class="navbar-brand col-lg-1 me-0 " aria-current="page"></div>
        
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            
          </ul>
         
        </div>
      </div>
    </nav>

    <center>
        <div style={{width:600}}>
                <main class="form-signin w-100 m-auto">
          <h1 class="h3 mb-3 fw-normal">Fill the Details</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email"  value={admin.email} onChange={inputTxt}/>
      <label for="floatingInput">Admin Email ID</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com" name="password"  value={admin.password} onChange={inputTxt}/>
      <label for="floatingPassword">Password</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={save}>Save</button>
    <br></br>
    <br/><br/>
    <ToastContainer />

    </main>
    </div>
    </center>
    </> );
}

export default AddAdmin;