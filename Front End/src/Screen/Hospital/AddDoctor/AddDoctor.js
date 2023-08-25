
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './AddDoctor.css'
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

function AddDoctor() {

    const history=useHistory();
    const [selectedImage, setSelectedImage] = useState(null);
    
    const id= window.sessionStorage.getItem("userId");

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

    const Home=()=>{
        history.push("/HospitalHome");
    }

    var inputTxt=(args)=>{
      //    debugger; 
          var copy={...doctorDetails};
          copy[args.target.name]=args.target.value;
          setDoctorDetails(copy)  
         
          }


//  const uploadImage=(event)=>{
//    event.preventDefault();
//    const formData = new FormData();
//    formData.append("imageFile", selectedImage);
//    formData.append("firstName",doctorDetails.firstName);
//    formData.append("lastName",doctorDetails.lastName);
//    formData.append("gendeer",doctorDetails.gendeer);
//    formData.append("email",doctorDetails.email);
//    formData.append("mobNumber",doctorDetails.mobNumber);
//    formData.append("password",doctorDetails.password);
//    formData.append("addressLineOne",doctorDetails.addressLineOne);
//    formData.append("addressLineTwo",doctorDetails.addressLineTwo);
//    formData.append("experience",doctorDetails.experience);
//    formData.append("speciality",doctorDetails.speciality);
//    formData.append("charges",doctorDetails.charges);
//    formData.append("imagePath",doctorDetails.imagePath);
//    formData.append("id",doctorDetails.id);
 
//    axios
//      .post("http://localhost:7070/doctor/{hsptlID}?hsptlID="+id, formData)
//      .then((result) => {
       
//          console.log(result);
//          toast.success("Image Added Successfully!!!", {
//            position: "top-center",
//            autoClose: 1000,
//            hideProgressBar: false,
//            closeOnClick: true,
//            pauseOnHover: true,
//            draggable: true,
//            progress: undefined,
//          });
//      })
//      .catch(error => {
//       toast.error("Image Uploading failed!!!", {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     });
//    }
   
        
    var addDoctor=()=>{
      if(doctorDetails.firstName!=""&&doctorDetails.lastName!=""&&doctorDetails.gendeer!=""&&doctorDetails.email!=""&&doctorDetails.mobNumber!=""&&doctorDetails.password!=""
      &&doctorDetails.addressLineOne!=""&&doctorDetails.experience!=""&&doctorDetails.speciality!=""&&doctorDetails.charges!=""&&doctorDetails.addressLineTwo!=""){
      
      var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>{
           // debugger;
            if(helper.status===201&&helper.readyState===4){
               //console.log("data added successfully");
               
                setDoctorDetails({
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
                  id: 0
                });
                toast.success("Doctor Added Successfully!!!", {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                window.setTimeout(()=>{
                
                  history.push('/HospitalHome');
              },2000);
            }
            if(helper.status===400&&helper.readyState===4){
              let data=helper.responseText;
              let err;
              data.forEach(element => {
                
                console.log(element);
              });
            }
        }
        helper.open("POST","http://localhost:7070/doctor/{hsptlID}?hsptlID="+id);
        helper.setRequestHeader("Content-Type","application/json")
        helper.send(JSON.stringify(doctorDetails));
      }
      else{
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
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="firstName"  value={doctorDetails.firstName} onChange={inputTxt}/>
      <label for="floatingInput">first Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="lastName" value={doctorDetails.lastName} onChange={inputTxt}/>
      <label for="floatingInput">last Name</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="gendeer" value={doctorDetails.gendeer} onChange={inputTxt}/>
      <label for="floatingInput">gender</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={doctorDetails.email} onChange={inputTxt}/>
      <label for="floatingInput">Email address</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="name@example.com" name="mobNumber"  value={doctorDetails.mobNumber} onChange={inputTxt}/>
      <label for="floatingPassword">Mobile Number</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com" name="password"  value={doctorDetails.password} onChange={inputTxt}/>
      <label for="floatingPassword">Password</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineOne"  value={doctorDetails.addressLineOne} onChange={inputTxt}/>
      <label for="floatingInput">Address Line One</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineTwo"  value={doctorDetails.addressLineTwo} onChange={inputTxt}/>
      <label for="floatingInput">Address Line Two</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput" name="experience" placeholder="name@example.com" value={doctorDetails.experience} onChange={inputTxt}/>
      <label for="floatingInput">Experience</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" name="speciality" placeholder="name@example.com" value={doctorDetails.speciality} onChange={inputTxt}/>
      <label for="floatingInput">Speciality</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput" name="charges" placeholder="name@example.com" value={doctorDetails.charges} onChange={inputTxt}/>
      <label for="floatingInput">Charges</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={addDoctor}>Add Doctor</button>
    <br></br>
    <br/><br/>
</main>
</div>
</center>
<ToastContainer /> 
        </>
     );
}

export default AddDoctor;