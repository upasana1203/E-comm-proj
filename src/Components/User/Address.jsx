import React, { useEffect, useState } from 'react'

const inputOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: ""
}
export default function Address() {
  let [data, setData] = useState({})
  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState("")
  let [inputData, setInputData] = useState(inputOptions)
  let [flag, setFlag] = useState(false)

  function createRecord() {
    setShowModal(true)
    setOption("Create")
    setInputData({ ...inputOptions })
  }

  function updateRecord(index) {
    setShowModal(true)
    setOption("Update")
    setInputData({ ...data.address[index], index: index })
  }

  function getInputData(e) {
    let { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    if (option === "Create")
      var item = { ...data, address: data.address ? data.address.concat([inputData]) : [inputData] }
    else {
      let index = inputData.index
      data.address[index] = { ...inputData }
      var item = { ...data }
    }
    setData({ ...item })
    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...item })
    })
    response = await response.json()
    setInputData(inputOptions)
    setShowModal(false)
  }

  async function deleteRecord(index) {
    if (confirm("Are You Sure to Delete That Record : ")) {
      data.address?.splice(index, 1)
      setData(data)
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      setFlag(!flag)
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData(response)
    })()
  }, [])
  return (
    <>
      <div>
        <button className='btn btn-primary float-end' onClick={createRecord}>Add New Address</button>
      </div>
      <div className='mt-5'>
        {data.address?.map((item, index) => {
          return <div key={index} className='mb-3'>
            <div className="card p-3">
              <p>{item.name}</p>
              <p>{item.phone},{item.email}</p>
              <p>{item.address}</p>
              <p>{item.pin},{item.city},{item.state}</p>
              <div className="btn-group position-absolute end-0">
                <button className='btn btn-primary' onClick={() => updateRecord(index)}><i className='bi bi-pencil-square'></i></button>
                <button className='btn btn-danger' onClick={() => deleteRecord(index)}><i className='bi bi-trash'></i></button>
              </div>
            </div>
          </div>
        })}
      </div>

      <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{option} Record</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" value={inputData.name} onChange={getInputData} className='form-control border-primary' placeholder='Full Name' required />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label>Email*</label>
                    <input type="email" name="email" value={inputData.email} onChange={getInputData} className='form-control border-primary' placeholder='Email Address' required />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label>Phone*</label>
                    <input type="text" name="phone" value={inputData.phone} onChange={getInputData} className='form-control border-primary' placeholder='Phone Number' required />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Address*</label>
                    <textarea name="address" value={inputData.address} onChange={getInputData} className='form-control border-primary' placeholder='Address' required rows={2}></textarea>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <label>Pin*</label>
                    <input type="text" name="pin" value={inputData.pin} onChange={getInputData} className='form-control border-primary' placeholder='Pin Code' required />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <label>City*</label>
                    <input type="text" name="city" value={inputData.city} onChange={getInputData} className='form-control border-primary' placeholder='City Name' required />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <label>State*</label>
                    <input type="text" name="state" value={inputData.state} onChange={getInputData} className='form-control border-primary' placeholder='State Name' required />
                  </div>
                  <div className="col-12 mb-3">
                    <button type="submit" className='btn btn-primary w-100'>{option}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
