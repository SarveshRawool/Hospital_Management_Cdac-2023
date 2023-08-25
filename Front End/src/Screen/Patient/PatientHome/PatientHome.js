import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function PatientHome() {

    const history=useHistory();
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
    const [hospitalDetails,sethospitalDetails]=useState([]);
    const id= window.sessionStorage.getItem("userId");
    const [hid,setHid]=useState(0);
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

    const Home=()=>{
        history.push("/");
    }

    const Appointments=()=>{
        history.push('/PatientAppointments');
    }

    const TakeAppointments=()=>{
        history.push('/TakeAppointments');
    }

    const UpdateProfile=()=>{
        history.push('/PatientProfile');

    }

    const Logout=()=>{
        sessionStorage.removeItem("userName");
        history.push("/");
    }

    const GotoDetails=(id)=>{
      window.sessionStorage.setItem("hId",id);
      history.push('/ViewHospital');
  }

  const add=()=>{
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
};

useEffect(()=>{
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==200){
          var data=JSON.parse(helper.responseText);     
          //console.log(data);
          sethospitalDetails(data);
          add();
      }
  };
  helper.open('GET','http://localhost:7070/hospital/status/active');
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
          <a class="navbar-brand col-lg-1 me-0" href="#"><h2> Welcome {patientDetails.firstName+" "+patientDetails.lastName}</h2></a>
          <a class="navbar-brand col-lg-2 me-0" style={{textAlign:'center'}} href="#"></a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
                <div class="nav-link active btn" aria-current="page" onClick={Home}>Home</div>
              {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={Appointments}>My Appointments</div>
              {/* <a class="nav-link" href="#">Set Schedule</a> */}
            </li>
            {/* <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={TakeAppointments}>Take Appointments</div>
              
            </li> */}
            
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={UpdateProfile}>Update Profile</div>
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
    <div className="container marketing col-lg-8" style={{marginTop:20}}>
                 <div className="row">
                 {
                    hospitalDetails.map((hospital,index)=>{
                      //loadDoctor(hospital.id);
                        // var src='http://localhost:7070/hospital/images/'+hospital.id;
                        return <>
                                 <div className="col-lg-4">
                                    {/* <img className="img-circle imgs"  src={src} alt="Generic placeholder image" width="200" height="140" id='101' style={{marginLeft:10}}  onClick={GotoDetails}/> */}
                                    <h2 style={{margin:20,textAlign:'center'}}>{hospital.hospitalName}</h2>
                                    
                                    <div class="overflow-auto p-3  tool" style={{maxWidth : '100%', Height: 300,overflowY: 'hidden',color:'black',backgroundColor:'skyblue'}}>
                                        <p class="text-justify">{hospital.addressLineOne}</p>
                                        <p class="text-justify">{hospital.addressLineTwo}</p>
                                        
                                    </div>
                                    <div className="btn btn-info" style={{margin:20}} onClick={()=>{GotoDetails(hospital.id)}}>Book Appointment &raquo;</div>
                                 </div>
                                 
                        </>
                    })
                }
            </div> 
           </div>
    <div className="col-lg-4"></div>
    </div>
        </>
     );
}

export default PatientHome;