import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/logo.png";
import Desain from "../assets/Jumbotron.png";
import "../landingPages.css";
import { Container, Col, Row, Card, Navbar, Nav } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import NavbarUser from "../components/navbar";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

function LandingPages() {
  const [state, dispatch] = useContext(Usercontext);

  const navigate = useNavigate();

  const [user, setUser] = React.useContext(Usercontext);

  const [dataproduct, setDataproduct] = useState([]);

  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);
  console.log(dataproduct);

  const productfilter = dataproduct.filter((item) => {
        return item.stock > 1
      })

      console.log(productfilter);

  const movetoDetail = (id) => {
    navigate("/product/" + id);
  };

  let subscribe = state.isLogin;
  console.log(subscribe);

  console.log(state);

  return (
    <div>
      {subscribe ? (
            <NavbarUser  />
          ) : (
            <Navbar className="d-flex justify-content-between sticky-top p-3">
              <Nav className="">
                <img className="ms-5" style={{ width: "120px" }} src={Logo} alt="" />
              </Nav>
              <Nav className="">
                <div>
                  <div>
                    <AuthModal />
                  </div>
                </div>
              </Nav>
            </Navbar>
          )}
      <div>
        <Container className="">
          
        </Container>
      </div>
      <div>
        <Container className="mt-5">
          <div className="m-5">
            <img
              style={{width: "100%" }}
              src={Desain}
              alt=""
            />
          </div>
          <div className="m-5">
            {/* <div style={{ color: "#BD0707" }}>
              <h1 className="">Let's order</h1>
            </div> */}
            
              {/* {dataproduct.map((item, index) => (
                <div className="d-flex mt-3 justify-content-center">
                <Card
                  key={index}
                  className="me-2"
                  style={{
                    width: "19rem",
                    backgroundColor: "#ff8d71",
                    
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ cursor: "pointer" }}
                    onClick={() => movetoDetail(item?.id)}
                  />

                  <Card.Body>
                    <Card.Title style={{ color: "#BD0707", fontSize: "100%" }}>
                      {item.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#BD0707", fontSize: "1vw" }}><b>Stock :</b>{item?.stock}</Card.Text>
                    <Card.Text style={{ color: "#BD0707", fontSize: "1vw" }}>{convertRupiah.convert(item?.price)}</Card.Text>
                    
                  </Card.Body>
                </Card>
                </div>
              ))} */}
            </div>
            <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row className="">
        {productfilter.map((item, index) => (
          <Col key={index} xs={12} md={4}>
          <Card
                  className="m-1"
                  style={{
      
                    backgroundColor: "#F7D6D0",
                    
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ cursor: "pointer" }}
                    onClick={() => movetoDetail(item?.id)}
                  />

                  <Card.Body>
                    <Card.Title style={{ color: "#BD0707", fontSize: "100%" }}>
                      {item.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#BD0707", fontSize: "90%" }}><b>Stock :</b>{item?.stock}</Card.Text>
                    <Card.Text style={{ color: "#BD0707", fontSize: "90%" }}>{convertRupiah.convert(item?.price)}</Card.Text>
                    
                  </Card.Body>
                </Card>
        </Col>
        ))}
        
      </Row>

      
    </Container>
          
        </Container>
      </div>
    </div>
  );
}

export default LandingPages;
