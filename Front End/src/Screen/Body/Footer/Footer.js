import './Footer.css'

function Footer() {
    return ( 
        <div className="footer row">
	<div className="footer-parts">
    	<div className="footer-parts-h4">Get In Touch</div>
        <ul>
            <li><a href="#"><i className="fa fa-phone"></i>&nbsp; +91-9963XXXX68</a></li>
            <li><a href="mailto:info@freetimelearning.com"><i className="fa fa-envelope"></i>&nbsp; info@freetimelearning.com</a></li>
        </ul>
    </div>
    <div className="footer-parts">
    	<div className="footer-parts-h4">Extra Links</div>
    	<ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
        </ul>
    </div>
    <div className="footer-parts">
    	<div className="footer-parts-h4">Extra Links</div>
    	<ul>
            <li><a href="#">Appointments</a></li>
            <li><a href="#">Find a Doctor</a></li>
        </ul>
    </div>
    <div className="footer-parts">
    	<div className="footer-parts-h4">Social Links</div><br />
        <div style={{paddingLeft:20,fontSize:22}}>
            <a href="https://www.facebook.com/freetimelearn/" target="_blank"><i className="fa-brands fa-facebook"></i></a> &nbsp; &nbsp;
            <a href="https://www.linkedin.com/in/free-time-learn-07598b143/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a> &nbsp; &nbsp;
            <a href="https://twitter.com/freetimelearn" target="_blank"><i className="fa-brands fa-twitter"></i></a> &nbsp; &nbsp;
            <a href="https://plus.google.com/101612697119159092378" target="_blank"><i className="fa-brands fa-google"></i></a>
        </div>
    </div>
    <div className="clearfix"></div>
    <div className="row copyrights">
    	<div className="copyrights-left">
        &copy; 2018. All rights reserved by <a href="http://www.freetimelearning.com" target="_blank">Sunbeam Students</a>.
        </div>
        <div className="copyrights-right">
        	Designed by <a href="http://www.freetimelearning.com" target="_blank">S B R</a>
        </div>
    </div>
</div>
     );
}

export default Footer;