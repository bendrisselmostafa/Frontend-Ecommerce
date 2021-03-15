import React, { Fragment, useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'

import { isAuthenticated } from './../auth/helpers'

import { totalItem } from './../helpers/cartHelpers'
import { MDBIcon} from 'mdbreact';
import toastr from 'toastr';
import "toastr/build/toastr.css";
import 'mdb-ui-kit/css/mdb.min.css';

import img from './../assets/creative_market.png';

import {API_URL} from './../config'


const isActive = (history, path) => {

    if(history.location.pathname === path) {
        return { color: '/000' }
    }
    else{
        return { color: '/fff' }
    }

}


const Menu = (props) => {


    const [totalItemToCart, setTotalItemToCart] = useState(0)

    useEffect(() => {
         setTotalItemToCart(totalItem())
    }, [localStorage])

    const signout = () => {

        fetch(`${API_URL}/signout`)
          .then(() => {

            toastr.info('User Signout', 'Next Time', {
                positionclassName: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/signin')

          })
          .catch()

    }


    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container">
          <div className="d-flex">
            <Link
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              to="/"
            >
              <img src={img} height="50" alt="" />
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <Fragment>
                <li className="nav-item ">
                  <Link
                    style={isActive(props.history, "/")}
                    className="nav-link"
                    to="/"
                  >
                    <MDBIcon icon="home" /> Home{" "}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li className="nav-item ">
                  <Link
                    style={isActive(props.history, "/shop")}
                    className="nav-link"
                    to="/shop"
                  >
                    {" "}
                    <MDBIcon icon="shopping-bag" /> Shop{" "}
                  </Link>
                </li>

                <li className="nav-item ">
                  <Link
                    style={isActive(props.history, "/dashboard")}
                    className="nav-link"
                    to={`${
                      isAuthenticated() && isAuthenticated().user.role === 1
                        ? "/admin"
                        : ""
                    }/dashboard`}
                  >
                    <MDBIcon icon="user-alt" /> Profile
                  </Link>
                </li>
              </Fragment>
            </ul>
            <ul className="navbar-nav right ms-auto">
              {!isAuthenticated() && (
                <Fragment>
                  <li className="nav-item ">
                    <Link
                      style={isActive(props.history, "/signin")}
                      className="nav-link"
                      to="/signin"
                    >
                      <MDBIcon icon="sign-in-alt" />  Signin
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      style={isActive(props.history, "/signup")}
                      className="nav-link"
                      to="/signup"
                    >
                      <MDBIcon icon="id-badge" /> Register
                    </Link>
                  </li>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <MDBIcon icon="shopping-cart" />
                      <span className="badge rounded-pill badge-notification bg-danger">
                        {totalItemToCart}
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={signout}
                    >
                      <MDBIcon icon="sign-out-alt" />  Signout
                    </span>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default withRouter(Menu) 

