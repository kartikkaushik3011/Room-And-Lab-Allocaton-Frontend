import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import formImage from "./assets/abes-logo.png"

function Book() {
  const { room_no, block_code, place, slot, day } = useParams();
  const [formData, setFormData] = useState({ faculty_name: "", subject_code: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.faculty_name || !formData.subject_code) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    axios
      .post(`/book/${place}/${block_code}/${room_no}/${day}/${slot}`, formData)
      .then(() => {
        setFormData({ faculty_name: "", subject_code: "" });
        navigate(`/confirmation/${place}/${block_code}/${room_no}/${day}/${slot}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while booking. Please try again.");
      });
  };

  return (
    <div className="row justify-content-center" style={{ width: "100%", marginTop: "4vh" }}>
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-3 text-center" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)', borderRadius: "10px" }}>
            <div className="md-5 pb-2" >
              <form onSubmit={handleSubmit}>
                <img className='pb-2' src={formImage} alt="ABES" />
                <h1 className="fw-bold mb-3">Enter Details:</h1>
                <div className="form-outline mb-4 mt-5">
                  <input type="text"
                    placeholder="Faculty Name"
                    name="faculty_name"
                    value={formData.faculty_name}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-outline mb-5">
                  <input type="text"
                    placeholder="Subject Code / Purpose"
                    name="subject_code"
                    value={formData.subject_code}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <button className="btn btn-outline-dark btn-lg btn-rounded px-5 mb-2" type="submit">Book</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
