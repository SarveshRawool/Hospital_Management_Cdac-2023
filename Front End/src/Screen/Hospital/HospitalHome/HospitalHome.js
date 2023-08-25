import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './hospitalHome.css'
import ViewAppointments from "../ViewAppointments/ViewAppointments";

function HospitalHome() {

    const history=useHistory();
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

const [doctorDetails,setDoctorDetails]=useState([{
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
                                                  }]);
    
     const id= window.sessionStorage.getItem("userId");

    useEffect(()=>{
      var helper=new XMLHttpRequest;
      helper.onreadystatechange=()=>{
          if(helper.readyState==4&&helper.status==200){
              var data=JSON.parse(helper.responseText);     
              console.log(data);
              sethospitalDetails(data);
              selectDoctor();
          }
      };
      helper.open('GET','http://localhost:7070/hospital/ById?hID='+id);
      helper.setRequestHeader("Content-Type","application/json");
      helper.send();
  },[]);

  const selectDoctor=()=>{
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
  }

  const viewAppointments=()=>{
    history.push('/ViewAllAppointments');
  }

    const Home=()=>{
        history.push("/");
    }

    const addDoctor=()=>{
        history.push('/AddDoctor');
    }
    
    const UpdateHospitalDetails=()=>{
        history.push('/EditHospitalDetails');
    }

    const Logout=()=>{
        sessionStorage.removeItem("userName");
        history.push("/");
    }
    
    const view=(id)=>{
      window.sessionStorage.setItem("dId",id);
      history.push("/EditDeleteDoctor");
  }

  //ViewAllDoctors
  const viewAllDoctors=()=>{
    history.push('/ViewAllDoctors');
}

    const myStyle={
      backgroundImage:`url("http://localhost:3000/Imgs/bg1.jpg")`,
              height:'100%',
              //marginTop:'-70px',
              backgroundAttachment: 'fixed',
             // backgroundColor:'lightgreen'
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
              };

    return ( 
        <>
          
            <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-1 me-0" href="#"><h2>{hospitalDetails.hospitalName}</h2></a>
          <a class="navbar-brand col-lg-2 me-0" style={{textAlign:'center'}} href="#"></a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
                <div class="nav-link active btn" aria-current="page" onClick={Home}>Home</div>
              {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={addDoctor}>Add Doctor</div>
              {/* <a class="nav-link" href="#">Set Schedule</a> */}
            </li>
            {/* <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={viewDoctor}>View Doctors</div>
              <a class="nav-link disabled">Update Profile</a>
            </li> */}
            
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={viewAppointments}>view All Appointments</div>
              {/* <a class="nav-link disabled">Update Profile</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={viewAllDoctors}>view All Doctors</div>
              {/* <a class="nav-link disabled">Update Profile</a> */}
            </li>
            <li class="nav-item" style={{marginLeft:20}}>
            <div class="nav-link active btn" aria-current="page" onClick={UpdateHospitalDetails}>Update Hospital Details</div>
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
    <div   style={myStyle}>
      <div style={{height:'100%'}}>
        <div className="d-lg-flex">
          <div className="col-lg-5" style={{margin:40}}>
          <center><h2 style={{color:"yellow"}}>Doctors</h2> </center>
          
          <div className='products-containers'>
            {
                doctorDetails.map((doctor)=>{
                  var src="http://localhost:7070/doctor/images/"+doctor.id;
                    return(
                         <div className="mx-5 p-4 col-md-6 col-lg-3 product-carts">
                         <div className='product-imgs'>
                         <img style={{height:200,width:150}} src={src}></img>
                         </div>
                         <div className='myproducts'>
                             <h5><a href='#'>{doctor.firstName+" "+doctor.lastName}</a></h5>
                             <p>{doctor.speciality}rs</p>
                             <div className='product-stars'>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             </div>
                             <div className="btn btn-info" style={{margin:20,width:'70%'}} onClick={()=>{view(doctor.id)}} >View &raquo;</div>
                         </div>
                      </div>
                    )
                })
            }
            </div>

          </div>
          <div className="col-lg-6" style={{margin:40}}>
            <center><h2 style={{color:"yellow"}}>Pending Appointments</h2> </center>
            <ViewAppointments></ViewAppointments>
          </div>
        </div> 
      </div>
 
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

export default HospitalHome;