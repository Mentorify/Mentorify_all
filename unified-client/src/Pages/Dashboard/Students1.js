import React from "react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import EditAdminModal from "./EditAdminModal"
import useAuth from "../../Hooks/useAuth"
import EditFranchiseModal from "./EditFranchiseModal"
import EditSchoolModal from "./EditSchoolModal"
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function Students1({ data }) {
  const { user } = useAuth()
  const tableRef = useRef(null)
  console.log("data are ", data)

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
          { orderable: false, targets: [6] } // Disable sorting on Action column
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
        <table ref={tableRef} class='table table-striped table-sm' id='adminsTable'>
          <thead>
            <tr>
              <th scope='col'>S.No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Mobile</th>
              <th scope='col'>State</th>
              <th scope='col'>City</th>
              <th scope='col'>Action</th>
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
                                  data-mdb-target={`#exampleModal-${el._id}`}
                                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                >
                                  Edit +
                                </button>
                                <button
                                  type='button'
                                  class='btn btn-sm btn-danger'
                                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                  onClick={async () => {
                                    const ans = window.confirm(
                                      "Are you sure you want to delete this admin"
                                    )
                                    if (ans) {
                                      let deleteEndpoint = "/api/superadmin/dashboard/admins"
                                      if (el.role === "FRANCHISE") {
                                        deleteEndpoint = "/api/superadmin/dashboard/franchises"
                                      } else if (el.role === "SCHOOL") {
                                        deleteEndpoint = "/api/profile/schools"
                                      } else if (el.role === "USER") {
                                        deleteEndpoint = "/api/superadmin/dashboard/students"
                                      }
                                      
                                      const res = await fetch(deleteEndpoint, {
                                        method: "DELETE",
                                        body: JSON.stringify({ _id: el._id }),
                                        headers: {
                                          Accept: "application/json",
                                          "Content-Type": "application/json",
                                          Authorization: `Bearer ${user.token}`,
                                        },
                                        // used when we want to share cookies or tokes to backend
                                        credentials: "include",
                                      })
                                      const data = await res.json()
                                      if (!res.ok) {
                                        window.alert("Unsuccessful Operation")
                                      } else {
                                        window.alert("USER DELETED")
                                        window.location.reload()
                                      }
                                  }
                                }}
                              >
                                Delete
                              </button>
                              </div>
                              {el.role === "FRANCHISE" ? (
                                <EditFranchiseModal
                                  data={el}
                                  id={`exampleModal-${el._id}`}
                                />
                              ) : el.role === "SCHOOL" ? (
                                <EditSchoolModal
                                  data={el}
                                  id={`exampleModal-${el._id}`}
                                />
                              ) : (
                                <EditAdminModal
                                  data={el}
                                  id={`exampleModal-${el._id}`}
                                />
                              )}
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
    </div>
  )
}
