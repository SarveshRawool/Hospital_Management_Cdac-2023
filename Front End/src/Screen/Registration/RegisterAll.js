import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RegisterAll() {

    const history=useHistory();


    const RegisterHospital=()=>{
        history.push("/RegisterHospital");
    }

    const RegisterPatient=()=>{
        history.push("/RegisterPatient");
    }

    const Home=()=>{
        history.push("/");
    }

    return ( <>
        <div className="container">
                <div className="table-responsive">
                    <center>
                        <div style={{width:500,height:250,marginTop:200,backgroundColor:'skyblue',borderRadius:10,boxShadow:10}}>
                    <table className="table text-center">
                        <tr>
                            <td><br></br></td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-info" style={{width:400}} onClick={RegisterHospital}>Register Your Hospital</button></td>
                        </tr>
                        <tr>
                            <td><br></br></td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-info" style={{width:400}} onClick={RegisterPatient}>Register As Patient</button></td>
                        </tr>
                        <tr>
                            <td><br></br></td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-warning" style={{width:200}} onClick={Home}>Back To Home</button></td>
                        </tr>
                    </table>
                    </div>
                    </center>
                </div>
        </div>
    </> );
}

export default RegisterAll;