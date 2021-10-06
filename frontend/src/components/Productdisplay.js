import React from 'react';
import axios from 'axios';
import Carousel from './carousel';
import Alert from './Alert';
import Loadingspinner from './Loadingspinner';
class ProductDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			product: [],
			shopname: [],
			error: '',
			fetched: false,
			success:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		axios({
			method: 'POST',
			url: 'https://amss-backend.herokuapp.com/cart/addtocart',
			withCredentials: true,
			data: {
				'id': this.props.match.params.productId,
			}
		}).then((response) => {
			this.setState({ success: true })
		}).catch((error) => {
			if (error !== undefined) {
				if (error.response.status === 400) {
					this.setState({ error: 'Cannot have products from 2 different sellers' });
				} else if (error.response.status === 403) {
					this.setState({ error: 'First Login then add products' });
				}
			}
		});
	}
	handleChange(name, value) {
		this.setState({ [name]: value });
	}
	componentDidMount() {
		const fetchproduct = () => {
			axios({
				method: 'GET',
				url: 'https://amss-backend.herokuapp.com/product/getsingle/' + this.props.match.params.productId,
				withCredentials: true,
			}).then((response) => {
				this.setState({ product: response.data, fetched: true });
				this.setState({ shopname: response.data[0]['shop'] });
			}).catch((error) => {
				if (error === undefined) {
					return;
				}
				if (error.response === undefined) {
					return;
				}
				this.setState({ fetched: true, error: error.response.status });
			});
		};
		fetchproduct();
	}
	render() {
		if (this.state.fetched === false) {
			return (<Loadingspinner />);
		} else
			return (
				<div className='container'>
					{this.state.product.length !== 0 && this.state.shopname.length !== 0 ?
						<div className='row justify-contents-start'>
							<div className='col-sm align-self-center'>
								<Carousel images={this.state.product[0]['image']} />
							</div>
							<div className='col-sm'>
								<div>
									<small className='text-muted'><h1 className='display-6'>{this.state.product[0]['name']}</h1></small>
								</div>
								<div>
									<h6>Brand: <small className='text-muted'>{this.state.product[0]['brand']}</small></h6>
								</div>
								<div>
									<h6>Sold by: <small className='text-muted'>{this.state.shopname[0]['shopname']}</small></h6>
								</div>
								<div>
									<h6>Price: <small className='text-muted'>{this.state.product[0]['price']}</small></h6>
								</div>
								<div>
									<h6>{this.state.product[0]['productdescription']}</h6>
								</div>
								<div>
									<button className='btn btn-primary' onClick={this.handleSubmit}>Add to Cart</button>
								</div>
								{this.state.error !== '' ? <Alert message={this.state.error} type='danger' /> : null}
								{this.state.success !== '' ? <Alert message='Product added to cart successfully.' type='success' /> : null}
							</div>
						</div> : null}
				</div>
			);
	}
}

export default ProductDisplay;