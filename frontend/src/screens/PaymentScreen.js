import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cart-actions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const dispatch = useDispatch();
  const history = useHistory();

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="PayPal or Credit Card"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {/* <Form.Check
              className="my-2"
              type="radio"
              label="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> */}
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
