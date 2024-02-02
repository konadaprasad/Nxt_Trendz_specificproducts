// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

import ImageRoute from '../ImageRoute'

import './index.css'

const itemsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {
    productDetailsList: [],
    similarProductsList: [],
    count: 1,
    status: '',
  }

  componentDidMount() {
    this.onViewDetails()
  }

  onViewDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    this.setState({status: itemsStatus.loading})

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response.status)
    if (response.ok === true) {
      const updateData = await response.json()

      const data = {
        id: updateData.id,
        imageUrl: updateData.image_url,
        title: updateData.title,
        style: updateData.style,
        price: updateData.price,
        description: updateData.description,
        brand: updateData.brand,
        totalReviews: updateData.total_reviews,
        rating: updateData.rating,
        availability: updateData.availability,
      }
      const similarData = updateData.similar_products.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        style: eachItem.style,
        price: eachItem.price,
        description: eachItem.description,
        brand: eachItem.brand,
        totalReviews: eachItem.total_reviews,
        rating: eachItem.rating,
        availability: eachItem.avialability,
      }))
      this.setState({
        productDetailsList: data,
        similarProductsList: similarData,
        status: itemsStatus.success,
      })
    } else {
      this.setState({status: itemsStatus.failure})
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    console.log(count)
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    } else {
      this.setState({count: 1})
    }
  }

  imageRoute = () => {
    const {productDetailsList, count} = this.state
    const {
      imageUrl,
      title,
      brand,
      totalReviews,
      availability,
      rating,
      price,
      description,
    } = productDetailsList

    return (
      <div className="inner-container">
        <div className="cont1">
          <img src={imageUrl} alt="product" className="product-img" />
        </div>
        <div className="cont2">
          <h1 className="heading">{title}</h1>
          <p className="heading2">RS {price}/- </p>
          <div className="cont">
            <div className="con">
              <p className="para">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star-img"
              />
            </div>
            <p className="para1">{totalReviews} Reviews</p>
          </div>
          <p className="para1">{description}</p>
          <p className="para2">
            <span className="spanitem">Available: </span>
            {availability}
          </p>
          <p className="para2">
            <span className="spanitem">Brand: </span>
            {brand}
          </p>
          <hr className="line" />
          <div className="btn-cont">
            <button
              className="btn1"
              type="button"
              data-testid="minus"
              onClick={this.onDecrement}
            >
              .<BsDashSquare />
            </button>

            <p className="para1">{count}</p>
            <button
              className="btn1"
              type="button"
              data-testid="plus"
              onClick={this.onIncrement}
            >
              .<BsPlusSquare />
            </button>
          </div>
          <button className="btn" type="button">
            ADD TO CART
          </button>
        </div>
      </div>
    )
  }

  successDisplay = () => {
    const {productDetailsList, count, similarProductsList} = this.state
    return (
      <div className="main-container">
        <Header />
        {this.imageRoute()}
        <div className="second-container">
          <h1 className="heading1">Similar Products</h1>
          <ul className="un-order">
            {similarProductsList.map(eachItem => (
              <SimilarProductItem items={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  failureDisplay = () => (
    <div className="main-container">
      <Header />
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="errorImg"
        />
        <h1 className="heading">Product Not Found</h1>
        <Link to="/products">
          <button className="btn2" type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case itemsStatus.loading:
        return (
          <div data-testid="loader" className="container">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        )

      case itemsStatus.success:
        return this.successDisplay()

      case itemsStatus.failure:
        return this.failureDisplay()

      default:
        return null
    }
  }
}
export default ProductItemDetails
