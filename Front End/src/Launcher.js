import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import MainPage from "./Screen/Home/MainPage";
import RegisterAll from "./Screen/Registration/RegisterAll";
import Login from "./Screen/Registration/Login";
import DoctorHome from "./Screen/Doctor/DoctorHome/DoctorHome";
import DoctorAppointments from "./Screen/Doctor/DoctorAppointments/DoctorAppointments";
import UpdateDoctorProfile from "./Screen/Doctor/DoctorProfile/UpdateDoctorProfile";
import SetDoctorSchedule from "./Screen/Doctor/DoctorSchedule/DoctorSchedule";
import DoctorReciept from "./Screen/Doctor/DoctorReciept/DoctorReciept";
import HospitalHome from "./Screen/Hospital/HospitalHome/HospitalHome";
import AddDoctor from "./Screen/Hospital/AddDoctor/AddDoctor";
import ViewAppointments from "./Screen/Hospital/ViewAppointments/ViewAppointments";
import ViewDoctors from "./Screen/Hospital/ViewDoctors/ViewDoctors";
import PatientAppointments from "./Screen/Patient/PatientAppointsments/PatientAppointments";
import PatientHome from "./Screen/Patient/PatientHome/PatientHome";
import TakeAppointments from "./Screen/Patient/TakeAppointments/TakeAppointments";
import EditHospitalDetails from "./Screen/Hospital/EditHospitalDetails/EditHospitalDetails";
import PatientProfile from "./Screen/Patient/PatientProfile/PaitentProfile";
import RegisterPatient from "./Screen/Registration/RegisterPatient";
import ViewHospital from "./Screen/Hospital/viewHospital/viewHospital";
import BookAppointment from "./Screen/Patient/BookAppointment/BookAppointment";
import ViewAllAppointments from "./Screen/Hospital/HospitalHome/ViewAllAppointments";
import ViewReciept from "./Screen/Doctor/viewReciept/viewReciept";
import ViewHospitalReciept from "./Screen/Hospital/ViewHospitalReciept/ViewHospitalReciept";
import ViewPatientReciept from "./Screen/Patient/ViewPatientReciept/ViewPatientReciept";
import AdminHome from "./Screen/Admin/AdminHome/AdminHome";
import AddHospital from "./Screen/Admin/AddHospital/AddHospital";
import ViewAllHospitals from "./Screen/Admin/ViewAllHospitals/ViewAllHospitals";
import EditDeleteDoctor from "./Screen/Hospital/EditDeleteDoctor/EditDeleteDoctor";
import ViewAllDoctors from "./Screen/Hospital/ViewAllDoctors/ViewAllDoctors";
import AboutUs from "./Screen/Body/Info/AboutUs";


function Launcher() {
    return (  
        <>
            <BrowserRouter>
                <Switch>

                <Route exact path="/" component={MainPage}></Route>
                <Route exact path="/about" component={AboutUs}></Route>
                <Route exact path="/Login" component={Login}></Route>
                    <ProtectedRoute exact path="/UserHome" component={MainPage}></ProtectedRoute>
                    <ProtectedRoute exact path="/DoctorHome" component={DoctorHome}></ProtectedRoute>
                    <ProtectedRoute exact path="/DoctorAppointments" component={DoctorAppointments}></ProtectedRoute>
                    <ProtectedRoute exact path="/UpdateDoctorProfile" component={UpdateDoctorProfile}></ProtectedRoute>
                    <ProtectedRoute exact path="/SetDoctorSchedule" component={SetDoctorSchedule}></ProtectedRoute>
                    <ProtectedRoute exact path="/GenerateDoctorReciept" component={DoctorReciept}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewReciept" component={ViewReciept}></ProtectedRoute>

                    <ProtectedRoute exact path="/HospitalHome" component={HospitalHome}></ProtectedRoute>
                    <ProtectedRoute exact path="/AddDoctor" component={AddDoctor}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewAppointments" component={ViewAppointments}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewDoctors" component={ViewDoctors}></ProtectedRoute>
                    <ProtectedRoute exact path="/EditHospitalDetails" component={EditHospitalDetails}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewAllAppointments" component={ViewAllAppointments}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewHospitalReciept" component={ViewHospitalReciept}></ProtectedRoute>
                    <ProtectedRoute exact path="/EditDeleteDoctor" component={EditDeleteDoctor}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewAllDoctors" component={ViewAllDoctors}></ProtectedRoute>
                    <Route exact path="/ViewHospital" component={ViewHospital}></Route>



                    <ProtectedRoute exact path="/PatientHome" component={PatientHome}></ProtectedRoute>
                    <ProtectedRoute exact path="/PatientAppointments" component={PatientAppointments}></ProtectedRoute>
                    <ProtectedRoute exact path="/TakeAppointments" component={TakeAppointments}></ProtectedRoute>
                    <ProtectedRoute exact path="/PatientProfile" component={PatientProfile}></ProtectedRoute>
                    <ProtectedRoute exact path="/BookAppointment" component={BookAppointment}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewPatientReciept" component={ViewPatientReciept}></ProtectedRoute>

                    <ProtectedRoute exact path="/AdminHome" component={AdminHome}></ProtectedRoute>
                    <ProtectedRoute exact path="/AddHospital" component={AddHospital}></ProtectedRoute>
                    <ProtectedRoute exact path="/ViewAllHospitals" component={ViewAllHospitals}></ProtectedRoute>
                    

                    {/* <Route exat path="/" component={Register}></Route> */}
                <Route exact path="/register" component={RegisterAll}></Route>
                <Route exact path="/RegisterPatient" component={RegisterPatient}></Route>
                
                </Switch>
            </BrowserRouter>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default Launcher;