import React, { useContext } from "react";
import Logo from "../assets/logo.png";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import Logout from "../assets/logout.png";
import Product from "../assets/product.png";
import Topping from "../assets//topping.png";
import { DataProfil } from "../datadummy/dataprofil";
import Triangle from "../assets/triangle.svg";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import ProductList from "../assets/productlist.png";
import ToppingList from "../assets/toppinglist.png";

function NavbarAdmin() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(Usercontext);

  const handleLogout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };
  const handleAddTopping = () => {
    navigate("/addTopping");
  };
  const handleProduct = () => {
    navigate("/productadmin");
  };
  const handleHome = () => {
    navigate("/admin");
  };
  const handleToppings = () => {
    navigate("/toppings");
  };

  return (
    
      
        
          <Navbar className="d-flex justify-content-between sticky-top ps-3 ">
            <Nav className="">
              <img
                onClick={handleHome}
                style={{ width: "70px" }}
                src={Logo}
                alt=""
              />
            </Nav>
            <Nav className="me-5">
              <div className="me-4">
                <div>
                  {DataProfil.map((item, index) => {
                    return (
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
                          <Dropdown.Item onClick={handleAddProduct}>
                            <img
                              src={Product}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Add Product
                          </Dropdown.Item>
                          <br />
                          
                          <Dropdown.Item onClick={handleProduct}>
                            <img
                              src={ProductList}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Product List
                          </Dropdown.Item>
                          <br />
                      
                          <Dropdown.Item onClick={handleLogout}>
                            <img src={Logout} alt="" className="ms-2 me-1" />
                            Log Out
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    );
                  })}
                </div>
              </div>
            </Nav>
          </Navbar>
        
      
    
  );
}

export default NavbarAdmin;
