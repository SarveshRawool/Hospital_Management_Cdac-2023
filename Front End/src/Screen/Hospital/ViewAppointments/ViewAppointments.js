import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ViewAppointments() {

  const id= window.sessionStorage.getItem("userId");

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

const inform=()=>{
  toast.success("Notified Doctor Successfully!!!", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

  useEffect(()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            //console.log(data);
            setAppointments(data);
        }
    };
    helper.open('GET','http://localhost:7070/appointment/hospital/{hid}?hID='+id);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
  },[]);

    return ( 
        <>
    <div className="container" style={{marginTop:20}}>
    <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">sr no</th>
      
      <th scope="col">Doctor Name</th>
      <th scope="col">Patient Name </th>
      <th scope="col">diseases</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col" colSpan={2}>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        appointments.map((appointment,i)=>{
          
      if(appointment.status==='PENDING'){
          return <>
          <tr>
              <th scope="row">{i+1}</th>
              
              <td>{appointment.doctorName}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.diseases}</td>
              <td>{appointment.startDate}</td>
              <td>{appointment.status}</td>
              <td class="nav-item" style={{marginLeft:20}}> 
                    <div class="nav-link active btn btn-warning" aria-current="page" onClick={inform}>Inform Doctor</div>
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

export default ViewAppointments;