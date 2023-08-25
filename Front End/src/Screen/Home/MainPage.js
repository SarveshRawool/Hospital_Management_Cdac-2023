import Banner from "../Body/Banner/Banner";
import Footer from "../Body/Footer/Footer";
import MiddleLayer from "../Body/MiddleLayer/MiddleLayer";
import NavBar from "../Body/NavBar/NavBar";

function MainPage() {
    const myStyle={
        backgroundImage:`url("http://localhost:3000/Imgs/bg.png")`,
                height:'100%',
                //marginTop:'-70px',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                };
                //style={myStyle}
    return ( 
        <>
        <div  className="bg" >
            <NavBar></NavBar>
            <Banner></Banner>
            <MiddleLayer></MiddleLayer>
            <Footer></Footer>
            </div>
        </>
     );
}

export default MainPage;