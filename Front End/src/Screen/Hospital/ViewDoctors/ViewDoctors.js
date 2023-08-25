import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ViewDoctors() {
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
const history=useHistory();
var id= window.sessionStorage.getItem("hId");
//http://localhost:7070/doctor/images/1
var src='http://localhost:7070/doctor/images/'+id;

const Home=()=>{
  history.push("/HospitalHome");
}

useEffect(()=>{
  var helper=new XMLHttpRequest;
  helper.onreadystatechange=()=>{
  if(helper.readyState==4&&helper.status==200){
  var data=JSON.parse(helper.responseText);     
  console.log(data);
  setDoctorDetails(data);
  }
  };
  helper.open('GET','http://localhost:7070/doctor/hospital/{hid}?hID='+id);
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
<div class="navbar-brand col-lg-1 me-0 " aria-current="page" ></div>
<ul class="navbar-nav col-lg-6 justify-content-lg-center">
</ul>     
</div>
</div>
</nav>
<br></br>
<center><h1 style={{color:"darkblue"}}>{doctorDetails.firstName+" "+doctorDetails.lastName}</h1></center>
<br></br>
<div class="container">
             <img class="img-fluid imgv" src={src}/>
             <div class="bottom-right">{doctorDetails.speciality}</div>
</div>


<div className="row copyrights">
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

export default ViewDoctors;