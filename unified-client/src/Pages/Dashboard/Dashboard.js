import useAuth from "../../Hooks/useAuth"
import "./Dashboard.css"
import { Link, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import AltPage from "./AltPage"
import Alltests from "./Alltests"
import Allanalytics from "./Allanalytics"
import AllReports from "./AllReports"
import { useEffect, useState, useRef } from "react"
import Calendar from "./Calendar"
// Super Admin components
import Alltests2 from "./Alltests2"
import Alltests3 from "./Alltests3"
import Alltests4 from "./Alltests4"
import Students from "./Students"
import Students1 from "./Students1"
import AddStudentModal from "./AddStudentModal"
import AddAdminModal from "./AddAdminModal"
import AddFranchiseModal from "./AddFranchiseModal"
import AddSchoolModal from "./AddSchoolModal"
import EditAdminModal from "./EditAdminModal"
import EditFranchiseModal from "./EditFranchiseModal"
import EditSchoolModal from "./EditSchoolModal"
import EditStudentModal from "./EditStudentModal"
import CouponManagement from "./CouponManagement"
import CouponAnalytics from "./CouponAnalytics"
import api from "../../api"
const Buffer = require("buffer").Buffer

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [image, setImage] = useState(null)
  const [allStudents, setAllStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastCallTime, setLastCallTime] = useState(0)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const loadedImageRef = useRef(null)
  const imageLoadingInProgress = useRef(false)
  const imageLoadingLock = useRef(false)
  const imageLoadingGlobalLock = useRef(false)

  // fetch userData and userImage
  const callDashboardPage = async () => {
    const now = Date.now()
    if (isLoading || (now - lastCallTime) < 1000) {
      console.log("Already loading or too soon - skipping callDashboardPage")
      return
    }
    
    setIsLoading(true)
    setLastCallTime(now)
    try {
      // Use unified profile endpoint for all roles
      const apiEndpoint = "/api/profile/dashboard"

      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        // used when we want to share cookies or tokes to backend
      })
      console.log(res.status)
      const statusCodeFirstDigit = res.status.toString()[0]
      if (statusCodeFirstDigit !== "2") {
        throw new Error(res.error)
      }
      const data = await res.json()
      setUserData(data)
      
      // Reset image ref and loading flags for new user
      loadedImageRef.current = null
      imageLoadingInProgress.current = false
      imageLoadingLock.current = false
      imageLoadingGlobalLock.current = false
      
      // Load image directly here
      if (data.img && data.img.data) {
        // Use setTimeout to prevent immediate execution
        setTimeout(() => {
          loadUserImage(data._id, data.img.contentType)
        }, 100)
      } else {
        setImage(null)
      }
    } catch (error) {
      console.log(error)
      navigate("/login")
    } finally {
      setIsLoading(false)
    }
  }

  // Simple function to load user image - with maximum protection
  const loadUserImage = async (userId, contentType) => {
    console.log("loadUserImage called with:", { userId, contentType })
    
    // Global lock protection - if already loading anywhere, skip completely
    if (imageLoadingGlobalLock.current) {
      console.log("Global image loading locked, skipping loadUserImage")
      return
    }
    
    // Check if already loaded for this user
    if (loadedImageRef.current === userId) {
      console.log("Image already loaded for this user, skipping loadUserImage")
      return
    }
    
    // Set global lock immediately
    imageLoadingGlobalLock.current = true
    console.log("Starting image load for user:", userId)
    
    try {
      // Add cache-busting parameter to prevent browser caching
      const timestamp = Date.now()
      const imgEndpoint = `/api/profile/image/${userId}?t=${timestamp}`
      console.log("Fetching image from:", imgEndpoint)
      const imgRes = await fetch(imgEndpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      })
      
      if (imgRes.ok) {
        const buffer = await imgRes.arrayBuffer()
        const uint8Array = new Uint8Array(buffer)
        
        // Use a safer approach to convert to base64
        let binary = ''
        const chunkSize = 8192 // Process in chunks to avoid recursion
        for (let i = 0; i < uint8Array.length; i += chunkSize) {
          const chunk = uint8Array.slice(i, i + chunkSize)
          binary += String.fromCharCode.apply(null, chunk)
        }
        const base64String = btoa(binary)
        
        // Clear image first, then set new image to force re-render
        setImage(null)
        setTimeout(() => {
          const newImageData = `data:${contentType};base64, ${base64String}`
          setImage(newImageData)
          loadedImageRef.current = userId // Mark as loaded
          console.log("Image loaded successfully for user:", userId)
          console.log("New image data length:", newImageData.length)
        }, 100)
      } else {
        console.log("Image fetch failed with status:", imgRes.status)
        setTimeout(() => {
          setImage(null)
        }, 200)
      }
    } catch (imgError) {
      console.log("Error loading image:", imgError)
      setTimeout(() => {
        setImage(null)
      }, 200)
    } finally {
      // Always release the global lock after a longer delay
      setTimeout(() => {
        imageLoadingGlobalLock.current = false
      }, 500)
    }
  }

  // Fetch students data for all roles using unified endpoint
  const getStudentsData = async () => {
    try {
      const res = await fetch("/api/profile/students", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
      })
      if (res.ok) {
        if (res.status === 204) {
          // No content - no students found
          setAllStudents([])
        } else {
          const data = await res.json()
          setAllStudents(data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    callDashboardPage()
    getStudentsData()
    // eslint-disable-next-line
  }, [])

  // No useEffect for image loading - handle it directly in callDashboardPage

  // Function to refresh user data after profile update
  const handleProfileUpdate = async () => {
    console.log("handleProfileUpdate called")
    
    try {
      console.log("Refreshing user data after profile update...")
      const apiEndpoint = "/api/profile/dashboard"
      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        console.log("Updated user data after profile update:", data)
        setUserData(data)
        
        // Also refresh the image if it exists
        if (data.img && data.img.data) {
          console.log("Refreshing image after profile update...")
          setTimeout(() => {
            loadUserImage(data._id, data.img.contentType)
          }, 300)
        }
      } else {
        console.log("Failed to refresh user data:", res.status)
      }
    } catch (error) {
      console.log("Error refreshing user data after profile update:", error)
    }
  }

  // Function to refresh image after upload
  const handleImageUploaded = async () => {
    console.log("handleImageUploaded called")
    
    // Clear current image immediately to force re-render
    setImage(null)
    
    // Reset all flags to allow reloading
    loadedImageRef.current = null
    imageLoadingInProgress.current = false
    imageLoadingLock.current = false
    imageLoadingGlobalLock.current = false
    
    // First refresh the user data to get the updated image info
    try {
      console.log("Refreshing user data after image upload...")
      const apiEndpoint = "/api/profile/dashboard"
      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        console.log("Updated user data:", data)
        setUserData(data)
        
        // Now load the image with the updated data
        if (data.img && data.img.data) {
          console.log("Loading updated image...")
          setTimeout(() => {
            loadUserImage(data._id, data.img.contentType)
          }, 500)
        } else {
          console.log("No image data found, setting image to null")
          setImage(null)
        }
      } else {
        console.log("Failed to refresh user data:", res.status)
      }
    } catch (error) {
      console.log("Error refreshing user data after image upload:", error)
    }
  }

  // Function to render navigation tabs based on user role
  const renderNavigationTabs = () => {
    const baseTabs = [
      {
        id: 'v-1',
        label: 'Profile',
        icon: 'fa-solid fa-user-graduate',
        active: true
      }
    ]

    if (user.role === "USER") {
      return [
        ...baseTabs,
        { id: 'v-2', label: 'Assessment', icon: 'fa-sharp fa-solid fa-pen-to-square' },
        { id: 'v-3', label: 'Analytics', icon: 'fas fa-chart-line' },
        { id: 'v-4', label: 'Report', icon: 'fa fa-file' },
        { id: 'v-5', label: 'Calendar', icon: 'fa-solid fa-calendar-days' },
        { id: 'v-6', label: '1:1 Session', icon: 'fas fa-chalkboard-teacher' }
      ]
    } else if (user.role === "ADMIN") {
      return [
        ...baseTabs,
        { id: 'v-2', label: 'Students', icon: 'fas fa-book-reader' },
        { id: 'v-4', label: 'Franchise', icon: 'fas fa-users' },
        { id: 'v-3', label: 'Schools', icon: 'fas fa-people-group' },
        { id: 'v-6', label: 'Coupons', icon: 'fas fa-ticket-alt' },
        { id: 'v-5', label: 'Calendar', icon: 'fas fa-calendar-alt' }
      ]
    } else if (user.role === "FRANCHISE") {
      return [
        ...baseTabs,
        { id: 'v-2', label: 'Students', icon: 'fas fa-book-reader' },
        { id: 'v-3', label: 'Schools', icon: 'fas fa-people-group' },
        { id: 'v-4', label: 'Calendar', icon: 'fas fa-calendar-alt' }
      ]
    } else if (user.role === "SCHOOL") {
      return [
        ...baseTabs,
        { id: 'v-2', label: 'Students', icon: 'fas fa-book-reader' },
        { id: 'v-3', label: 'Calendar', icon: 'fas fa-calendar-alt' }
      ]
    } else if (user.role === "SUPER_ADMIN") {
      return [
        ...baseTabs,
        { id: 'v-2', label: 'Students', icon: 'fas fa-book-reader' },
        { id: 'v-3', label: 'Admins', icon: 'fas fa-users' },
        { id: 'v-5', label: 'Franchise', icon: 'fas fa-users' },
        { id: 'v-4', label: 'Schools', icon: 'fas fa-people-group' },
        { id: 'v-7', label: 'Coupons', icon: 'fas fa-ticket-alt' },
        // { id: 'v-8', label: 'Coupon Analytics', icon: 'fas fa-chart-bar' },
        { id: 'v-6', label: 'Calendar', icon: 'fas fa-calendar-alt' }
      ]
    }

    return baseTabs
  }

  // Function to render tab content based on user role
  const renderTabContent = () => {
    const tabs = renderNavigationTabs()
    
    return tabs.map((tab, index) => {
      if (tab.id === 'v-1') {
        return (
          <div
            key={tab.id}
            className='tab-pane fade show active'
            id={tab.id}
            role='tabpanel'
            aria-labelledby='v-pills-home-tab'
          >
            {JSON.stringify(userData) === "{}" ? (
              <h2>Loading...</h2>
            ) : (
              <Profile userData={userData} image={image} onImageUploaded={handleImageUploaded} onProfileUpdate={handleProfileUpdate} />
            )}
          </div>
        )
      }

      // Render content based on role and tab
      if (user.role === "USER") {
        switch (tab.id) {
          case 'v-2':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests userData={userData} />
              </div>
            )
          case 'v-3':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Allanalytics userData={userData} />
              </div>
            )
          case 'v-4':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <AllReports userData={userData} />
              </div>
            )
          case 'v-5':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Calendar />
              </div>
            )
          case 'v-6':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <AltPage />
              </div>
            )
          default:
            return null
        }
      } else if (user.role === "ADMIN") {
        switch (tab.id) {
          case 'v-2':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <div className='card m-4'>
                  <div className='card-body'>
                    <h2 className='my-2'>Students</h2>
                    <button
                      type='button'
                      className='btn btn-md btn-outline-success my-1'
                      data-mdb-toggle='modal'
                      data-mdb-target='#addStu'
                    >
                      Add Student +
                    </button>
                    <AddStudentModal onStudentAdded={getStudentsData} />
                    <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
                      <div className='tab-pane fade show active' id='a-0' role='tabpanel'>
                        <Students data={allStudents} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'v-3':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests4 />
              </div>
            )
          case 'v-4':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests3 />
              </div>
            )
          case 'v-5':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Calendar />
              </div>
            )
          case 'v-6':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <CouponManagement />
              </div>
            )
          default:
            return null
        }
      } else if (user.role === "FRANCHISE") {
        switch (tab.id) {
          case 'v-2':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <div className='card m-4'>
                  <div className='card-body'>
                    <h2 className='my-2'>Students</h2>
                    <button
                      type='button'
                      className='btn btn-md btn-outline-success my-1'
                      data-mdb-toggle='modal'
                      data-mdb-target='#addStu'
                    >
                      Add Student +
                    </button>
                    <AddStudentModal onStudentAdded={getStudentsData} />
                    <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
                      <div className='tab-pane fade show active' id='a-0' role='tabpanel'>
                        <Students data={allStudents} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'v-3':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests4 />
              </div>
            )
          case 'v-4':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Calendar />
              </div>
            )
          default:
            return null
        }
      } else if (user.role === "SCHOOL") {
        switch (tab.id) {
          case 'v-2':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <div className='card m-4'>
                  <div className='card-body'>
                    <h2 className='my-2'>Students</h2>
                    <button
                      type='button'
                      className='btn btn-md btn-outline-success my-1'
                      data-mdb-toggle='modal'
                      data-mdb-target='#addStu'
                    >
                      Add Student +
                    </button>
                    <AddStudentModal onStudentAdded={getStudentsData} />
                    <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
                      <div className='tab-pane fade show active' id='a-0' role='tabpanel'>
                        <Students data={allStudents} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'v-3':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Calendar />
              </div>
            )
          default:
            return null
        }
      } else if (user.role === "SUPER_ADMIN") {
        switch (tab.id) {
          case 'v-2':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <div className='card m-4'>
                  <div className='card-body'>
                    <h2 className='my-2'>Students</h2>
                    <button
                      type='button'
                      className='btn btn-md btn-outline-success my-1'
                      data-mdb-toggle='modal'
                      data-mdb-target='#addStu'
                    >
                      Add Student +
                    </button>
                    <AddStudentModal onStudentAdded={getStudentsData} />
                    <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
                      <div className='tab-pane fade show active' id='a-0' role='tabpanel'>
                        <Students data={allStudents} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'v-3':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests2 />
              </div>
            )
          case 'v-4':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests4 />
              </div>
            )
          case 'v-5':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Alltests3 />
              </div>
            )
          case 'v-6':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <Calendar />
              </div>
            )
          case 'v-7':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <CouponManagement />
              </div>
            )
          case 'v-8':
            return (
              <div key={tab.id} className='tab-pane fade' id={tab.id} role='tabpanel'>
                <CouponAnalytics />
              </div>
            )
          default:
            return null
        }
      }

      return null
    })
  }

  return (
    <div className='App'>
      <div className='header' style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <nav
          class='navbar navbar-expand-lg navbar-dark bg-dark'
          style={{ background: "#2B2B2BE8 !important" }}
        >
          <div class='container'>
            <Link class='navbar-brand me-2' to='/'>
              <img
                src='../img/images/logo-m.png'
                width={"240px"}
                alt='MDB Logo'
                loading='lazy'
                style={{ marginTop: -"1px" }}
              />
            </Link>

            <button
              class='navbar-toggler'
              type='button'
              data-mdb-toggle='collapse'
              data-mdb-target='#navbarButtonsExample'
              aria-controls='navbarButtonsExample'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <i class='fas fa-bars'></i>
            </button>

            <div class='collapse navbar-collapse' id='navbarButtonsExample'>
              <div
                className='d-flex align-items-center'
                style={{
                  marginLeft: "auto",
                }}
              >
                <ul className='navbar-nav mb-2 mb-lg-0'>
                  <li className='nav-item'>
                    <a
                      className='nav-link'
                      href='#'
                      data-mdb-toggle='modal'
                      data-mdb-target='#exampleModal'
                      role='button'
                    >
                      <i className='fas fa-info-circle'></i> &nbsp;&nbsp;Help &
                      support
                    </a>
                  </li>
                  <li className='nav-item'>
                    <div class='dropdown'>
                      <a
                        class='nav-link dropdown-toggle d-flex align-items-center hidden-arrow'
                        href='#'
                        id='navbarDropdownMenuAvatar'
                        role='button'
                        data-mdb-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <i className='far fa-user-circle'></i>&nbsp;&nbsp;
                        {userData.name || "User"}
                      </a>
                      <ul
                        class='dropdown-menu dropdown-menu-end'
                        aria-labelledby='navbarDropdownMenuAvatar'
                      >
                        <li>
                          <Link class='dropdown-item' to='/logout'>
                            Log Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className='row mx-0' style={{ minHeight: 'calc(100vh - 56px)', marginTop: '56px' }}>
        <div className='col-md-2 p-0' style={{ position: 'fixed', left: 0, top: '56px', height: 'calc(100vh - 56px)', overflowY: 'auto', zIndex: 900 }}>
          <div
            className='nav flex-column nav-pills text-center navbar-dark bg-dark'
            id='v-pills-tab'
            style={{ minHeight: '100%', paddingTop: '50px', paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '1rem' }}
            role='tablist'
            aria-orientation='vertical'
          >
            {renderNavigationTabs().map((tab, index) => (
              <a
                key={tab.id}
                className={`nav-link ${tab.active ? 'active' : ''}`}
                id={`v-pills-${tab.id}-tab`}
                data-mdb-toggle='pill'
                href={`#${tab.id}`}
                role='tab'
                aria-controls={`v-pills-${tab.id}`}
                aria-selected={tab.active ? 'true' : 'false'}
              >
                {tab.label} <i className={tab.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className='col-md-10 pb-5' style={{ background: "#FDFAE3", marginLeft: '16.666667%', width: '83.333333%' }}>
          <div className='tab-content' id='v-pills-tabContent'>
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Help & Support Modal - Placed at root level to avoid z-index conflicts */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        data-mdb-backdrop='true'
        data-mdb-keyboard='true'
        style={{ zIndex: 1060 }}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Got questions? Contact us
              </h5>
              <button
                type='button'
                className='btn-close'
                data-mdb-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body' style={{ paddingLeft: "25px" }}>
              <h6 style={{ marginBottom: "25px" }}>
                <span className='key'>
                  <i className='fa-solid fa-phone'></i>&nbsp; Call:
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp; +91 639-450-6912
              </h6>
              <h6>
                <span className='key'>
                  <i className='fa-solid fa-envelope'></i>&nbsp; Email:
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp; support@mentorify.com
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

