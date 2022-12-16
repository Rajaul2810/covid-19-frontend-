import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

export const Admin = () => {
    const [rule, setRule] = useState({
        rule:'doctor'
    })
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        fetch('http://localhost:8008/getUser')
            .then(res => res.json())
            .then(data => setAllUser(data));
    }, [])
    console.log(allUser)

   

    const handleRule = (id) => {

        console.log(id);
        const Rule = {...rule}
       
        fetch(`http://localhost:8008/editRule/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(Rule),
            headers: { "Content-type": "application/json" }
        })
            .then(res => res.json())
            .then(data => swal("Good job!", "successfully Updated", "success"))


    }
    return (
        <div>
            <section>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rule</th>
                            <th scope="col">Update Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((data, index) =>
                                
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.rule}</td>
                                        <td><button type="button" className="btn btn-primary"  onClick={()=> handleRule(data._id)}>
                                            update Rule
                                        </button></td>
                                    </tr>
                                   
                                
                            )
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}
