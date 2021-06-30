import React, { useEffect ,useState } from "react";
import axios from 'axios';
import Alert from './Alert';
function Register_seller(){
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
    const [pincode, setpincode] = useState('');
    const [password, setpassword] =  useState('');
    const [confirm_password, setconfirmpassword] = useState('');
    const [email, setemail] = useState('');
    const [fullname, setfullname] = useState('');
    const [address, setaddress] = useState('');
    useEffect(() => {
        axios({
            url: 'https://amss-backend.herokuapp.com/',
            method:'GET'
        }).then((response) => {
            setstates(response.data);
        }).catch((error) => {
            console.error(error);
        })
    },[])
    const selectState = (e) =>{
        setstate(e.target.value);
        axios({
            method:'GET',
            url:''+e.target.value,
        }).then((response)=>{
            setcities(response.data)
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
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
                url: 'http://amss-backend.herokuapp.com/user/availability/'+username,
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
                url:'',
                data:{
                    'address': address,
                    'username': username,
                    'state': state,
                    'city': city,
                    'gst': gstn,
                    'pincode': pincode,
                    'password': password,
                    'email': email,
                    'phone': phone,
                    'fullname': fullname
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
    return(
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-sm'></div>
                <div className='col-sm'><br/>
                    <h1 className='display-7'>New Seller Signup!</h1>
                    <br/>
                    <form onSubmit={onFormValueSubmit}>
                        <input type="text" className='form-control' placeholder="Full Name" onChange={e => setfullname(e.target.value)} required/><br/>
                        <input type="email" className='form-control' placeholder="Email"  onChange={e => setemail(e.target.value)} required/><br/>
                        <div className="input-group mb-3">
                            <input type="text" className='form-control' placeholder="Username" onChange={e => setusername(e.target.value)} required/>
                            <button onClick={e=> checkavailability(e)} className='btn btn-primary'>Check</button>
                        </div>
                        {availability===true ? <Alert message='Username available' type='success'/>: availability === false ? <Alert message='Username not available' type='danger'/> :null}
                        <br/>
                        <input type="password" className='form-control' placeholder="Password" onChange={e => setpassword(e.target.value)} onKeyUp={checkpasswordstrength} required/><br/>
                        {criteriaerror === true ? <Alert message='Passwords do not match criteria' type='danger'/>:criteriaerror === false? <Alert message='Passwords match criteria' type='success'/> :null}
                        <input type="password" className='form-control' placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} onKeyUp={checkpasswords} required/><br/>
                        {passwordmatch === true ? <Alert message='Passwords do not match' type='danger'/>:passwordmatch === false? <Alert message='Passwords match' type='success'/> :null}
                        <input type="tel" className='form-control' placeholder="Phone" onChange={e => setphone(e.target.value)} required/><br/>
                        <input type="text" className='form-control' placeholder="GST number" onChange={e => setgst(e.target.value)} required/><br/>
                        <textarea className='form-control' placeholder="Address" onChange={e => setaddress(e.target.value)}></textarea><br/>
                        <input type="text" className='form-control' placeholder="Pin code" onChange={e => setpincode(e.target.value)} required/><br/>
                        <select className='form-select' onChange={e => selectState(e)}>
                            {states.map((state_name)=>{
                                return(<option value={state_name}>{state_name}</option>)
                            })}
                        </select>
                        <br/>
                        <select className='form-select' onChange={e => setcity(e.target.value)}>
                            {cities.map((city_name)=>{
                                return(<option value={city_name}>{city_name}</option>)
                            })}
                        </select><br/>
                        {error!==''?<Alert message='Internal server error' type='danger'/>:null}
                        <button type='submit' className='btn btn-primary'>Signup</button>
                    </form>
                </div>
                <div className='col-sm'></div>
            </div>
        </div>
    );
}
export default Register_seller;