import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/product-actions";
import { productUpdateReducerActions } from "../reducers/productUpdateSlice";
import axios from "axios";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productUpdate = useSelector(
    (state) => state.productUpdate.updateProductState
  );
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch(productUpdateReducerActions.productUpdateReset());
        history.push("/admin/productslist");
      } else {
        if (!product.name || productId !== product._id) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setImage(product.image);
          setPrice(product.price);
          setDescription(product.description);
          setCountInStock(product.countInStock);
          setBrand(product.brand);
          setCategory(product.category);
        }
      }
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, product, productId, successUpdate]);

  const uploadImageHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setUploadingError(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        brand,
        category,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                type="number"
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Row>
                <Col md={11}>
                  <Form.Control
                    value={image}
                    type="text"
                    placeholder="Enter Image"
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col md={1} className="my-auto">
                  <a href={image} target="_blank" rel="noopener noreferrer">
                    <i className="far fa-share-square"></i>
                  </a>
                </Col>
              </Row>
              <Form.Control type="file" onChange={uploadImageHandler} />
              <Form.Text className="text-muted">
                Upload product image here then click on update.
              </Form.Text>
              {uploading && <Loader />}
              {uploadingError && (
                <Message variant="danger">
                  Some error occured while uploading image.
                </Message>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={countInStock}
                type="number"
                placeholder="Enter Count In Stock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                type="text"
                placeholder="Enter Brand"
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                type="text"
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                as="textarea"
                style={{ height: "100px" }}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
