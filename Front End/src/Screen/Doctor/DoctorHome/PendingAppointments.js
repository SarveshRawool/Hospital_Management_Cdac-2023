import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PendingAppointments() {
    const id= window.sessionStorage.getItem("userId");
    const history=useHistory();

    const makeReciept=(aid)=>{
      window.sessionStorage.setItem("aId",aid);
      history.push("/GenerateDoctorReciept");
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
  
    useEffect(()=>{
      var helper=new XMLHttpRequest;
      helper.onreadystatechange=()=>{
          if(helper.readyState==4&&helper.status==200){
              var data=JSON.parse(helper.responseText);     
              //console.log(data);
              setAppointments(data);
          }
      };
      helper.open('GET','http://localhost:7070/appointment/doctor/{did}?dID='+id);
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
                      <div class="nav-link active btn btn-warning" aria-current="page" onClick={()=>{makeReciept(appointment.id)}}>Make Reciept</div>
                </td>
            </tr>
            </>}
          })
          
        }
    </tbody>
  </table>
      </div>
          </>
       );
}

export default PendingAppointments;