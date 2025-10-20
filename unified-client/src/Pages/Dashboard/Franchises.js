import React from "react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import EditFranchiseModal from "./EditFranchiseModal"
import useAuth from "../../Hooks/useAuth"
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function Franchises({ data, onFranchiseUpdated }) {
  const { user } = useAuth()
  const tableRef = useRef(null)
  
  const deleteFranchise = async (_id) => {
    const check = window.confirm("Are you sure you want to delete this franchise?")
    console.log(check)
    if (check) {
      try {
        // Use unified franchise delete endpoint for all roles
        await fetch("/api/profile/franchises", {
          method: "DELETE",
          body: JSON.stringify({ _id }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          // used when we want to share cookies or tokens to backend
          credentials: "include",
        }).then((response) => response.json())
        window.alert("FRANCHISE DELETED")
        // Refresh the data after deletion
        if (onFranchiseUpdated) {
          onFranchiseUpdated()
        }
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
        <table ref={tableRef} class='table table-striped table-sm' id='franchisesTable'>
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
                return (
                  <tr>
                    <td colSpan="7" className="text-center">No data Available</td>
                  </tr>
                )
              } else {
                return data.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
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
                            data-mdb-target={`#editFranchise${el._id}`}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                          >
                            Edit +
                          </button>
                          <button
                            type='button'
                            class='btn btn-sm btn-danger'
                            onClick={() => deleteFranchise(el._id)}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            })()}
          </tbody>
        </table>
      </div>
      
      {/* Render EditFranchiseModal components outside the table */}
      {data.map((el, i) => (
        <EditFranchiseModal 
          key={i} 
          data={el} 
          id={`editFranchise${el._id}`} 
          onFranchiseUpdated={onFranchiseUpdated} 
        />
      ))}
    </div>
  )
}

