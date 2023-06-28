import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListUser = () => {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState(null);
  const getUserData = async () => {
    const request = await fetch("http://localhost/react-crud-php/api/user.php");
    const response = await request.json();
    if (response.result) {
      setEmpty(response.result);
    } else {
      setUserData(response);
    }
  };
  const handleDelete = async (id) => {
    const del = await axios.delete(
      `http://localhost/react-crud-php/api/user.php/${id}`
    );
    setMessage(del.data.success);
    getUserData();
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <p className="text-center text-warning">{empty && empty}</p>
          <div
            className={
              message && "alert alert-info alert-dismissible fade show"
            }
            role="alert"
          >
            {message}
            {message && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            )}
          </div>
          {userData.length > 0 && (
            <table className="table table-bordered table-striped" id="myTable">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.mobile}</td>
                      <td>
                        <Link
                          to={"/edit-user/" + data.id}
                          className="btn btn-primary mx-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
