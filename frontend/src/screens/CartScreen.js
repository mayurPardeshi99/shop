import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../hooks/useQuery";
import { addToCart, removeFromCart } from "../actions/cart-actions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";

const CartScreen = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  const qty = query.get("qty") ? Number(query.get("qty")) : 1;
  const { id: productId } = useParams();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // Not from course video
    // for change /cart/:prouctId?qty=1 to /cart beacause if page refresh it sets qty to 1 always
    history.replace("/cart");
  }, [qty, productId, dispatch, history]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link className="m-auto" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>₹ {item.price}</Col>
                  <Col md={3}>
                    <Form.Select
                      className="px-1"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((e) => (
                        <option key={e + 1} value={e + 1}>
                          {e + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      onClick={removeFromCartHandler.bind(this, item.product)}
                      type="button"
                      variant="light"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  onClick={checkoutHandler}
                  className="btn btn-dark"
                  type="button"
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
