"use client"
import React, { useEffect, useState } from 'react'
import './page.css'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { handleAddUser } from './adduser';

function AddUser() {

    const [adminVerify, setAdminVerify] = useState(false);
    const [user, setUser] = useState({});
    const [sessionid, setSessionId] = useState('')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [admno, setAdmno] = useState('');
    const [accyear, setAccyear] = useState('');
    const [username, setUsername] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    



    //Admin Verify Block Start

    useEffect(() => {
        var newuser;
        if (newuser = Cookies.get('user')) {
            const userObj = JSON.parse(newuser)
            console.log(userObj);
            if (userObj && userObj.role == 'librarian') {
                setAdminVerify(true);
                setSessionId(userObj.sessionid);
            }
            else {
                window.location = '/'
            }
        }
        else {
            window.location = '/login'
        }


    }, [])

    if (!adminVerify) {
        return (
            <div></div>
        )
    }

    //Admin Verify Block End

    

    const handleAddUserSubmit = async (event) => {
        event.preventDefault();

        const resObj = {
                'name': name,
                'email' : email,
                'admno' : admno,
                'accyear' : accyear,
                'department' :  department,
                'role' : role,
                'username' : username,
                'password' : password,
        };
        const uploadResult = await handleAddUser(resObj,sessionid);
        if(uploadResult==true) {
            alert("File Uploaded")
            //window.location.reload();
        }
        else {
            alert("Upload Failed \n "+uploadResult)
        }
    }




    return (
        <div className='main-extra'>
            <h1>Add User</h1>
            <div className='horizontal-line' />
            <div className='formdiv'>
                <div className='formbox'>
                    <p className='formhead'>Add User</p>
                    <form onSubmit={handleAddUserSubmit} className='form' >

                        <div className='formbody'>
                            <div>
                                <p className='inputlabel'>Name</p>
                                <input type="text" placeholder='Name' className='inputdiv' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Email</p>
                                <input type="email" placeholder='Email' className='inputdiv' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Admsission Number / Faculty ID</p>
                                <input type="text" placeholder='Admission Number / Faculty ID' className='inputdiv' value={admno} onChange={(e) => setAdmno(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Join Accademic Year</p>
                                <input type="text" placeholder='2024-2025' className='inputdiv' value={accyear} onChange={(e) => setAccyear(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Department</p>
                                <input type="text" id='dept' placeholder='De[artment' className='inputdiv' value={department} onChange={(e) => setDepartment(e.target.value)} hidden />
                                <label htmlFor="dept" ></label>
                                <select name="" className='inputdiv' id="dept" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="CE">Civil Engineering</option>
                                    <option value="ME">Mechanical Engineering</option>
                                    <option value="EEE">Electrical and Electronics Engineering</option>
                                    <option value="CSE">Computer Science and Engineering</option>
                                </select>
                            </div>
                            <div>
                                <p className='inputlabel'>Role</p>
                                <input type="text" id='role' placeholder='Role' className='inputdiv' value={role} onChange={(e) => setRole(e.target.value)} hidden />
                                <label htmlFor="role" ></label>
                                <select name="" className='inputdiv' id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                            <div>
                                <p className='inputlabel'>Username</p>
                                <input type="text" placeholder='Username' className='inputdiv' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <p className='inputlabel'>Password</p>
                                <input type="password" placeholder='Password' className='inputdiv' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            
                        </div>
                        

                        <div className='btndiv'>
                            <button type='reset' className='cancelbtn' onClick={()=>window.location.reload()}>Cancel</button>
                            <button type='submit' className='uploadbtn'>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser