import React from "react"
import { useEffect, useState } from "react"
import Schools from "./Schools"
import useAuth from "../../Hooks/useAuth"
import AddSchoolModal from "./AddSchoolModal"
export default function Alltests4() {
  const { user } = useAuth()
  const [allstu, setallstu] = useState([])

  const getSchoolData = async () => {
    try {
      const res = await fetch("/api/profile/schools", {
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
      if (!res.ok) {
        throw new Error(res.error)
      }
      const data = await res.json()
      setallstu(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSchoolData()
  }, [])
  return (
    <>
      <div className='card m-4'>
        <div className='card-body'>
          <h2 className='my-2'>Schools</h2>

          <button
            type='button'
            class='btn btn-md btn-outline-success my-1'
            data-mdb-toggle='modal'
            data-mdb-target='#addSch'
          >
            Add School +
          </button>
          <AddSchoolModal onSchoolAdded={getSchoolData} />

          <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
            <div
              className='tab-pane fade show active'
              id='a-0'
              role='tabpanel'
              aria-labelledby='pills-home-tab'
            >
              <Schools data={allstu} onSchoolUpdated={getSchoolData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
