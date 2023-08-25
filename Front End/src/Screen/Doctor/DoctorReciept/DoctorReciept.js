import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function  DoctorReciept() {
    const history=useHistory();
    const userId= window.sessionStorage.getItem("userId");
    const AppointmentId=window.sessionStorage.getItem("aId");

    const Home=()=>{
        history.push('/DoctorHome');
      }

const [reciept,setReciept]=useState({
  id: 0,
  patientName: "",
  problemDescription: "",
  appointmentDate: "",
  medicine: "",
  treatmentPrice: 0,
  prescription: ""
})

const[appointments,setAppointments]=useState({
        startDate: "",
        status: "PENDING",
        diseases: "",
        hospitalName: "",
        doctorName: "",
        patientName: "",
        hospitalAddress: "",
        cost: 0,
        id: 0
        });

useEffect(()=>{
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
  if(helper.readyState==4&&helper.status==200){
 var data=JSON.parse(helper.responseText);  
 
 setAppointments(data);
  }
  };
  helper.open('GET','http://localhost:7070/appointment/single/{aId}?aId='+AppointmentId);
  helper.setRequestHeader("Content-Type","application/json");
  helper.send();
},[]);

const bookAppointment=()=>{     
  reciept.patientName=appointments.patientName;
    reciept.appointmentDate=appointments.startDate;
    reciept.problemDescription=appointments.diseases;  
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
      if(helper.readyState==4&&helper.status==201){
          var data=JSON.parse(helper.responseText);     
          console.log(data);
         
          toast.success("Appointment updated Successfully!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          window.setTimeout(()=>{
              history.push("/DoctorHome");
          },2500);
          
          //setDoctorDetails(data);
      }
  };
  helper.open('POST','http://localhost:7070/appointment/{AptID}?AptID='+AppointmentId);
  helper.setRequestHeader("Content-Type","application/json");
  helper.send(JSON.stringify(reciept));
}


var inputTxt=(args)=>{
  //    debugger; 
      var copy={...reciept};
      copy[args.target.name]=args.target.value;
      setReciept(copy)  
     
      }




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
          <div class="navbar-brand col-lg-1 me-0 " aria-current="page" ></div>
        
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
    <input type="date" class="form-control" id="floatingPassword" placeholder="name@example.com" name="startDate" disabled='none'  value={appointments.startDate} o/>
    <label for="floatingPassword">Appointment Date</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="patientName" disabled='none' value={appointments.patientName} />
      <label for="floatingInput">Patient Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="diseases" disabled='none' value={appointments.diseases} />
      <label for="floatingInput">Problem Description</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="prescription" value={reciept.prescription} onChange={inputTxt}/>
      <label for="floatingInput">Prescription</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="medicine" value={reciept.medicine} onChange={inputTxt}/>
      <label for="floatingInput">Medicine</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com" name="treatmentPrice" value={reciept.treatmentPrice} onChange={inputTxt}/>
      <label for="floatingInput">Treatment Price</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={bookAppointment}>Update Appointment</button>
    <br></br>
    <br/><br/>
    <ToastContainer />
</main>
</div>
</center>
        </>
     );
}

export default DoctorReciept;