
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function EditHospitalDetails() {
    const history=useHistory();
    const [selectedImage, setSelectedImage] = useState(null);
    var id= window.sessionStorage.getItem("userId");
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

    useEffect(()=>{
      var helper=new XMLHttpRequest;
      helper.onreadystatechange=()=>{
          if(helper.readyState==4&&helper.status==200){
              var data=JSON.parse(helper.responseText);     
              console.log(data);
              sethospitalDetails(data);
          }
      };
      helper.open('GET','http://localhost:7070/hospital/ById?hID='+id);
      helper.setRequestHeader("Content-Type","application/json");
      helper.send();
  },[]);

  // const uploadImage=(file)=>{
  //   var helper=new XMLHttpRequest();
  //       helper.onreadystatechange=()=>{
  //          // debugger;
  //           if(helper.status===201&&helper.readyState===4){
  //              //console.log("data added successfully");
  //              setSuccess("Image added successfully");
  //               window.setTimeout(()=>{
  //                 setSuccess("");
  //             },3000);
  //           }
  //       }
  //       //http://localhost:7070/hospital/images/1
  //       helper.open("POST","http://localhost:7070/hospital/images/"+id);
  //       helper.setRequestHeader("Content-Type","multipart/form-data");
  //       const data = new FormData();
  //       data.append("image",file,file.name);
  //       helper.send(JSON.stringify(data));
  // }

  const uploadImage=(event)=>{
  event.preventDefault();

  const formData = new FormData();
  formData.append("imageFile", selectedImage);

  axios
    .post("http://localhost:7070/hospital/images/"+id, formData)
    .then((result) => {
      
        console.log(result);
        toast.success("Image Added Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    })
    .catch(error => {
      toast.error("Image Uploading failed!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }

    const Home=()=>{
        history.push("/HospitalHome");
    }

  const edit=()=>{
      var helper=new XMLHttpRequest();
      helper.onreadystatechange=()=>{
         // debugger;
          if(helper.status===202&&helper.readyState===4){
             sethospitalDetails({
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
              toast.success("Information Updated Successfully!!!", {
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
          console.log("data added unsccessfully");
      }
      helper.open("PUT","http://localhost:7070/hospital");
      helper.setRequestHeader("Content-Type","application/json")
      helper.send(JSON.stringify(hospitalDetails));
    }
    var inputTxt=(args)=>{
      //    debugger; 
          var copy={...hospitalDetails};
          copy[args.target.name]=args.target.value;
          sethospitalDetails(copy)  
         
          }

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
          <div class="navbar-brand col-lg-1 me-0 " aria-current="page"></div>
        
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
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="hospitalName"  value={hospitalDetails.hospitalName} onChange={inputTxt}/>
      <label for="floatingInput">Hospital Name</label>
    </div>
    <br></br>

    <div class="form-floating">
      <textarea class="form-control" id="floatingInput" placeholder="name@example.com" name="hospitalInfo" value={hospitalDetails.hospitalInfo} onChange={inputTxt}></textarea>
      {/* <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="hospitalInfo" value={hospitalDetails.hospitalInfo} onChange={inputTxt}/> */}
      <label for="floatingInput">About Your Hospital</label>
    </div>
    <br></br>
    
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineOne" value={hospitalDetails.addressLineOne} onChange={inputTxt}/>
      <label for="floatingInput">Address Line One</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="addressLineTwo"  value={hospitalDetails.addressLineTwo} onChange={inputTxt}/>
      <label for="floatingInput">Address Line Two</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={hospitalDetails.email} onChange={inputTxt}/>
      <label for="floatingInput">Email address</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="name@example.com" name="mobNumber"  value={hospitalDetails.mobNumber} onChange={inputTxt}/>
      <label for="floatingPassword">Mobile Number</label>
    </div>
    <br></br>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com" name="password"  value={hospitalDetails.password} onChange={inputTxt}/>
      <label for="floatingPassword">Password</label>
    </div>
    <br></br>

    <div class="form-floating">
    Upload Image : 
      <input
        type="file"
        id="image"
        name="image"
        // onChange={(e) => setSelectedImage(e.target.files[0])}
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    {/* <label for="floatingInput">Upload Image</label> */}
    </div>
    <br></br>

    <button class="btn btn-primary  py-2" style={{width:100}} onClick={uploadImage}>Upload</button>
    <br></br><br></br>

    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput" name="workingDays" placeholder="name@example.com" value={hospitalDetails.workingDays} onChange={inputTxt}/>
      <label for="floatingInput">Working Days</label>
    </div>
    <br></br>

    <button class="btn btn-primary w-100 py-2" onClick={edit}>Save</button>
    <br></br>
    <br/><br/>
    <ToastContainer />
</main>
</div>
</center>
        </> );
}

export default EditHospitalDetails;