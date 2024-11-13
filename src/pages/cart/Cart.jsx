import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../../redux/slices/productSlice';
import emptyCartImg from '../../assets/images/empty-cart.gif';
import Spinner from '../../components/spinner/Spinner';

import './cart.scss';

const Cart = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { products, status } = useSelector((state) => state.product);

	const [loading, setLoading] = useState(true);
	const [initialProducts, setInitialProducts] = useState([]);

	useEffect(() => {
		dispatch(getProducts(user?.token)).then(() => {
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		setInitialProducts(products?.map(product => ({ ...product, quantity: 1 })));
	}, [products]);

	// const increaseQuantity = () => {
    //     setQuantity(quantity + 1);
    // };

    // const decreaseQuantity = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // };

	console.log(products);
	

	const updateQuantity = (productId, amount) => {
		setInitialProducts(products.map(product =>
			
			product._id === productId
				? { ...product, quantity: Math.max(1, (product.quantity || 1) + amount) }
				: product
		));
	};

    // Function to remove a product from the cart
    const removeProduct = (productId) => {
        setInitialProducts(products.filter(product => product.id !== productId));
    };

	return (
		<>
			<Helmet>
				<meta name={`Pinakotheka | Cart`} />
				<title>Pinakotheka | Cart</title>
			</Helmet>
			<section
				className={`cart`}
				style={{ padding: !products?.length ? '0' : '100px 0 50px' }}
			>
				{loading || status === 'loading' ? (
					<Spinner styles={true} color="#fff" />
				) : (
					<div className="container">
						{products?.length ? (
							<div className="cart__content">
								<ul className="product-list">
									{initialProducts?.map((product) => {
										return (
											<li className="product-list__item" key={product?._id}>
												<article className="product">
													<Link
														to={`${product?.path}${product?._id}`}
														className="product__img-wrapper"
													>
														<img
															width={300}
															height={250}
															src={product?.image}
															alt={product?.name}
															className="product__img"
														/>
														<img
															width={280}
															height={230}
															src={product?.image}
															alt={product?.name}
															className="product__img product__img--copy"
														/>
													</Link>
													<div className="product__details">
														<h2 className="product__title title">
															{product?.name}
														</h2>
														<p className="product-price">
															${product?.price?.toFixed(2)}
														</p>
														<div className="quantity-control">
															<button
																type="button"
																onClick={() => updateQuantity(product._id, -1)}
																disabled={product?.quantity === 1}
															>
																-
															</button>
															<span>{product?.quantity}</span>
															<button type="button" onClick={() => updateQuantity(product?._id, 1)}>+</button>
														</div>
														<button
															type="button"
															className="remove-button"
														>
															Remove
														</button>
														<p className="total-price">
															Total:
															${(product.price * product?.quantity).toFixed(2)}
														</p>
													</div>
												</article>
											</li>
										);
									})}
								</ul>
								<div className="cart__summary">
									<h2 className="title">Cart Summary</h2>
									<div className="cart__summary--content">
										<div className="cart__summary--details">
											<p>Subtotal:</p>
											<p>Total:</p>
											<p>Shipping:</p>
											<p>Total:</p>
										</div>
										<div className="cart__summary--total">
											<p>$0.00</p>
											<p>$0.00</p>
											<p>$0.00</p>
											<p>$0.00</p>
										</div>
									</div>
									<button type="button" className="btn btn--black btn--universal">
										Checkout
									</button>
								</div>
							</div>
						) : (
							<div className="cart__empty">
								<img height={400} width={400} src={emptyCartImg} alt="Empty cart" />
								<h2 className="title">Your cart is empty</h2>
								<p>Add something to it</p>
								<Link
									className="btn btn--black btn--universal cart__empty--link"
									to={'/catalog/paintings'}
								>
									Go to Catalog
								</Link>
							</div>
						)}
					</div>
				)}
			</section>
		</>
	);
};

export default Cart;
