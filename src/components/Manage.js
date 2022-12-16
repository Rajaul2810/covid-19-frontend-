import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Manage = () => {

    const [covid, setCovid] = useState([]);
    const [info, setInfo] = useState({
        name: '',
        age: '',
        nid: '',
        image: '',
        birthDate: '',
        action: false,
        status: '',
    })
    // get info

    useEffect(() => {
        fetch('http://localhost:8008/getInfo')
            .then(res => res.json())
            .then(data => setCovid(data));
    }, [])

    const handleInfo = (e) => {
        const newInfo = { ...info }
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo)
    }

    const handleInfoImage = (e) => {
        console.log(e.persist())
        console.log(e.target.files[0])
        const imgData = new FormData();
        imgData.set('key', 'a30317a5034f4348d630ce515c070a4a');
        imgData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(function (response) {
                const newProduct = { ...info };
                newProduct[e.target.name] = response.data.data.display_url;
                setInfo(newProduct);
                console.log(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log(info);


    const handleEdit = (id) => {
        console.log(id);
        const newInfo = {...info}
        fetch(`http://localhost:8008/edit/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newInfo),
            headers: { "Content-type": "application/json" }
        })
            .then(res => res.json())
            .then(data =>  swal("Good job!", "successfully Updated", "success"))

    }


    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:8008/delete/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log('deleted');
                            swal("Your data has been deleted!", {
                                icon: "success",
                            });
                        })

                } else {
                    swal("Your data is safe!");
                }
            });

    }
    return (
        <section style={{ backgroundColor: '#F6F6F6' }}>
            <h4 className='text-center'>Data List</h4>
            <div className='d-flex justify-content-center'>
                {
                    covid.map((data, index) =>
                        <>
                            <div key={index} className=' w-75 shadow p-3 mb-5 bg-body rounded' style={{ height: '100px' }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <img style={{ height: '50px', width: '60px' }} src={data.image} alt='' />
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
                                        <p className='p-2' style={{backgroundColor:'lightcoral'}}>Status: {data.status}</p>
                                    </div>
                                    <button style={{ height: '40px' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Edit</button>
                                    <button style={{ height: '40px' }} type="button" onClick={() => handleDelete(data._id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                            <div key={index} className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Information</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Name </label>
                                                <input type="text" name='name'   onChange={handleInfo} className="form-control p-4" placeholder="full name" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Age </label>
                                                <input type="number" name='age'  onChange={handleInfo} className="form-control p-4"  placeholder="age" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">NID Number</label>
                                                <input type="number" name='nid'  onChange={handleInfo} className="form-control p-4"  placeholder="nid number" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Date of Birth</label>
                                                <input type="date" name='birthDate' onChange={handleInfo} className="form-control p-4"  />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Status(positive/negative)</label>
                                                <input type="text" name='status'  onChange={handleInfo} className="form-control p-4"  />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Image</label>
                                                <input type="file" name='image'  onChange={handleInfoImage} className="form-control "  />
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" onClick={() => handleEdit(data._id)} className="btn btn-primary">Save change</button>
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
