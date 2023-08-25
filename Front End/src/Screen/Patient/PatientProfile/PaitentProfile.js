import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PatientProfile() {
    const history=useHistory();
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const id= window.sessionStorage.getItem("userId");

    const [patientDetails,setPatientDetails]=useState({
                                                         firstName: "",
                                                         lastName: "",
                                                         gendeer: "",
                                                         email: "",
                                                         mobNumber: "",
                                                         password: "",
                                                         addressLineOne: "",
                                                         addressLineTwo: "",
                                                         id: 0
                                                    });

    const Home=()=>{
        history.push('/PatientHome');
      }

    var inputTxt=(args)=>{
        //    debugger; 
            var copy={...patientDetails};
            copy[args.target.name]=args.target.value;
            setPatientDetails(copy)  
           
            }

      const add=()=>{
        var helper=new XMLHttpRequest;
        helper.onreadystatechange=()=>{
            if(helper.readyState==4&&helper.status==200){
              toast.success("data Added Successfully!!!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              window.setTimeout(()=>{  
                history.push('/PatientHome');
            },2000);
            }
        };
        helper.open('PUT','http://localhost:7070/patient');
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(patientDetails));
    };

    useEffect(()=>{
        var helper=new XMLHttpRequest;
        helper.onreadystatechange=()=>{
            if(helper.readyState==4&&helper.status==200){
                var data=JSON.parse(helper.responseText);     
                //console.log(data);
                setPatientDetails(data);
            }
        };
        helper.open('GET','http://localhost:7070/patient/{id}?id='+id);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
    },[]);


    return ( 
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          {/* <a class="navbar-brand col-lg-3 me-0" href="#">Home</a> */}
         
          <div class="navbar-brand col-lg-1 me-0 btn" aria-current="page" onClick={Home}>Home</div>
          <div class="navbar-brand col-lg-1 me-0" aria-current="page"></div>
          
        
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            
          </ul>
        </div>
      </div>
    </nav>

    {/* <div className="container" style={{marginTop:40}}>
        <div className="table-responsive text-center">
            <h2>Update Profile</h2>
        <table className="table">
            <tr>
                <td><h4>First Name</h4></td>
                <td><h4><input type="text" className="form-control"></input></h4></td>
            </tr>
            <tr>
                <td><h4>Last Name</h4></td>
                <td><h4><input type="text" className="form-control"></input></h4></td>
            </tr>
            <tr>
                <td><h4>Blood Group</h4></td>
                <td><h4><input type="text" className="form-control"></input></h4></td>
            </tr>
            <tr>
                <td><h4>Email</h4></td>
                <td><h4><input type="text" className="form-control"></input></h4></td>
            </tr>
            <tr>
                <td><h4>Mobile NO</h4></td>
                <td><h4><input type="number" className="form-control"></input></h4></td>
            </tr>
            <tr>
                <td><br></br></td>
            </tr>
            <tr>
                <td colSpan={2}><button className="btn btn-success" style={{width:200}}>Submit</button></td>
            </tr>
        </table>
        </div></div> */}

        <center>
        <div style={{width:600}}>
                <main class="form-signin w-100 m-auto">
          <h1 class="h3 mb-3 fw-normal">Fill the Details</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="firstName"  value={patientDetails.firstName} onChange={inputTxt}/>
      <label for="floatingInput">first Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="lastName" value={patientDetails.lastName} onChange={inputTxt}/>
      <label for="floatingInput">last Name</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="gendeer" value={patientDetails.gendeer} onChange={inputTxt}/>
      <label for="floatingInput">gender</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={patientDetails.email} onChange={inputTxt}/>
      <label for="floatingInput">Email address</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="name@example.com" name="mobNumber"  value={patientDetails.mobNumber} onChange={inputTxt}/>
      <label for="floatingPassword">Mobile Number</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com" name="password"  value={patientDetails.password} onChange={inputTxt}/>
      <label for="floatingPassword">Password</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineOne"  value={patientDetails.addressLineOne} onChange={inputTxt}/>
      <label for="floatingInput">Address Line One</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineTwo"  value={patientDetails.addressLineTwo} onChange={inputTxt}/>
      <label for="floatingInput">Address Line Two</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={add}>Update</button>
    <br></br>
    <br/><br/>
    <div style={{color:'red'}}>{error}</div>
    <div style={{color:'red'}}>{success}</div>
</main>
</div>
</center>
<ToastContainer />
        </>
     );
}

export default PatientProfile;