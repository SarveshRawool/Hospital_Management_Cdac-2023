import { useEffect, useState } from "react";
import './viewHospital.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function ViewHospital() {
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
    const history=useHistory();
    const id= window.sessionStorage.getItem("hId");
   var src='http://localhost:7070/hospital/images/'+id;

    const Home=()=>{
        history.push("/");
    }

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

    const bookAppointment=(dID)=>{
      window.sessionStorage.setItem("dId",dID);
      const userName=window.sessionStorage.getItem("userName");
      if(userName==="Patient")
      history.push("/BookAppointment");
    else
      toast.error("Please login as Patient");
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
            <br></br>
            <center><h1 className='product-cart' style={{color:"darkblue",backgroundColor:"lightblue",fontSize:70,height:100}}>{hospitalDetails.hospitalName}</h1></center>
            {/* <center><h1 style={{color:"darkblue"}}>{hospitalDetails.hospitalName}</h1></center> */}
            <br></br>

            <div class="container">
             <img class="img-fluid imgv" src={src}/>
             <div class="bottom-right">{hospitalDetails.hospitalInfo}</div>
           </div>
           <br></br>
           <center><h1 className='product-cart' style={{color:"darkblue",width:300,height:50}}>Our Doctors</h1></center>
           <br></br>

           <div className='products-container'>
            {
                doctorDetails.map((doctor)=>{
                  var src="http://localhost:7070/doctor/images/"+doctor.id;
                    return(
                         <div className="mx-5 p-4 col-md-6 col-lg-2 product-cart">
                         <div className='product-img'>
                         <img style={{height:'80%',width:'60%'}} src={src}></img>
                         </div>
                         <div className='myproduct'>
                             <h5><a href='#'>{doctor.firstName+" "+doctor.lastName}</a></h5>
                             <p>{doctor.speciality}rs</p>
                             <div className='product-star'>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             </div>
                             <div className="btn btn-info" style={{margin:20}} onClick={()=>{bookAppointment(doctor.id)}} >Book Appointment &raquo;</div>
                             <ToastContainer />
                         </div>
                      </div>
                    )
                })
            }
            </div>

           {/* <div className="container marketing" style={{marginTop:20}}>
                 <div className="row">
                  {
                    doctorDetails.map((doctor)=>{
                          return <div className="col-lg-4">
                          <h2 style={{margin:20,textAlign:'center'}}>{doctor.firstName+" "+doctor.lastName}</h2>
                          <div class="overflow-auto p-3 bg-light" style={{maxWidth : '100%', maxHeight: 150,overflowY: 'hidden',color:'skyblue'}}>
                              Speciality : <p class="text-justify">{doctor.speciality}</p>
                              Experience : <p class="text-justify">{doctor.experience}</p>

                          </div>
                          <div className="btn btn-info" style={{margin:20}} >Book Appointment &raquo;</div>
                          </div>
                    })
                  }
                  </div>
            </div> */}
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

export default ViewHospital;