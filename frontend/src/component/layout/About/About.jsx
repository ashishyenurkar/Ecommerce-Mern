import React from "react";
import "./aboutSection.css";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Avatar, Button, Typography } from "@mui/material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/ayenurkar/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "12vmax", margin: "2vmax 0" }}
              src="https://w0.peakpx.com/wallpaper/541/346/HD-wallpaper-shinchan-cartoon-naughty.jpg"
              alt="Founder"
            />
            <Typography>Ashish Yenurkar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @stackyAshish. this is my 
              MERN stack Project.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/ashish.yenurakar"
              target="blank"
            >
              <FacebookIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/p/CZKOt3nvWBb/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
