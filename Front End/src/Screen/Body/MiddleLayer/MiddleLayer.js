
import { useEffect, useState } from 'react';
import './MiddleLayer.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
//import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'

function MiddleLayer() {

    const [hospitalDetails,sethospitalDetails]=useState([]);
    const history=useHistory();

    const GotoDetails=(id)=>{
        window.sessionStorage.setItem("hId",id);
        history.push('/ViewHospital');
    }
    useEffect(()=>{
        var helper=new XMLHttpRequest;
        helper.onreadystatechange=()=>{
            if(helper.readyState==4&&helper.status==200){
                var data=JSON.parse(helper.responseText);     
                console.log(data);
                sethospitalDetails(data);
            }
        };
        helper.open('GET','http://localhost:7070/hospital/status/active');
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
    },[]);


    return ( 
        <> 
        <div className="container marketing" style={{marginTop:20}}>
                 <div className="row">
                 {
                    hospitalDetails.map((hospital,index)=>{
                        var src='http://localhost:7070/hospital/images/'+hospital.id;
                        return <>
                                 <div className="col-lg-4">
                                    <img className="img-circle imgs"  src={src} alt="Image Not Yet Uploaded" width="200" height="140" id='101' style={{marginLeft:10}}  onClick={GotoDetails}/>
                                    <h2 style={{margin:20,textAlign:'center'}}>{hospital.hospitalName}</h2>
                                    
                                    <div class="overflow-auto p-3  tool" style={{maxWidth : '100%', maxHeight: 150,overflowY: 'hidden',color:'black',backgroundColor:'skyblue'}}>
                                        <p class="text-justify">{hospital.hospitalInfo}</p>
                                    </div>
                                    <div className="btn btn-info" style={{margin:20}} onClick={()=>{GotoDetails(hospital.id)}}>View details &raquo;</div>
                                 </div>
                        </>
                    })
                }
            </div> 
           </div>
        </>
     );
}

export default MiddleLayer;