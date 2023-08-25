
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './NavBar.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'

function NavBar() {

    const history=useHistory();
    const [user,setuser]=useState("");

    useEffect(()=>{
        setuser(sessionStorage.getItem("userName"));
    },[]);

    function classToggle() {
      const navs = document.querySelectorAll('.Navbar__Items')
      
      navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    }
    
    // document.querySelector('.Navbar__Link-toggle')
    //   .addEventListener('click', classToggle);

    const Login=()=>{
        if(user==null){
            history.push('/Login');
        }
        else if(user==""){
            history.push('/Login');
        }
       else if(user=="Doctor"){
            history.push('/DoctorHome');
        }
        else if(user=="Hospital"){
          history.push('/HospitalHome');
      }
        else if(user=="Patient"){
            history.push('/PatientHome');
        }
        else if(user=="Admin"){
          history.push('/AdminHome');
      }
    }

    return ( <>
 {/* <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-3 me-0" href="#"><img src="http://localhost:3000/Imgs/logo.png" width="150" height="100" /></a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active">Contact Us</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
          <div class="header-right-mid"><button className='btn' onClick={Login}><i class="fa-solid fa-user"></i> {user}</button></div>
          </div>
        </div>
      </div>
    </nav>  */}
      
   

    <nav className="navbar  navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src="http://localhost:3000/Imgs/logo.png"
            width="130"
            height="100"
            className="d-inline-block align-top"
            alt=""
          />
          <Link to="/" className="navbar-brand">
            <i>
              <b className="text-color">Welcome To True Life Care</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">Contact Us</b>
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li className="nav-item"> 
        <div className="nav-link active" aria-current="page" ><button className='btn' onClick={Login}><i class="fa-solid fa-user"></i> {user}</button></div>
      </li>
    </ul>
          </div>
        </div>
      </nav>

    </>         
     );
}

export default NavBar;