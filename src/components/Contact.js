import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import contacttImg from "../assets/img/contact-img.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Contact = () => {

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  }

  const [formDetails, setFormDetails] = useState(formDetails);
  const [buttonText, setButtonText] = useState('send');
  const [status, setStatus] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);


  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSending(true);
    setButtonText('Sending...')
    let response = await fetch("http://localhost:3000/", {
      method: "POST",
      header: {
        "Content-Type": "Application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
      
    });
    setButtonText("Send");
    let result = response.json();
    setFormDetails(formInitialDetails);

    if (result.code === 200) {
      setStatus({success:true, message: 'Message sent successfully'})
    } else {
      setStatus({success:false, message: 'Message failed to send'})
    }
  
  }

return (
  <section className="skill" id="Contact">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={contacttImg} alt="contacttImg" />
        </Col>
        <Col md={6}>
          <h2>Get In Touch</h2>
          <form>
            <Row>
              <Col sm={6} className={px - 1}>
                <input type="text" value={formDetails.firstName} placeholder="First Name"
                  onChange={(e) => onFormUpdate('firstName', e.target.value)} />
              </Col>
             
              <Col sm={6} className={px - 1}>
                <input type="text" value={formDetails.lastName} placeholder="Last Name"
                  onChange={(e) => onFormUpdate('lastName', e.target.value)} />     </Col>
             
              <Col sm={6} className={px - 1}>
                <input type="email" value={formDetails.email} placeholder="Email Name"
                  onChange={(e) => onFormUpdate('email', e.target.value)} />       </Col>
            
              <Col sm={6} className={px - 1}>
                <textarea rows="6" value={formDetails.message} placeholder="Message Name"
                  onChange={(e) => onFormUpdate('message', e.target.value)} />
                <button type="submit"><span>{buttonText}</span></button>
              </Col>
              {
                status.message && 
                <Col>
                    <p className={status.success === false ? "danger" : "success"}>

                    </p>
                </Col>
              }
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
    <img
      className="backgound-image-left"
      src={colorSharp}
      alt="color sharp"
    />
  </section>
);
};
