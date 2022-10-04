import React from "react";
import { Col, Row } from "react-bootstrap";
import { DataTransaction } from "../datadummy/datatransaction";
import Barcode from "../assets/barcode.png";
import Logo from "../assets/logo.png";
import convertRupiah from "rupiah-format";
import { useEffect } from "react";
import { API } from "../config/api";
import { useState } from "react";
import dateFormat from 'dateformat';

export default function Transaction() {
  const countTotal = (items) =>
    items.reduce((acc, curr) => acc + curr.price, 0);

  const jumlah = countTotal(DataTransaction);

  const [cartdata, setCartdata] = useState([])
  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/user-transaction");
        setCartdata(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setCartdata]);
  console.log(cartdata);
  return (
    <Row
      
    >
      
        {cartdata.map((item, index) => {
          

          return (
            <>
            <Row className="p-2 mt-2 cartTrans"  >
              <div key={index}>
              
              <div className="cartTransaction" key={index} style={{
        padding: "10px"
      }} >
        <Row>
        <Col sm={9}>{item.carts.map((cart, index) => {
                return(
                  
        <div className="mt-1" >
          <Row>
        <Col xs={6} md={6}>
          <img
                  className="bg-secondary"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  src={cart?.product?.image} />
        </Col>
        <Col xs={6} md={6}>
          <p style={{fontSize: "15px",
        color: "#BD0707"}}><strong>{cart?.product?.name}</strong></p>
      <p style={{fontSize: "13px",
        color: "#BD0707"}}><b>{dateFormat(cart?.updated_at, 'dddd,')}</b>  {dateFormat(cart?.updated_at, 'd mmmm yyyy')} </p>
        <span style={{fontSize: "13px",
        color: "#BD0707"}}><strong>Qty</strong></span><span> :</span>
        <span style={{fontSize: "13px",
        color: "#BD0707"}}><strong>{cart?.qty}</strong></span>
        
        <p style={{fontSize: "15px",
        color: "#BD0707"}}>Price : {convertRupiah.convert(cart?.product?.price)}</p><span style={{fontSize: "15px",
        color: "#BD0707"}}></span>
        </Col>
        
      {/* <Col xs={6} md={4}>
          xs=6 md=4
        </Col> */}
        </Row>
                    
                    </div>
                  
                )
              })}</Col>
        <Col sm={3}>
          <div>
          <img
          style={{ width: "50%", height: "auto" }}
        
          src={Logo}
        />
        </div>
        <div>
        <img
          className="mt-4"
          style={{ width: "50%", height: "auto" }}
          src={Barcode}
        />
        </div>
        <p className="statusTransaction mt-2" >{item.status}</p>
        
        <p className="miniText" style={{
        color: "#BD0707"}}><b>Total: {convertRupiah.convert(item.total)}</b></p>
        <p className="miniText"></p>
        </Col>
      </Row>
              
              
              </div>
              
              </div>
            </Row>
            </>
          );
        })}
      
      <Col md={3}>
        
      </Col>
    </Row>
  );
}