import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";

const Contact = () => {
    return (
      <Fragment>
            <MetaData title={"contact me"}/>
            <div className="contactContainer">
      <a className="mailBtn" href="mailto:ashishyenurkar15@gmail.com">
        <Button>Contact: ashishyenurkar15@gmail.com</Button>
      </a>
    </div>
      </Fragment>
    
  );
};

export default Contact;
