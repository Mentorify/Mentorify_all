import React from "react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import EditStudentModal from "./EditStudentModal"
import useAuth from "../../Hooks/useAuth"
import NoTestsModal from "../../components/NoTestsModal"
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function Students({ data }) {
  const { user } = useAuth()
  const [showNoTestsModal, setShowNoTestsModal] = useState(false)
  const [selectedStudentName, setSelectedStudentName] = useState("")
  const tableRef = useRef(null)

  const deleteUser = async (_id) => {
    const check = window.confirm("Are you sure you want to delete this user?")
    console.log(check)
    if (check) {
      try {
        // Use unified student delete endpoint for all roles
        await fetch("/api/profile/students", {
          method: "DELETE",
          body: JSON.stringify({ _id }),
          headers: {
            Accept: "appllication/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          // used when we want to share cookies or tokes to backend
          credentials: "include",
        }).then((response) => response.json())
        window.alert("USER DELETED")
      } catch (err) {
        window.alert(err || "Unsuccessful Operation")
      }
    }
  }

  useEffect(() => {
    // Initialize DataTable
    if (tableRef.current && data.length > 0) {
      // Destroy existing DataTable if it exists
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy()
      }
      
      // Initialize new DataTable
      $(tableRef.current).DataTable({
        pageLength: 10,
        ordering: true,
        searching: true,
        responsive: true,
        columnDefs: [
          { orderable: false, targets: [8, 9] } // Disable sorting on Action and View Report columns
        ]
      })
    }

    // Cleanup on unmount
    return () => {
      if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy()
      }
    }
  }, [data])

  return (
    <div className='card bg-light'>
      <div className='card-body'>
        <table ref={tableRef} class='table table-striped table-sm' id='studentsTable'>
          <thead>
            <tr>
              <th scope='col'>S.No</th>
              <th scope='col'>Name</th>
              <th scope='col'>School</th>
              <th scope='col'>Class</th>
              <th scope='col'>Email</th>
              <th scope='col'>Mobile No.</th>
              <th scope='col'>State</th>
              <th scope='col'>City</th>
              <th scope='col'>Action</th>
              <th scope='col'>View Report</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (data.length === 0) {
                return <>No data Available</>
              } else {
                return (
                  <>
                    {data.map((el, idx) => {
                      return (
                        <>
                          <tr>
                            <td>{idx + 1}</td>
                            <td>{el.name}</td>
                            <td>{el.school}</td>
                            <td>{el.Class}</td>
                            <td>{el.email}</td>
                            <td>{el.mobile}</td>
                            <td>{el.state}</td>
                            <td>{el.city}</td>
                            <td>
                              <div className='d-flex gap-2'>
                                <button
                                  type='button'
                                  class='btn btn-sm btn-primary'
                                  data-mdb-toggle='modal'
                                  data-mdb-target={`#editStu-${el._id}`}
                                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                >
                                  Edit +
                                </button>
                                <button
                                  type='button'
                                  class='btn btn-sm btn-danger'
                                  onClick={() => {
                                    deleteUser(el._id)
                                  }}
                                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                >
                                  Delete
                                </button>
                              </div>
                              {/* modal */}
                              <EditStudentModal
                                data={el}
                                id={`editStu-${el._id}`}
                              />
                            </td>
                            <td>
                              <a
                                href='#'
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Check if student has attempted any tests
                                  const hasAttemptedTests = el.tests && Object.values(el.tests).some(test => test.attempt === true);
                                  
                                  if (hasAttemptedTests) {
                                    // Open combined student report in new tab
                                    const reportUrl = `${window.location.origin}/dashboard/combined-student-report?studentId=${el._id}`;
                                    window.open(reportUrl, '_blank');
                                  } else {
                                    // Show modal for no tests attempted
                                    setSelectedStudentName(el.name);
                                    setShowNoTestsModal(true);
                                  }
                                }}
                                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'none' }}
                              >
                                View Report
                              </a>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </>
                )
              }
            })()}
          </tbody>
        </table>
      </div>

      {/* No Tests Modal */}
      <NoTestsModal 
        isOpen={showNoTestsModal}
        onClose={() => setShowNoTestsModal(false)}
        studentName={selectedStudentName}
      />
    </div>
  )
}
