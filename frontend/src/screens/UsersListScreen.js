import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUsersList, deleteUser } from "../actions/user-actions";

const UsersListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const usersList = useSelector((state) => state.usersList);
  const { loading, users, error } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history]);

  const deleteUserHandler = (userId) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    variant="light"
                    size="sm"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    onClick={deleteUserHandler.bind(this, user._id)}
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

export default UsersListScreen;
