import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cart-actions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [state, setState] = useState(
    shippingAddress.state ? shippingAddress.state : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, state, country })
    );
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              type="text"
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="postalcode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              type="text"
              placeholder="Enter postal code"
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              value={state}
              type="text"
              placeholder="Enter state"
              onChange={(e) => setState(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              type="text"
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
