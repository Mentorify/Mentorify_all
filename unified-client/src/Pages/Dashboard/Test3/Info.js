import React from 'react'

export default function Info(props) {
  return (
    <>
      {!props.hidePrintButton && (
        <div className='text-center'>Mentorify Technologies Private Limited</div>
      )}
    </>
  )
}
