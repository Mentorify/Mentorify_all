import React from "react"
import { useEffect, useState } from "react"
import Franchises from "./Franchises"
import useAuth from "../../Hooks/useAuth"
import AddFranchiseModal from "./AddFranchiseModal"
export default function Alltests3() {
  const { user } = useAuth()
  const [allstu, setallstu] = useState([])

  const getFranchiseData = async () => {
    try {
      const res = await fetch("/api/profile/franchises", {
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
      let data = await res.json()
      data.forEach((item) => {
        item.city = item.city.split("-").join(", ")
      })
      setallstu(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFranchiseData()
  }, [])
  return (
    <>
      <div className='card m-4'>
        <div className='card-body'>
          <h2 className='my-2'>Franchises</h2>

          <button
            type='button'
            class='btn btn-md btn-outline-success my-1'
            data-mdb-toggle='modal'
            data-mdb-target='#addFra'
          >
            Add Franchise +
          </button>
          <AddFranchiseModal onFranchiseAdded={getFranchiseData} />

          <div className='tab-content pt-2 pl-1' id='pills-tabContent'>
            <div
              className='tab-pane fade show active'
              id='a-0'
              role='tabpanel'
              aria-labelledby='pills-home-tab'
            >
              <Franchises data={allstu} onFranchiseUpdated={getFranchiseData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
