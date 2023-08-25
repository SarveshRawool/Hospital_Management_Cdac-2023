import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function BookAppointment() {

const history=useHistory();

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

const [hospitalDetails,sethospitalDetails]=useState({
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
});
const [doctorDetails,setDoctorDetails]=useState({
    firstName: "",
    lastName: "",
    gendeer: "",
    email: "",
    mobNumber: "",
    password: "",
    addressLineOne: "",
    addressLineTwo: "",
    experience: 0,
    speciality: "",
    charges: 0,
    imagePath: "",
    id: 0
  });

const hID=window.sessionStorage.getItem('hId');
const dID=window.sessionStorage.getItem('dId');
const uID=window.sessionStorage.getItem('userId');


  useEffect(()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            //console.log(data);
            sethospitalDetails(data);
            loadDoctor();
        }
    };
    helper.open('GET','http://localhost:7070/hospital/ById?hID='+hID);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
},[]);

var loadDoctor=()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            //console.log(data);
            setDoctorDetails(data);
        }
    };
    helper.open('GET','http://localhost:7070/doctor/{did}?hID='+dID);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
}

    const bookAppointment=()=>{
      if(appointments.startDate!=""&&appointments.diseases!=""){
     
        var helper=new XMLHttpRequest;
        helper.onreadystatechange=()=>{
            if(helper.readyState==4&&helper.status==201){
                var data=JSON.parse(helper.responseText);     
                console.log(data);
               
                toast.success("Appointment Added Successfully!!!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                window.setTimeout(()=>{
                    history.push("/PatientAppointments");
                },3000);
                
                //setDoctorDetails(data);
            }
        };
        helper.open('POST','http://localhost:7070/appointment/{pID}/{dID}/{hID}?pID='+uID+'&dID='+dID+'&hID='+hID);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(appointments));     
      } else{
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

      var inputTxt=(args)=>{
        //    debugger; 
            var copy={...appointments};
            copy[args.target.name]=args.target.value;
            setAppointments(copy)  
           
            }

    

return ( <>
<center>
        <div style={{width:600}}>
                <main class="form-signin w-100 m-auto">
          <h1 class="h3 mb-3 fw-normal">Fill the Details</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="firstName" disabled='none' value={hospitalDetails.hospitalName} />
      <label for="floatingInput">Hospital Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="lastName" disabled='none' value={doctorDetails.firstName+" "+doctorDetails.lastName} onChange={inputTxt}/>
      <label for="floatingInput">Doctor Name</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="gendeer" disabled='none' value={hospitalDetails.addressLineOne+" "+hospitalDetails.addressLineTwo} onChange={inputTxt}/>
      <label for="floatingInput">Hospital Address</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="diseases" value={appointments.diseases} onChange={inputTxt}/>
      <label for="floatingInput">diseases</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="date" class="form-control" id="floatingPassword" placeholder="name@example.com" name="startDate"  value={appointments.startDate} onChange={inputTxt}/>
      <label for="floatingPassword">Date</label>
    </div>
    <br></br>

    

    <button class="btn btn-primary w-100 py-2" onClick={bookAppointment}>Book Appointment</button>
    <br></br>
    <br/><br/>
    <ToastContainer />
</main>
</div>
</center>

    </> );
}

export default BookAppointment;