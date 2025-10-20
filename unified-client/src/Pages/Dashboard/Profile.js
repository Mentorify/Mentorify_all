import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

// instead of taking userData and image from parent just fetch these here so after updation we can show updated data on the fly
export default function Profile({ userData, image, onImageUploaded, onProfileUpdate }) {
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [editable, setEditable] = useState(userData ? false : true)
  const [userDetails, setUserDetails] = useState({
    name: "",
    Class: "",
    email: "",
    school: "",
    mobile: "",
    city: "",
    state: "",
  })
  //   console.log(userDetails);

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      if (!file) {
        setError("Please select a file")
        return
      }

      // Check file size (500KB limit)
      if (file.size > 500 * 1024) {
        setError("File size must be less than 500KB")
        return
      }

      const formData = new FormData()
      formData.append("testImage", file)
      
      // Unified endpoint for all roles
      const apiEndpoint = "/api/profile/image"

      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      console.log("Image upload response status:", res.status)
      const responseData = await res.json()
      console.log("Image upload response data:", responseData)
      
      if (!res.ok) {
        throw new Error(responseData.Error || responseData.error || res.statusText)
      }
      setFile(null)
      setError(null)
      alert("File uploaded successfully!")
      // Call the callback to refresh the image without page reload
      if (onImageUploaded) {
        setTimeout(() => {
          onImageUploaded()
        }, 500)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDetailsEdit = async (e) => {
    e.preventDefault()
    try {
      const name =
        userDetails.name.length === 0 ? (userData.name || "") : userDetails.name
      const mobile =
        userDetails.mobile.length === 0 ? (userData.mobile || "") : userDetails.mobile
      const email =
        userDetails.email.length === 0 ? (userData.email || "") : userDetails.email
      const state =
        userDetails.state.length === 0 ? (userData.state || "") : userDetails.state
      const city =
        userDetails.city.length === 0 ? (userData.city || "") : userDetails.city

      // Unified endpoint for all roles
      const apiEndpoint = "/api/profile/update"
      
      // Prepare request body - include role-specific fields
      const requestBody = {
        name,
        email,
        mobile,
        state,
        city,
      }

      // Only include Class and School for USER role (students)
      if (user.role === "USER") {
        const Class =
          userDetails.Class.length === 0 ? (userData.Class || "") : userDetails.Class
        const school =
          userDetails.school.length === 0 ? (userData.school || "") : userDetails.school
        requestBody.Class = Class
        requestBody.school = school
      }

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      })
      const data = await res.json()
      // Debug
      console.log("Response status:", res.status)
      console.log("Response data:", data)
      console.log("Request body:", requestBody)
      console.log("User role:", user.role)
      console.log("User data from props:", userData)
      if (!res.ok) {
        window.alert(`SOMETHING WENT WRONG! Error: ${data.Error || data.error || "Unknown error"}`)
      } else {
        window.alert("PROFILE UPDATED!")
        // Reset form fields based on role
        const resetFields = {
          name: "",
          email: "",
          mobile: "",
          city: "",
          state: "",
        }
        
        // Only include Class and School for USER role
        if (user.role === "USER") {
          resetFields.Class = ""
          resetFields.school = ""
        }
        
        setUserDetails(resetFields)
        // Profile details updated successfully
        
        // Call the callback to refresh user data in parent component
        if (onProfileUpdate) {
          setTimeout(() => {
            onProfileUpdate()
          }, 500)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2 className='text-center mt-5'>My profile</h2>
      <div className='card m-4'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <img
                className='mt-4'
                src={
                  image
                    ? image
                    : "https://mdbootstrap.com/img/Others/documentation/3.webp"
                }
                alt='Profile Pic'
                height={"200px"}
                width={"200px"}
                style={{ borderRadius: "50%" }}
              />
              <form
                onSubmit={handleUpload}
                className='text-center'
                style={{
                  display: "flex",
                  //   flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <input
                  type='file'
                  id='fileUploadButton'
                  accept='image/jpeg, image/png'
                  onChange={handleFileChange}
                  style={{
                    width: "100%",
                    margin: "20px auto",
                    display: "none",
                  }}
                />
                {/* Temperoary upload form */}
                <div
                  type='none'
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "36px ",
                    height: "32px",
                    cursor: "pointer",
                    // borderRadius: "50%",
                    border: "1px solid black",
                    marginTop: "20px",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    document.getElementById("fileUploadButton").click()
                  }}
                >
                  <i class='fa-solid fa-user-pen'></i>
                </div>
                <button type='submit' style={{ height: "32px" }}>
                  Upload
                </button>
              </form>
              {error && (
                <p style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </div>
            <div className='col-md-8'>
              <div style={{ textAlign: "right", marginBottom: "8px" }}>
                <p>
                  <button
                    style={{ cursor: "pointer", padding: "3px 10px" }}
                    onClick={() => {
                      setEditable(!editable)
                      //   console.log(editable);
                    }}
                  >
                    {editable ? (
                      <i class='fa-solid fa-xmark'></i>
                    ) : (
                      <i class='fa-regular fa-pen-to-square'></i>
                    )}
                    {editable ? ` Close` : ` Edit`}
                  </button>
                </p>
              </div>

              <form>
                <input
                  type='text'
                  id='defaultContactFormName'
                  class='form-control mb-4'
                  placeholder={`Name : ${userData.name || "Your Name"}`}
                  readOnly={editable ? false : true}
                  value={userDetails.name}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }}
                />
                {/* Only show Class field for USER role (students) */}
                {user.role === "USER" && (
                  <input
                    type='text'
                    id='defaultContactFormClass'
                    class='form-control mb-4'
                    placeholder={`Class : ${userData.Class || "Your Class"}`}
                    readOnly={editable ? false : true}
                    value={userDetails.Class}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, Class: e.target.value })
                    }}
                  />
                )}
                <input
                  type='email'
                  id='defaultContactFormEmail'
                  class='form-control mb-4'
                  readOnly={editable ? false : true}
                  placeholder={`Email : ${userData.email || "Your E-mail"}`}
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }}
                />
                {/* Only show School field for USER role (students) */}
                {user.role === "USER" && (
                  <input
                    type='text'
                    id='defaultContactFormSchool'
                    class='form-control mb-4'
                    placeholder={`School : ${userData.school || "Your School"}`}
                    readOnly={editable ? false : true}
                    value={userDetails.school}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, school: e.target.value })
                    }}
                  />
                )}
                <input
                  type='text'
                  id='defaultContactFormMobile'
                  class='form-control mb-4'
                  placeholder={`Mobile No. : ${
                    userData.mobile || "Your Mobile No."
                  }`}
                  readOnly={editable ? false : true}
                  value={userDetails.mobile}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, mobile: e.target.value })
                  }}
                />
                <input
                  type='text'
                  id='defaultContactFormCity'
                  class='form-control mb-4'
                  placeholder={`City : ${userData.city || "Your City"}`}
                  readOnly={editable ? false : true}
                  value={userDetails.city}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }}
                />
                <input
                  type='text'
                  id='defaultContactFormState'
                  class='form-control mb-4'
                  placeholder={`State : ${userData.state || "Your State"}`}
                  readOnly={editable ? false : true}
                  value={userDetails.state}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, state: e.target.value })
                  }}
                />

                <button
                  disabled={!editable}
                  class='mt-2 btn btn-info btn-block'
                  type='submit'
                  onClick={handleDetailsEdit}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
