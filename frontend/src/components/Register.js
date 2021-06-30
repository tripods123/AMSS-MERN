import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import Loadingspinner from './Loadingspinner';
function Register() {
    const history = useHistory();
    const [status, setloggedstatus] = useState('');
    const [criteriaerror, setcriteriaerror] = useState('');
    const [passwordmatch, setpasswordmatcherror] = useState('');
    const [registererror, setregistererror] = useState('');

    //for user registration
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [regemail, setemail] = useState('');
    const [regpassword, setregpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [regusername, setregusername] = useState('');
    const [phone, setphone] = useState('');
    const [availability, setavailability] = useState('');

    const checkpasswordstrength = () => {
        if (regpassword !== '') {
            let regex = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if (regex.test(regpassword) === true) {
                setcriteriaerror(false);
            } else {
                setcriteriaerror(true);
            }
        }
    }
    const checkpasswords = () => {
        if (regpassword !== undefined && confirmpassword !== undefined) {
            if (regpassword !== confirmpassword) {
                setpasswordmatcherror(true);
            } else {
                setpasswordmatcherror(false);
            }
        }
    }
    const checkavailability = (e) => {
        e.preventDefault();
        if (regusername !== '') {
            axios({
                method: 'GET',
                url: 'https://amss-backend.herokuapp.com/user/availability/' + regusername,
                withCredentials: true
            }).then((response) => {
                setavailability(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    useEffect(() => {
        const cl1 = document.getElementById('close1');
        cl1.click();
        axios({
            method: 'GET',
            url: 'https://amss-backend.herokuapp.com/auth/getstatus',
        }).then((response) => {
            setloggedstatus(true);
        }).catch((error) => {
            setloggedstatus(false);
        });
    }, []);
    const submitValueRegister = (e) => {
        e.preventDefault();
        if (availability === true && criteriaerror === false && passwordmatch === false) {
            axios({
                method: 'POST',
                url: 'https://amss-backend.herokuapp.com/user/create',
                withCredentials: true,
                data: {
                    'name': name,
                    'username': regusername,
                    'phone': phone,
                    'email': regemail,
                    'password': regpassword,
                    'address': address
                }
            }).then((response) => {
                history.push('/');
            }).catch((error) => {
                if (error !== undefined) {
                    if (error.response.status === 500) {
                        setregistererror(true);
                    }
                }
            });
        }
    }

    if (status === '') {
        return (<Loadingspinner />);
    } else if (status === true) {
        return (<Redirect to="/"/>);
    } else {
        return (
            <div style={{ 'height': '100%' }}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-sm' />
                        <div className='col-sm'>
                            <h1 className='display-6'>New User Signup!</h1>
                            <form>
                                <input type="text" className='form-control' placeholder="Name" onChange={e => setname(e.target.value)} required /><br />
                                <input type="email" className='form-control' placeholder="Email" onChange={e => setemail(e.target.value)} required /><br />
                                <div className="input-group mb-3">
                                    <input type="text" className='form-control' placeholder="Username" onChange={e => setregusername(e.target.value)} required />
                                    <button onClick={e => checkavailability(e)} className='btn btn-primary'>Check</button>
                                </div>
                                {availability === true ? <Alert message='Username available' type='success' /> : availability === false ? <Alert message='Username not available' type='danger' /> : null}
                                <br/>
                                <input type="password" className='form-control' placeholder="Password" onChange={e => setregpassword(e.target.value)} onKeyUp={checkpasswordstrength} required /><br />
                                {criteriaerror === true ? <Alert message='Passwords do not match criteria' type='danger' /> : criteriaerror === false ? <Alert message='Passwords match criteria' type='success' /> : null}
                                <input type="password" className='form-control' placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} onKeyUp={checkpasswords} required /><br />
                                {passwordmatch === true ? <Alert message='Passwords do not match' type='danger' /> : passwordmatch === false ? <Alert message='Passwords match' type='success' /> : null}
                                <input type="text" className='form-control' placeholder="Phone" onChange={e => setphone(e.target.value)} required /><br />
                                <textarea className='form-control' placeholder="Address" onChange={e => setaddress(e.target.value)}></textarea><br />
                                <small><Link to="/registerseller">Want to sell with us ?</Link></small><br /><br />
                                {registererror !== '' ? <Alert message='Internal server error' type='danger' /> : null}
                                <button onClick={e =>submitValueRegister(e)}className='btn btn-primary'>Signup</button>
                            </form>
                        </div>
                        <div className='col-sm' />
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;