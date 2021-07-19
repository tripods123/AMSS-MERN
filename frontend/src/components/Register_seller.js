import React, { useEffect ,useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import Loadingspinner from './Loadingspinner';
function Register_seller(){
    const [status, setloggedstatus] = useState('');
    const [availability, setusernameavailability] = useState('');
    const [criteriaerror, setcriteriaerror] = useState('');
    const [passwordmatch, setpasswordmatcherror] = useState('');
    const [error, seterror] = useState('');
    
    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);

    const [phone, setphone] = useState('');
    const [username, setusername] = useState('');
    const [state, setstate] = useState('');
    const [city, setcity] = useState('');
    const [gstn, setgst] = useState('');
    const [companycerti, setcompanycerti] = useState('');
    const [pincode, setpincode] = useState('');
    const [password, setpassword] =  useState('');
    const [confirm_password, setconfirmpassword] = useState('');
    const [email, setemail] = useState('');
    const [ownername, setownername] = useState('');
    const [shopname, setshopname] = useState('');
    const [address, setaddress] = useState('');
    useEffect(() => {
        const getstatecities = () => {
            axios({
                url: 'https://amss-backend.herokuapp.com/seller/statescities',
                method:'GET'
            }).then((response) => {
                setstates(response.data[0]);
                setcities(response.data[0]['Andaman and Nicobar Islands'])
                setcity(response.data[0]['Andaman and Nicobar Islands'][0])
                const pre_def_state = Object.keys(response.data[0]);
                setstate(pre_def_state[0])
            }).catch((error) => {
                console.error(error);
            })    
        }
        const getstatus = () => {
            axios({
                method: 'GET',
                url: 'https://amss-backend.herokuapp.com/auth/getstatus',
            }).then((response) => {
                setloggedstatus(true);
            }).catch((error) => {
                setloggedstatus(false);
            });   
        }
        getstatecities();
        getstatus();
    }, []);
    const selectState = (e) =>{
        setstate(e.target.value);
        setcities(states[e.target.value]);
    }
    const checkpasswordstrength = () =>{
        if(password!==''){
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(password)===true){
                setcriteriaerror(false);
            }else{
                setcriteriaerror(true);
            }
        }
    }
    const checkpasswords = () =>{
        if (password !== undefined && confirm_password !== undefined) {  
            if (password !== confirm_password) {
                setpasswordmatcherror(true);
            }else{
                setpasswordmatcherror(false);
            }
        }
    }
    const checkavailability=(e)=>{
        e.preventDefault();
        if(username!==''){
            axios({
                method: 'GET',
                url: 'http://amss-backend.herokuapp.com/seller/availability/'+username,
                withCredentials: true
            }).then((response)=>{
                setusernameavailability(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
    const onFormValueSubmit = () =>{
        if(availability === true && criteriaerror === false && passwordmatch === false){
            axios({
                method:'POST',
                url:'https://amss-backend.herokuapp.com/seller/create',
                data:{
                    'ownername': ownername,
                    'shopname': shopname,
                    'username': username,
                    'address': address,
                    'state': state,
                    'city': city,
                    'gst': gstn,
                    'companycertificate': companycerti,
                    'pincode': pincode,
                    'password': password,
                    'email': email,
                    'phone': phone,
                }
            }).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                if(error !== undefined){
                    if(error.response.status === 500){
                        seterror(true);
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
        if(states!==undefined && states!==[]){
            delete states["_id"];
        }
        return(
            
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-sm'></div>
                    <div className='col-sm'><br/>
                        <h1 className='display-7'>New Seller Signup!</h1>
                        <br/>
                        <form onSubmit={onFormValueSubmit}>
                            <input type="text" className='form-control shadow p-3 bg-body rounded' placeholder="Owner Name" onChange={e => setownername(e.target.value)} required/><br/>
                            <input type="text" className='form-control shadow p-3 bg-body rounded' placeholder="Shop Name" onChange={e => setshopname(e.target.value)} required/><br/>
                            <input type="email" className='form-control shadow p-3 bg-body rounded' placeholder="Email"  onChange={e => setemail(e.target.value)} required/><br/>
                            <div className="input-group mb-3">
                                <input type="text" className='form-control shadow p-3 bg-body rounded' placeholder="Username" onChange={e => setusername(e.target.value)} required/>
                                <button onClick={e=> checkavailability(e)} className='btn btn-primary'>Check</button>
                            </div>
                            {availability===true ? <Alert message='Username available' type='success'/>: availability === false ? <Alert message='Username not available' type='danger'/> :null}
                            <br/>
                            <input type="password" className='form-control shadow p-3 bg-body rounded' placeholder="Password" onChange={e => setpassword(e.target.value)} onKeyUp={checkpasswordstrength} required/><br/>
                            {criteriaerror === true ? <Alert message='Passwords do not match criteria' type='danger'/>:criteriaerror === false? <Alert message='Passwords match criteria' type='success'/> :null}
                            <input type="password" className='form-control shadow p-3 bg-body rounded' placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} onKeyUp={checkpasswords} required/><br/>
                            {passwordmatch === true ? <Alert message='Passwords do not match' type='danger'/>:passwordmatch === false? <Alert message='Passwords match' type='success'/> :null}
                            <input type="tel" className='form-control shadow p-3 bg-body rounded' placeholder="Phone" onChange={e => setphone(e.target.value)} required/><br/>
                            <input type="text" className='form-control shadow p-3 bg-body rounded' placeholder="GST number" onChange={e => setgst(e.target.value)} required/><br/>
                            <div className='mb-3'>
                                <small>
                                    <label htmlFor="fileUpload" className='float-left'>Company Certificate in pdf only</label>
                                </small>
                                <input type="file" className='form-control shadow p-3 bg-body rounded' id="fileUpload" onChange={e => setcompanycerti(e.target.value)} required/><br/>
                            </div>
                            <textarea className='form-control shadow p-3 bg-body rounded' placeholder="Address" onChange={e => setaddress(e.target.value)}></textarea><br/>
                            <input type="text" className='form-control shadow p-3 bg-body rounded' placeholder="Pin code" onChange={e => setpincode(e.target.value)} required/><br/>
                            <div className='input-group mb-3'>
                            <select className='form-select shadow p-3' onChange={e => selectState(e)}>
                                {Object.keys(states).map((key)=>{
                                    return(<option key={key} value={key}>{key}</option>)
                                })}
                            </select>
                            <span className="p-3 input-group-text bg-primary text-white shadow">States</span>
                            </div>
                            <br/>
                            <div className='input-group mb-3'>
                            <select className='form-select shadow p-3 bg-body rounded' onChange={e => setcity(e.target.value)}>
                                {cities.map((city_name)=>{
                                    return(<option value={city_name} key={city_name}>{city_name}</option>)
                                })}
                            </select>
                            <span className="p-3 input-group-text bg-primary text-white shadow">Cities&nbsp;</span>   
                            </div>
                            <br/>
                            {error!==''?<Alert message='Internal server error' type='danger'/>:null}
                            <button type='submit' className='btn btn-primary'>Signup</button>
                        </form><br/>
                    </div>
                    <div className='col-sm'></div>
                </div>
            </div>
        );
    }
}
export default Register_seller;