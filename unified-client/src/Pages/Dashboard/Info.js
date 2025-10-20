import React from "react"

export default function Info(props) {
  return (
    <>
      <div className='m-3'>
        <div
          className='card my-3'
          style={{
            background: "rgba(123, 158, 186, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              1. Realistic
            </h3>
            <div className='card-text mt-3'>
              They Like to work with animals, tools, or machines; generally
              avoid social activities like teaching, healing, and informing
              others; They have good skills in working with tools, mechanical or
              electrical drawings, machines, or plants and animals; They Value
              practical things you can see, touch, and use like plants and
              animals, tools, equipment, or devices; and Sees self as practical,
              mechanical, and realistic.
            </div>
          </div>
        </div>
        <div
          className='card my-3'
          style={{
            background: "rgba(255, 205, 86, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              2.Investigative
            </h3>
            <div className='card-text mt-3'>
              Likes to study and solve math or science problems; generally
              avoids leading, selling, or persuading people; Is good at
              understanding and solving science and math problems; Values
              science; and Sees self as precise, scientific, and intellectual.
            </div>
          </div>
        </div>
        <div
          className='card my-3'
          style={{
            background: "rgba(25, 192, 134, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              3.Artistic
            </h3>
            <div className='card-text mt-3'>
              Likes to do creative activities like art, drama, crafts, dance,
              music, design, editing or creative writing; generally avoids
              highly ordered or repetitive activities; Has good artistic
              abilities -- in creative writing, drama, crafts, music, or art;
              Values the creative arts -- like drama, music, art, or the works
              of creative writers; and Sees self as expressive, original, and
              independent.
            </div>
          </div>
        </div>
        <div
          className='card my-3'
          style={{
            background: "rgba(54, 162, 235, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              4. Social
            </h3>
            <div className='card-text mt-3'>
              Likes to do things to help people -- like teaching, nursing, or
              giving first aid, and providing information; generally avoids
              using machines, tools, or animals to achieve a goal; Is good at
              teaching, counselling, nursing, or giving information; Values
              helping people and solving social problems; and Sees himself as
              helpful, friendly, and trustworthy.
            </div>
          </div>
        </div>
        <div
          className='card my-3'
          style={{
            background: "rgba(172, 233, 23, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              5. Enterprising
            </h3>
            <div className='card-text mt-3'>
              Likes to do creative activities like art, drama, crafts, dance,
              music, or creative writing; generally avoids highly ordered or
              repetitive activities; Has good artistic abilities -- in creative
              writing, drama, crafts, music, or art; Values the creative arts --
              like drama, music, art, or the works of creative writers; and Sees
              self as expressive, original, and independent.
            </div>
          </div>
        </div>
        <div
          className='card my-3'
          style={{
            background: "rgba(93, 297, 78, 0.4)",
          }}
        >
          <div className='card-body'>
            <h3
              className='h3 card-title'
              style={{
                fontWeight: "700",
              }}
            >
              6. Conventional
            </h3>
            <div className='card-text mt-3'>
              Likes to work with numbers, records, or machines in a set, orderly
              way; generally avoids ambiguous, unstructured activities Are good
              at working with written records and numbers in a systematic,
              orderly way; Values business success; and Sees himself as orderly,
              and good at following a set plan.
            </div>
          </div>
        </div>
      </div>
      {!props.hidePrintButton && (
        <div className='text-center'>Mentorify Technologies Private Limited</div>
      )}
    </>
  )
}
