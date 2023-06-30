import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"
function Footer() {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className='midFooter'>
                <h1>ECoMMERCE.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; StackyAshish</p>
            </div>
            
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href="https://www.instagram.com/ayenurkar/">Instagram</a>
                <a href="https://www.facebook.com/ashish.yenurakar/">Facebook</a>
                <a href="https://www.linkedin.com/in/ashish-yenurkar-b472071ab/">Linkdin</a>
            </div>
      </footer>
  )
}

export default Footer