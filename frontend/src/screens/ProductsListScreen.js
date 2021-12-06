import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/product-actions";
import { productCreateReducerActions } from "../reducers/productCreateSlice";

const ProductsListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector(
    (state) => state.productCreate.createProductState
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    dispatch(productCreateReducerActions.productCreateReset());
    if (userInfo && userInfo.isAdmin) {
      if (successCreate) {
        history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts());
      }
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, successCreate, createdProduct]);

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₹ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                    variant="light"
                    size="sm"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    onClick={deleteProductHandler.bind(this, product._id)}
                    variant="danger"
                    size="sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsListScreen;
