import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, userUpdate } from "../actions/user-actions";
import { updateUserReducerActions } from "../reducers/updateUserSlice";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const updateUser = useSelector((state) => state.updateUser.user);
  const { loading: loadingUpdate, success, error: errorUpdate } = updateUser;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        dispatch(updateUserReducerActions.updateUserReset());
        history.push("/admin/userslist");
      } else {
        // Get user info
        if (!user.name || userId !== user._id) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, user, userId, success]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userUpdate({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update User</h1>
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Check
                checked={isAdmin}
                type="checkbox"
                label="Is Admin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
