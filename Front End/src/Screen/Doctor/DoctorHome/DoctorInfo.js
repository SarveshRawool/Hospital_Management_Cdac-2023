import { useEffect, useState } from 'react';
import './DoctorInfo.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function DoctorInfo() {
    const history=useHistory();
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
    const id= window.sessionStorage.getItem("userId");
//http://localhost:7070/doctor/{did}?hID=5

useEffect(()=>{
    var helper=new XMLHttpRequest;
    helper.onreadystatechange=()=>{
        if(helper.readyState==4&&helper.status==200){
            var data=JSON.parse(helper.responseText);     
            //console.log(data);
            setDoctorDetails(data);
            //selectDoctor();
        }
    };
    helper.open('GET','http://localhost:7070/doctor/{did}?hID='+id);
    helper.setRequestHeader("Content-Type","application/json");
    helper.send();
},[]);

const updateProfile=()=>{
    history.push("/UpdateDoctorProfile");
  }

var src="http://localhost:7070/doctor/images/"+id;

    return ( 
        <>
        <div className='products-container'>
        <div className="mx-5 p-4 col-md-6 col-lg-6 product-cart">
                         <div className='product-img'>
                         <img style={{height:'80%',width:'80%'}} src={src}></img>
                         </div>
                         <div className='myproduct'>
                             <h5><a href='#'>{doctorDetails.firstName+" "+doctorDetails.lastName}</a></h5>
                             <p>{doctorDetails.speciality}rs</p>
                             <div className='product-star'>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             <i className="fas fa-star" style={{color : 'gold'}}></i>
                             </div>
                             <div className="btn btn-info" style={{margin:20}} onClick={updateProfile}>Edit Card &raquo;</div>
                         </div>
            </div>
        </div>
        </>
     );
}

export default DoctorInfo;