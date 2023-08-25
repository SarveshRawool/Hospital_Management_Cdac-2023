import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ViewAllHospitals() {
    const history=useHistory();
  const [hospitalDetails,sethospitalDetails]=useState([{
    hospitalName : "",
    hospitalInfo: "",
    addressLineOne: "",
    addressLineTwo: "",
    email: "",
    mobNumber: "",
    password: "",
    imagePath: "",
    id: 0,
    workingDays: 0
  }]);
  const [hospitalinactive,sethospitalinactive]=useState([{
    hospitalName : "",
    hospitalInfo: "",
    addressLineOne: "",
    addressLineTwo: "",
    email: "",
    mobNumber: "",
    password: "",
    imagePath: "",
    id: 0,
    workingDays: 0
  }]);

  const Home=()=>{
    history.push("/AdminHome");
}

const loadActive=()=>{
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==200){
          var data=JSON.parse(helper.responseText);     
          //console.log(data);
          sethospitalDetails(data);
      }
  };
  helper.open('GET','http://localhost:7070/hospital/status/active');
  helper.setRequestHeader("Content-Type","application/json");
  helper.send();
}
const loadInactive=()=>{
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==200){
          var data=JSON.parse(helper.responseText);     
          //console.log(data);
          sethospitalinactive(data);
      }
  };
  helper.open('GET','http://localhost:7070/hospital/status/inactive');
  helper.setRequestHeader("Content-Type","application/json");
  helper.send();
}

useEffect(()=>{
  loadActive();
  loadInactive();
},[]);

const active=(id)=>{
  //http://localhost:7070/hospital/status/actine/{hId}?hId=11
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==202){
        toast.success("Hospital Activated Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.setTimeout(()=>{
          loadActive();
          loadInactive();
      },2000);
      }
  };
  helper.open('PUT','http://localhost:7070/hospital/status/actine/{hId}?hId='+id);
  helper.setRequestHeader("Content-Type","application/json");
  helper.send();
}

const remove=(id)=>{
  //http://localhost:7070/hospital/status/inactine/{hId}?hId=
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==202){
        toast.success("Hospital Removed Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.setTimeout(()=>{
          loadActive();
          loadInactive();
      },2000);
      }
  };
  helper.open('PUT','http://localhost:7070/hospital/status/inactine/{hId}?hId='+id);
  helper.setRequestHeader("Content-Type","application/json");
  helper.send();
}

    return ( 
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-1 me-0" href="#"><h2>Welcome Master</h2></a>
          <a class="navbar-brand col-lg-2 me-0" style={{textAlign:'center'}} href="#"></a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
                <div class="nav-link active btn" aria-current="page" onClick={Home}>Home</div>
              {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
            </li>
           
            
           
            <li class="nav-item"></li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            {/* <button class="btn btn-primary" onClick={Logout}>LogOut</button> */}
          </div>
        </div>
      </div>
    </nav>

    <div className="container" style={{marginTop:20}}>
    <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">sr no</th>
      
      <th scope="col">Hospital Name</th>
      <th scope="col">Hospital Info </th>
      <th scope="col">Address Line One</th>
      <th scope="col">Address Line Two</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Working Days</th>
      <th scope="col" colSpan={2}>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        hospitalDetails.map((hospital,i)=>{

            return <>
            <tr>
              <th scope="row">{i+1}</th>
             
              <td>{hospital.hospitalName}</td>
              <td>{hospital.hospitalInfo}</td>
              <td>{hospital.addressLineOne}</td>
              <td>{hospital.addressLineTwo}</td>
              <td>{hospital.email}</td>
              <td>{hospital.mobNumber}</td>
              <td>{hospital.workingDays}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active btn btn-danger" aria-current="page" onClick={()=>{remove(hospital.id)}}>Remove</div>
              </td>
          </tr>
            </>
        
        })
        
      }<tr>
        <td colSpan={10}>
        <br></br>
      <h3 style={{textAlign:"center"}}>Old Links</h3>
      <br></br>
        </td>
      </tr>
      
      {
        hospitalinactive.map((hospital,i)=>{

            return <>
            <tr>
              <th scope="row">{i+1}</th>
             
              <td>{hospital.hospitalName}</td>
              <td>{hospital.hospitalInfo}</td>
              <td>{hospital.addressLineOne}</td>
              <td>{hospital.addressLineTwo}</td>
              <td>{hospital.email}</td>
              <td>{hospital.mobNumber}</td>
              <td>{hospital.workingDays}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active btn btn-info" aria-current="page" onClick={()=>{active(hospital.id)}}>Active</div>
              </td>
          </tr>
            </>
        
        })
        
      }
  </tbody>
</table>
    </div>
    <ToastContainer />
        </>
     );
}

export default ViewAllHospitals;