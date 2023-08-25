import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './ViewHospitalReciept.css'

function ViewHospitalReciept() {
    const history=useHistory();
    const AppointmentId=window.sessionStorage.getItem("aId");

const Home=()=>{
    history.push('/HospitalHome');
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

const[appointments,setAppointments]=useState(
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
  )

  useEffect(()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            console.log(data);
            setAppointments(data);
        }
    };
    helper.open('GET','http://localhost:7070/appointment/single/{aId}?aId='+AppointmentId);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
  },[]);


useEffect(()=>{
        var helper=new XMLHttpRequest;
        helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
       var data=JSON.parse(helper.responseText);  
      console.log(data);
      setReciept(data);
        }
        };
        helper.open('GET','http://localhost:7070/appointment/{did}?did='+AppointmentId);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
      },[]);


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
          <div class="navbar-brand col-lg-1 me-0 " aria-current="page" ></div>
        
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            
          </ul>
          
        </div>
      </div>
    </nav>
<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									{appointments.hospitalName}
								</td>

								<td>
									Invoice #: {reciept.id}<br />
									Created: {reciept.appointmentDate}<br />
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td style={{width:150}}>
									{appointments.hospitalAddress}
								</td>

								<td>
									
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>UPI #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>₹{reciept.treatmentPrice}</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Treatment Fee</td>

					<td>₹{reciept.treatmentPrice-reciept.treatmentPrice/2}</td>
				</tr>

				<tr class="item">
					<td>Medicine</td>

					<td>₹{reciept.treatmentPrice-reciept.treatmentPrice/2}</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: ₹{reciept.treatmentPrice}</td>
				</tr>
			</table>
		</div>
        </> );
}

export default ViewHospitalReciept;