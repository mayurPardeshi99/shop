import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/product-actions.js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { productReviewCreateReducerActions } from "../reducers/productReviewCreateSlice";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productReviewCreate = useSelector(
    (state) => state.productReviewCreate.createReviewState
  );
  const { success: successCreateReview, error: errorCreateReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch(productReviewCreateReducerActions.productReviewCreateReset());
    }
    dispatch(productReviewCreateReducerActions.productReviewCreateReset());
    dispatch(listProductDetails(id));
  }, [id, dispatch, successCreateReview]);

  const qtySubmitHandler = (event) => {
    setQty(event.target.value);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col sm={6} md={12} xl={5} className="m-auto">
                          Quantity:
                        </Col>
                        <Col sm={6} md={12} xl={7} className="me-auto">
                          <Form.Select value={qty} onChange={qtySubmitHandler}>
                            {[...Array(product.countInStock).keys()].map(
                              (e) => (
                                <option key={e + 1} value={e + 1}>
                                  {e + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={addToCartHandler}
                        className="btn btn-dark"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={8}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 ? (
                <Message>No Reviews</Message>
              ) : (
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <h5>{review.name}</h5>
                      <Rating value={review.rating} />
                      <p className="text-muted">
                        <small>{review.createdAt.substring(0, 10)}</small>
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <h2>Write a Customer Review</h2>
              {errorCreateReview && (
                <Message variant="danger">{errorCreateReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={reviewSubmitHandler}>
                  <Row className="my-2">
                    <Col sm={2} className="m-auto">
                      Rating :
                    </Col>
                    <Col sm={10} className="m-auto">
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row className="my-2">
                    <Col sm={2} className="m-auto">
                      Comment :
                    </Col>
                    <Col sm={10} className="m-auto">
                      <Form.Control
                        value={comment}
                        as="textarea"
                        style={{ height: "100px" }}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Button className="mt-2" type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please{" "}
                  <Link to="/login">
                    <u>sign in</u>
                  </Link>{" "}
                  to write a review.
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
