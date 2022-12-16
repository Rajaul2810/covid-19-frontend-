import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './App';
import swal from 'sweetalert';

function Info() {
    const [info, setInfo] = useState({
        name: '',
        age: '',
        nid: '',
        image: '',
        birthDate: '',
        action: false,
        status: '',
    })
    const { loggedInUser } = useContext(UserContext);



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




    const sendInfo = () => {
        if (info.name && info.image && info.age && info.nid && info.birthDate) {
            const addInfo = { ...info, user:{ ...loggedInUser} }
            fetch('http://localhost:8008/addInfo', {
                method: 'POST',
                headers: { 'Content-type': 'Application/json' },
                body: JSON.stringify(addInfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.message === 'Successfully add Info') {
                        swal("Good job!", data.message, "success");
                    } else {
                        swal("Sorry", 'Do not add Info', "warning");
                    }
                })
        } else {
            swal("Invalid", "All field are required", "warning");
        }
    }





    return (
        <section style={{ backgroundColor: '#F6F6F6' }}>
            <div className='d-flex justify-content-center my-2 pt-3' >
                <div className='w-50 shadow p-3 mb-5 bg-body rounded ' style={{ backgroundColor: '#ffffff' }}>
                    <div className='w-75 m-3'>
                        <h2 className='text-center'>COVID-19 Info</h2>
                        <div className="mb-3">
                            <label className="form-label">Name </label>
                            <input type="text" name='name' onChange={handleInfo} className="form-control p-4" id="exampleFormControlInput1" placeholder="full name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age </label>
                            <input type="number" name='age' onChange={handleInfo} className="form-control p-4" id="exampleFormControlInput1" placeholder="age" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NID Number</label>
                            <input type="number" name='nid' onChange={handleInfo} className="form-control p-4" id="exampleFormControlInput1" placeholder="nid number" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input type="date" name='birthDate' onChange={handleInfo} className="form-control p-4" id="exampleFormControlInput1" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status(positive/negative)</label>
                            <input type="text" name='status' onChange={handleInfo} className="form-control p-4" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input type="file" name='image' onChange={handleInfoImage} className="form-control " id="exampleFormControlInput1" />
                        </div>


                        <button type="button" onClick={sendInfo} className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Info