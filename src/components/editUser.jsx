import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    mobile: "",
  });
  const [error, setError] = useState({
    email: "",
    mobile: "",
  });
  // Function to handle input changes
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch user data to pre-fill the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/react-crud-php/api/user.php/${id}`
        );
        setFormValue(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: id,
      username: formValue.username,
      email: formValue.email,
      mobile: formValue.mobile,
    };

    try {
      const res = await axios.put(
        "http://localhost/react-crud-php/api/user.php",
        formData
      );
      if (res.data.success) {
        setResponse(res.data.success);
        setTimeout(() => {
          navigate("/user");
        }, 2000);
      } else {
        setError({ email: res.data.email, mobile: res.data.mobile });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center vh-100">
        <div className="col-md-4">
          {/* Display response message */}
          {response && (
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
              {response}
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center p-3">Edit</h4>
              {/* Form */}
              <form method="post" autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-user" />
                  </span>
                  {/* Username input */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Username"
                    value={formValue.username}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  {/* Email input */}
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={formValue.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-mobile-retro" />
                  </span>
                  {/* Mobile input */}
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    className="form-control"
                    placeholder="Mobile"
                    pattern="^[6-9]\d{9}$"
                    maxLength={10}
                    value={formValue.mobile}
                    onChange={handleInput}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  {/* Submit button */}
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-success w-40"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          {Object.keys(error).map((key) => {
            return (
              error[key] && (
                <div
                  className="alert alert-info alert-dismissible fade show mt-2"
                  role="alert"
                  key={error[key]}
                >
                  {error[key]}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EditUser;