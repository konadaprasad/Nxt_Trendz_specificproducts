// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {items} = props
  const {imageUrl, title, brand, rating, price} = items

  return (
    <li className="list-cont">
      <img src={imageUrl} alt="similar product" className="image" />
      <p className="title">{title}</p>
      <p className="para1">by{brand}</p>
      <div className="conty">
        <p className="price">RS {price}/- </p>
        <div className="con12">
          <p className="para">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
