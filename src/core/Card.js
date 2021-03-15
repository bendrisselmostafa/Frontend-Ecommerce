import React from 'react'
import { Link } from 'react-router-dom'

import { addToCart } from './../helpers/cartHelpers';

import ShowImage from './ShowImage';
import moment from 'moment'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';

const Card = ({product, showViewBtn = true}) => {

    const showStock = (quantity) => {
     
         return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
      
    }

    return (
      <MDBCol>
        <MDBCard ecommerce >
          <MDBView cascade>
            <ShowImage
              item={product}
              url="product/photo"
              className="card-img-top"
              style={{ height: "200px" }}
            ></ShowImage>
          </MDBView>

          <MDBCardBody >
            <h5 className="green-text">{product.category.name}</h5>

            <MDBCardTitle className="font-weight-bold">
              {product.name}
            </MDBCardTitle>

            <MDBCardText>
              {product.description.substring(0, 50)}
              <br />
              <span
                style={{ fontSize: "20px" }}
                className=" badge-pill badge-dark"
              >
                ${product.price}
              </span>
              <div className="well">
                <h4>{showStock(product.quantity)}</h4>

                <span>Added {moment(product.createdAt).fromNow()}</span>
              </div>

              {showViewBtn && (
                <Link to={`/product/${product._id}`}>
                  <button className="btn btn-warning mr-1">View</button>
                </Link>
              )}

              {product.quantity > 0 && (
                <MDBBtn
                  onClick={() => addToCart(product)}
                  className="btn btn-success"
                >
                  Add to Cart
                </MDBBtn>
              )}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      /* 
      <MDBRow>
        <MDBCol>
          <MDBCard narrow>
            <MDBView cascade>
              <ShowImage
                item={product}
                url="product/photo"
                className="card-img-top"
              ></ShowImage>
            </MDBView>

            <MDBCardBody>
              <h5 className="pink-text">
                {product.category.name}
              </h5>

              <MDBCardTitle className="font-weight-bold text-center">
                {product.name}
              </MDBCardTitle>

              <MDBCardText className="card bg-dark text-white mb-2 px-2">
                <span style={{ fontSize: "20px" }} className="ml-5 badge-pill badge-dark">
                  ${product.price}
                </span>
                {product.description.substring(0, 50)}
              </MDBCardText>
              <div className="well">
                     <h4>{showStock(product.quantity)}</h4> 
                      
                      <span>Added {moment(product.createdAt).fromNow()}</span>

                  </div>

                  {showViewBtn && (

                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-warning mr-1">View</button>
                      </Link>
                  
                  )}

                  { product.quantity > 0 && (
                    <button onClick={() => addToCart(product)} className="btn btn-success">Add to Cart</button>

                  ) }
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow> */
    );
}

export default Card
