import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function PatientAppointments() {
    const history=useHistory();
    const id= window.sessionStorage.getItem("userId");

    const viewReciept=(aid)=>{
      window.sessionStorage.setItem("aId",aid);
      history.push("/ViewPatientReciept");
    }

    const Home=()=>{
        history.push("/PatientHome");
    }
    const[appointments,setAppointments]=useState([
        {
          startDate: "",
          status: "PENDING",
          diseases: "",
          hospitalName: "",
          doctorName: "",
          patientName: "",
          hospitalAddress: "",
          cost: 0,
          id: 0
        }
    ])

  const load=()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            //console.log(data);
            setAppointments(data);
        }
    };
    helper.open('GET','http://localhost:7070/appointment/patient/%7Bdid%7D?pID='+id);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
  }

    useEffect(()=>{
     load();
    },[]);

    const calcel=(aid)=>{
      var helper=new XMLHttpRequest;
      helper.onreadystatechange=()=>{
          if(helper.readyState==4&&helper.status==200){
            toast.success("Notified Doctor Successfully!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.setTimeout(()=>{
              load();
          },3000);

          }
      };
      helper.open('PUT','http://localhost:7070/appointment/cancel/{pid}?pid='+aid);
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
          {/* <a class="navbar-brand col-lg-3 me-0" href="#">Home</a> */}
         
          <div class="navbar-brand col-lg-1 me-0 btn" aria-current="page" onClick={Home}>Home</div>
          <div class="navbar-brand col-lg-1 me-0" aria-current="page"></div>
          <div class="navbar-brand col-lg-1 me-0 " aria-current="page"></div>
        
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            
          </ul>
         
        </div>
      </div>
    </nav>
    <div className="container" style={{marginTop:20}}>
    <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">sr no</th>
      <th scope="col">Hospital Name</th>
      <th scope="col">Doctor name</th>
      <th scope="col">Hospital Address</th>
      <th scope="col">diseases</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col" colSpan={2}>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        appointments.map((appointment,i)=>{
          if (appointment.status=='CANCELLED') {
            return <>
            <tr>
              <th scope="row">{i+1}</th>
              <td>{appointment.hospitalName}</td>
              <td>{appointment.doctorName}</td>
              <td style={{width:200}}>{appointment.hospitalAddress}</td>
              <td>{appointment.diseases}</td>
              <td>{appointment.startDate}</td>
              <td>{appointment.status}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active " aria-current="page">Cancelled</div>
              </td>
          </tr>
            </>
            
          } else if(appointment.status=='DONE'){
            return <>
          <tr>
              <th scope="row">{i+1}</th>
              <td>{appointment.hospitalName}</td>
              <td>{appointment.doctorName}</td>
              <td style={{width:200}}>{appointment.hospitalAddress}</td>
              <td>{appointment.diseases}</td>
              <td>{appointment.startDate}</td>
              <td>{appointment.status}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active btn btn-success" aria-current="page" onClick={()=>{viewReciept(appointment.id)}}>View Reciept</div>
              </td>
          </tr>
          </>
          }
          else {
          return <>
          <tr>
              <th scope="row">{i+1}</th>
              <td>{appointment.hospitalName}</td>
              <td>{appointment.doctorName}</td>
              <td style={{width:200}}>{appointment.hospitalAddress}</td>
              <td>{appointment.diseases}</td>
              <td>{appointment.startDate}</td>
              <td>{appointment.status}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active btn btn-warning" aria-current="page" onClick={()=>{calcel(appointment.id)}}>Cancel</div>
              </td>
          </tr>
          </>}
        })
        
      }
  </tbody>
</table>
    </div>
    <ToastContainer />
        </>
     );
}

export default PatientAppointments;