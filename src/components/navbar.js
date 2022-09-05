import React, { useContext, useState } from "react";
import bucket from "../assets/cart.png";
import Logo from "../assets/logo.png";
import { Container, Navbar, Nav, Dropdown, Col, Row } from "react-bootstrap";
import { DataProfil } from "../datadummy/dataprofil";
import Logout from "../assets/logout.png";
import User from "../assets/user.png";
import Triangle from "../assets/triangle.svg";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import { API } from "../config/api";
import { useEffect } from "react";

function NavbarUser({ show }) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(Usercontext);
  const [qty, setQty] = useState([null])

  useEffect(() => {
    const data = async () => {
      try {
        const response = await API.get("/carts-id");

        setQty(response.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [setQty]);
  console.log(qty);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleHome = () => {
    navigate("/");
  };



  return (
    
      
        
          <Navbar className="d-flex justify-content-between sticky-top ps-3">
            <Nav className="">
              <img
                onClick={handleHome}
                style={{ width: "120px" }}
                src={Logo}
                alt=""
                className="ms-5"
              />
            </Nav>
            <Nav className="">
              <div>
                <div>
                  <img onClick={handleCart} src={bucket} />
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "120px",
                    }}
                  >
                    {qty}
                  </span>

                  {DataProfil.map((item, index) => {
                    return (
                      <span>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="none"
                            id="dropdown-basic"
                            style={{ border: "none" }}
                          >
                            <img
                              className="profilAccount ms-4"
                              src={'https://res.cloudinary.com/dqwv0exem/image/upload/v1662340465/waysbeans/default_wr7jvq.jpg'}
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            style={{
                              boxShadow: "0px 2px 12px",
                            }}
                          >
                            <img
                              src={Triangle}
                              alt=""
                              style={{
                                position: "absolute",
                                width: "25px",
                                top: "-17px",
                                right: "25px",
                                dropShadow: "0 0 4px",
                              }}
                            />
                            <Dropdown.Item onClick={handleProfile}>
                              <img src={User} alt="" className="me-1" />
                              Profile
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={handleLogout}>
                              <img src={Logout} alt="" className="ms-2 me-1" />
                              Log Out
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
                    );
                  })}
                </div>
              </div>
            </Nav>
          </Navbar>
      
    
  );
}

export default NavbarUser;
