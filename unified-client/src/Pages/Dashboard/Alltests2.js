import React from "react"
import { Navigate } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Students from "./Students"
import Students1 from "./Students1"
import AddAdminModal from "./AddAdminModal"
import useAuth from "../../Hooks/useAuth"
export default function Alltests2() {
  const { user } = useAuth()
  const [allstu, setallstu] = useState([])

  const getAdminData = async () => {
    try {
      const res = await fetch("/api/superadmin/dashboard/admins", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        // used when we want to share cookies or tokes to backend
        credentials: "include",
      })

      // console.log(res);
      if (res.status !== 200) {
        throw new Error(res.error)
      }
      const data = await res.json()
      setallstu(data)
    } catch (error) {
      console.log(error)
      //navigate("/admin/login");
    }
  }
  useEffect(() => {
    getAdminData()
  }, [])
  return (
    <>
      <div className='card m-4'>
        <div className='card-body'>
          <h2 className='my-2'>Admins</h2>

          <button
            type='button'
            class='btn btn-md btn-outline-success my-1'
            data-mdb-toggle='modal'
            data-mdb-target='#addAdm'
          >
            Add Admin +
          </button>
          <AddAdminModal onAdminAdded={getAdminData} />

          <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
            <div
              className='tab-pane fade show active'
              id='a-0'
              role='tabpanel'
              aria-labelledby='pills-home-tab'
            >
              <Students1 data={allstu} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
