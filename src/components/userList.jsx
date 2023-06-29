import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListUser = () => {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/react-crud-php/api/user.php"
      );
      if (response.data.result) {
        setEmpty(response.data.result);
        setUserData("");
      } else {
        setUserData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost/react-crud-php/api/user.php/${id}`
      );
      setMessage(response.data.success);
      getUserData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        {/* Display empty message */}
        <p className="text-center text-warning">{empty && empty}</p>

        {/* Display success message */}
        <div
          className={message && "alert alert-info alert-dismissible fade show"}
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

        {/* Display user data table */}
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
              {userData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.mobile}</td>
                  <td>
                    {/* Edit user button */}
                    <Link
                      to={"/edit-user/" + data.id}
                      className="btn btn-primary mx-2"
                    >
                      Edit
                    </Link>

                    {/* Delete user button */}
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
