import React,{useContext} from "react";
import NavbarUser from "../components/navbar";
import { DataProfil } from "../datadummy/dataprofil";
import { Container, Col, Row } from "react-bootstrap";
import { DataTransaction } from "../datadummy/datatransaction";
import Transaction from "../components/Transaction";
import { Usercontext } from "../context/usercontext";

function Profile() {
  let { data } = DataTransaction;
  console.log(data);
  const [state, dispatch] = useContext(Usercontext);
  return (
    <div>
      <NavbarUser />
      <Container className="bodyProfile p-5 ps-5">
        <Row className="ps-5">
          <Col md={6} className="mt-3">
            <h2 className="myprofile mb-4" style={{ color: "#BD0707" }}>
              My Profile
            </h2>
            <Row>
              
              
                  <div>
                    <Row>
                      <Col className="" sm={6}>
                        <img
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "5px",
                          }}
                          src={'https://res.cloudinary.com/dqwv0exem/image/upload/v1662340465/waysbeans/default_wr7jvq.jpg'}
                        />
                      </Col>
                      <Col sm={6}>
                        <div>
                          <h3 style={{ color: "#BD0707" }}>Full Name</h3>
                          <p>{state.user.fullname}</p>
                        </div>

                        <div className="mt-4">
                          <h3 style={{ color: "#BD0707" }}>Email</h3>
                          <p>{state.user.email}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                
              
            </Row>
          </Col>
          <Col md={6} className="mt-3">
            <h2 className="mb-4" style={{ color: "#BD0707" }}>
              My Transaction
            </h2>
            <Transaction />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
