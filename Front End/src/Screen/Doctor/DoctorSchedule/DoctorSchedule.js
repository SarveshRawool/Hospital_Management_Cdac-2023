import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function SetDoctorSchedule() {
    const history=useHistory()
    const[intime,setIntime]=useState();
    const[outtime,setOuttime]=useState();

    const [schedule,SetDoctorSchedule]=useState({
                                                    officeInTime: {
                                                      hour: 0,
                                                      minute: 0,
                                                      second: 0,
                                                      nano: 0
                                                    },
                                                    officeOutTime: {
                                                      hour: 0,
                                                      minute: 0,
                                                      second: 0,
                                                      nano: 0
                                                    },
                                                    id: 0
                                                  });
    const id= window.sessionStorage.getItem("userId");

    //   useEffect(()=>{
    //     var helper=new XMLHttpRequest;
    //     helper.onreadystatechange=()=>{
    //     if(helper.readyState==4&&helper.status==200){
    //     var data=JSON.parse(helper.responseText);     
    //     console.log(data);
    //     //setDoctorDetails(data);
    //     }
    //     };
    //     helper.open('GET','http://localhost:7070/doctor/{did}?hID='+id);
    //     helper.setRequestHeader("Content-Type","application/json");
    //     helper.send();
    //   },[]);

    const Home=()=>{
        history.push('/DoctorHome');
      }
    
    const add=()=>{
      toast.success("Updated Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/DoctorHome');
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
          
        
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            
          </ul>
        </div>
      </div>
    </nav>
    <div className="container" style={{marginTop:40}}>
        <div className="table-responsive text-center">
            <h2>Set Your In And Out Time</h2>
        <table className="table">
            <tr>
                <td><h4>In Time</h4></td>
                <td><h4><input type="time" value={intime} className="form-control"></input></h4></td>
                {/* <td><h4>
                <label for="date">Enter Out Tme :</label>
                <input type="date" name="date" id="date" pattern="\d{4}-\d{2}-\d{2}"></input>
                </h4></td> */}
            </tr>
            <tr>
                <td><h4>Out Time</h4></td>
                <td><h4><input type="time" value={outtime} className="form-control"></input></h4></td>
                {/* <td><h4>
                <label for="date">Enter Out Tme :</label>
                <input type="date" name="date" id="date" pattern="\d{4}-\d{2}-\d{2}"></input>
                </h4></td> */}
            </tr>
           
            <tr>
                <td><br></br></td>
            </tr>
            <tr>
                <td colSpan={2}><button className="btn btn-success" style={{width:200}} onClick={add}>Submit</button></td>
            </tr>
        </table>
        </div></div>
        <ToastContainer />
        </>
    );
}

export default SetDoctorSchedule;