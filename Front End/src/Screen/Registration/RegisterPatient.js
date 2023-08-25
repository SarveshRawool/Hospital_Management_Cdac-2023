import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './RegisterPatient.css'
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function RegisterPatient() {
  const history=useHistory();
    const[userDetails,setUserDetails]=useState({
        firstName: "",
        lastName: "",
        gendeer: "",
        email: "",
        mobNumber: "",
        password: "",
        addressLineOne: "",
        addressLineTwo: "",
        id: 0
      });

    const Home=()=>{
      history.push('/Login');
    }

    var inputTxt=(args)=>{
      //    debugger; 
          var copy={...userDetails};
          copy[args.target.name]=args.target.value;
          setUserDetails(copy)  
         
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
   
        
    var register=()=>{
      if(userDetails.firstName!=""&&userDetails.lastName!=""&&userDetails.gendeer!=""&&userDetails.email!=""&&userDetails.mobNumber!=""&&userDetails.password!=""&&userDetails.addressLineOne!=""&&userDetails.addressLineTwo!=""){
      
      var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>{
           // debugger;
            if(helper.status===200&&helper.readyState===4){
               //console.log("data added successfully");
               
               setUserDetails({
                firstName: "",
                lastName: "",
                gendeer: "",
                email: "",
                mobNumber: "",
                password: "",
                addressLineOne: "",
                addressLineTwo: "",
                id: 0
              });
                toast.success("Registered Successfully!!!     Please wait Redirecting......", {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                window.setTimeout(()=>{
                
                  history.push('/');
              },2000);
            }
        }
        helper.open("POST","http://localhost:7070/patient");
        helper.setRequestHeader("Content-Type","application/json")
        helper.send(JSON.stringify(userDetails));
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
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="firstName"  value={userDetails.firstName} onChange={inputTxt}/>
      <label for="floatingInput">first Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="lastName" required value={userDetails.lastName} onChange={inputTxt}/>
      <label for="floatingInput">last Name</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="gendeer" required value={userDetails.gendeer} onChange={inputTxt}/>
      <label for="floatingInput">gender</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" required value={userDetails.email} onChange={inputTxt}/>
      <label for="floatingInput">Email address</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="number" class="form-control" id="floatingPassword" placeholder="name@example.com" name="mobNumber" required='required'  value={userDetails.mobNumber} onChange={inputTxt}/>
      <label for="floatingPassword">Mobile Number</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com" name="password" required  value={userDetails.password} onChange={inputTxt}/>
      <label for="floatingPassword">Password</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineOne"  required value={userDetails.addressLineOne} onChange={inputTxt}/>
      <label for="floatingInput">Address Line One</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineTwo" required  value={userDetails.addressLineTwo} onChange={inputTxt}/>
      <label for="floatingInput">Address Line Two</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={register}>Register</button>
    <br></br>
    <br/><br/>
</main>
</div>
</center>
<ToastContainer /> 
        </>
     );
}

export default RegisterPatient;