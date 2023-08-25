import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DoctorInfo from "./DoctorInfo";
import HospitalInfo from "./HospitalInfo";
import { useEffect, useState } from "react";
import PendingAppointments from "./PendingAppointments";

function DoctorHome() {
  const [doctorDetails,setDoctorDetails]=useState({
                                                    firstName: "",
                                                    lastName: "",
                                                    gendeer: "",
                                                    email: "",
                                                    mobNumber: "",
                                                    addressLineOne: "",
                                                    addressLineTwo: "",
                                                    experience: 0,
                                                    speciality: "",
                                                    charges: 0,
                                                    id: 0
                                                  });

const [hospitalid,sethospitalid]=useState();
const [hospitalname,setHospitalName]=useState();

    const history=useHistory();
    const id= window.sessionStorage.getItem("userId");

    useEffect(()=>{
      var helper=new XMLHttpRequest;
      helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==200){
      var data=JSON.parse(helper.responseText);     
      console.log(data);
      setDoctorDetails(data);
      // getHospital();
      }
      };
      helper.open('GET','http://localhost:7070/doctor/{did}?hID='+id);
      helper.setRequestHeader("Content-Type","application/json");
      helper.send();
    },[]);

    // const getHospital=()=>{
    //   var helper=new XMLHttpRequest;
    //   helper.onreadystatechange=()=>{
    //   if(helper.readyState==4&&helper.status==200){
    //   var data=JSON.parse(helper.responseText);     
    //   console.log(data);
    //   //console.log(hospitalDetails);
    //   sethospitalid(data.id);
    //   setHospitalName(data.name);
    //   }
    //   };
    //   helper.open('GET','http://localhost:7070/doctor/hospital/id/{did}?hID='+id);
    //   helper.setRequestHeader("Content-Type","application/json");
    //   helper.send();
    // }

    const Home=()=>{
        history.push("/UserHome");
    }

    const setSchedule=()=>{
      history.push('/SetDoctorSchedule');
    }

    const updateProfile=()=>{
      history.push("/UpdateDoctorProfile");
    }

    const viewAppointments=()=>{
      history.push('/DoctorAppointments');
    }

    const Logout=()=>{
        sessionStorage.removeItem("userName");
        history.push("/");
    }

    return ( <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-1 me-0" href="#">{hospitalname}</a>
          <a class="navbar-brand col-lg-2 me-0" style={{textAlign:'center'}} href="#">Welcome {doctorDetails.firstName+" "+doctorDetails.lastName}</a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
                <div class="nav-link active btn" aria-current="page" onClick={Home}>Home</div>
              {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={setSchedule}>Set Schedule</div>
              {/* <a class="nav-link" href="#">Set Schedule</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={updateProfile}>Update Profile</div>
              {/* <a class="nav-link disabled">Update Profile</a> */}
            </li>
            
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={viewAppointments}>view Appointments</div>
              {/* <a class="nav-link disabled">Update Profile</a> */}
            </li>
           
            <li class="nav-item"></li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <button class="btn btn-primary" onClick={Logout}>LogOut</button>
          </div>
        </div>
      </div>
    </nav>
    <div className="d-lg-flex">
    <div className="col-lg-4" style={{margin:40}}><DoctorInfo></DoctorInfo></div>

    <div className="col-lg-6" style={{margin:40}}>
      <h2>Pending Appointments</h2>
      <PendingAppointments></PendingAppointments></div>
    </div>
    <div className="row copyrights" style={{marginTop:300}}>
                 	<div className="copyrights-left">
                     &copy; 2018. All rights reserved by <a href="http://www.freetimelearning.com" target="_blank">Sunbeam Students</a>.
                     </div>
                     <div className="copyrights-right">
                     	Designed by <a href="http://www.freetimelearning.com" target="_blank">S B R</a>
                     </div>
                 </div>
    </>
     );
}

export default DoctorHome;