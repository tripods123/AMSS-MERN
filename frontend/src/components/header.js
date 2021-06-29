import React, { useEffect} from 'react';
import Loginmodal from './LoginModal';
import '../App.css';
import {Link} from 'react-router-dom';

function Header(){
	const links = [
		{title:'Home', path:'/'},
		{ title: `About us`, path: `/about` },
		{ title: `Product`, path: `/product/all/1` },
		{ title: `FAQ`, path: `/faq` },
		{ title: `Login`, path: `/login` }];
	//const [links,setLinks]=useState([]);
	useEffect(()=>{
		// axios({
		// 	method:'GET',
		// 	url:'https://amss-backend.herokuapp.com/auth/getlinks',
		// 	withCredentials:true
		// }).then((response)=>{
		// 	setLinks(response.data);
		// }).catch((error)=>{
		// 	setLinks([]);
		// })
	},[]);
	//get links from backend
    return (
		<nav className='navbar navbar-expand-lg navbar-light' style={{'backgroundColor':'#B0E0E6'}}>
            <div className='container-fluid'>
                <a className='navbar-brand' style={{'color':'#C71585'}} href='/'>AMSS</a>
				<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
      				<span className='navbar-toggler-icon'></span>
    			</button>
                <div className='collapse navbar-collapse' id='navbarToggler'>
					<div className='ms-auto p-2 bd-highlight'>
                    	<ul className='navbar-nav mb-2 mb-lg-0'>
							{links.length !== 0 ? links.map(({title,path})=>(
								title==='Login'?
									<li className='nav-item' key={title}>
										<Link className='nav-link' style={{'color':'#750D37'}} aria-current='page' to="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
											{title}
										</Link>
										<Loginmodal id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"/>
									</li>
								:
									<li className='nav-item' key={title}>
									<Link className='nav-link' style={{'color':'#750D37'}} aria-current='page' to={path}>
										{title}
									</Link>
								</li>
							)):null}
                	    </ul>
					</div>
                </div>
            </div>
			<div>

			</div>
        </nav>
    );
  }


export default Header;