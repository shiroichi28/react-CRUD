import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const EditUser = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  // Function to handle input changes
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(
          `http://localhost/react-crud-php/api/user.php/${id}`
        );
        setFormValue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    request();
  }, []);
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
          redirect("/user");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-content-center vh-100">
          <div className="col-md-4">
            {/* Display response message */}
            <div
              className={
                response && "alert alert-info alert-dismissible fade show"
              }
              role="alert"
            >
              {response}
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
