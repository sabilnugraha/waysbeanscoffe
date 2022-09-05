import React, { useState, useEffect } from "react";
import NavbarUser from "../components/navbar";
import { Products } from "../datadummy/dataProduct";
import { Topping } from "../datadummy/Topping";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import { useMutation } from "react-query";
import { Usercontext } from "../context/usercontext"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function DetailProduct() {
  const [addCart, setAddCart] = useState(null);
  console.log(addCart);

  const [state] = useContext(Usercontext)
  let navigate = useNavigate()
  
  const UserID = state.user.id
  console.log(UserID)
  const { id } = useParams();

  const [dataproduct, setDataproduct] = useState([]);

  const [check, setCheck] = useState([])

  

  

  // const sum = prices.reduce((prev, next) => prev + next, 0);
  // setTotal(sum);
  // console.log(total);

  

  const response = dataproduct;
  console.log(response);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await API.get("/carts-id");

        setCheck(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [setCheck]);
  console.log(check);

 const idCart = new Array(check);
 console.log(idCart);
  
    useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/product/" + id)

        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  
  
  

  // const handleOnChange = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item
  //   );

  //  setCheckedState(updatedCheckedState);

  //


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        Headers: {
          "Content-type": "application/json"
        },
      };
      const body = JSON.stringify({
        
        Product_ID : parseInt(id),
      })

      const response = await API.post("/cart", body, config);
      console.log(body);
      console.log(response);
      navigate("/cart")
      
      
    } catch (error) {
      console.log(error);
    }
  })

  
  

  return (
    <div>
      <NavbarUser show={addCart} />
      <Container className="pe-5 ps-5" style={{ margin: "3% 9% 9% 9%" }}>
        <Row className="">
          <Col md={5}>
            <img style={{ width: "100%" }} src={response?.image} />
          </Col>

          <Col md={7}>
            <Row>
              <Col md={12} className="mt-3">
                <div>
                  <h1 style={{ color: "brown" }}>{response?.name}</h1>
                  <h4 style={{ color: "brown" }}> Stock : {response?.stock} </h4>
                </div>
              </Col>
              <Col md={12} className="mt-5">
                <p style={{ color: "brown" }}>{response?.desc}</p>
                

                <Row className="mt-5 mb-5 ">
                  <Col xs={6} md={6}>
                    <div>
                      <h5 style={{ color: "#BD0707" }}>Price</h5>
                    </div>
                  </Col>
                  <Col xs={6} md={6}>
                    <div className="d-flex justify-content-end">
                      <h5>{convertRupiah.convert(response?.price)}</h5>
                    </div>
                  </Col>
                </Row>
                <Col xs={12} md={12}>
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "brown",
                      color: "white",
                      borderRadius: "5px",
                      borderColor: "brown",
                    }}
                    onClick={(e) => handleSubmit.mutate(e) }
                  >
                    Add Cart
                  </button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
