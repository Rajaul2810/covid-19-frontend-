import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Reportlist = () => {
    const [covid, setCovid] = useState([]);
    const [dataItem, setDataItem] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:8008/getInfo')
            .then(res => res.json())
            .then(data => setCovid(data));
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    console.log(search)
    const handleSearch = () => {

        fetch(`http://localhost:8008/getSearch/${search}`)
            .then(res => res.json())
            .then(data => setDataItem(data))


    }
    console.log(dataItem)

    return (
        <section style={{ backgroundColor: '#F6F6F6' }}>
            <div className='d-flex w-75 justify-content-center mb-5 pt-3'>
                <div className="mb-3">
                    <input type="search" name='nid' onChange={handleChange} className="form-control p-4" placeholder="Search by NID" />
                </div>
                <button style={{ height: '50px' }} type="button" onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
    
          { dataItem.name &&  <div className='d-flex justify-content-center'>
                
                   

                    <div className=' w-75 shadow p-3 mb-5 bg-body rounded' style={{ height: '100px' }}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <img style={{ height: '70px', width: '80px' }} src={dataItem.image} alt='' />
                            </div>
                            <div>
                                <p>Name: {dataItem.name}</p>
                                <p>Birth Date: {dataItem.birthDate}</p>
                            </div>
                            <div>
                                <p>NID: {dataItem.nid}</p>
                                <p>Age: {dataItem.age}</p>
                            </div>
                            <div>
                                <p className='p-2' style={{ backgroundColor: 'lightcoral' }}>Status: {dataItem.status}</p>
                            </div>
                            {/* <button style={{ height: '40px' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">View</button> */}

                        </div>
                    </div>
                </div>
              }

            <div className='d-flex justify-content-center'>

                {
                    covid.map((data, index) =>
                        <>
                            <div key={data._id} className=' w-75 shadow p-3 mb-5 bg-body rounded' style={{ height: '100px' }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <img style={{ height: '70px', width: '80px' }} src={data.image} alt='' />
                                    </div>
                                    <div>
                                        <p>Name: {data.name}</p>
                                        <p>Birth Date: {data.birthDate}</p>
                                    </div>
                                    <div>
                                        <p>NID: {data.nid}</p>
                                        <p>Age: {data.age}</p>
                                    </div>
                                    <div>
                                        <p className='p-2' style={{ backgroundColor: 'lightcoral' }}>Status: {data.status}</p>
                                    </div>
                                    {/* <button style={{ height: '40px' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">View</button> */}

                                </div>
                            </div>
                            <div key={index} className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Information</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                          
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    );
}
