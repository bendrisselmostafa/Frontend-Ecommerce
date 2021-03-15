import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import { Link } from 'react-router-dom';
import { API_URL } from './../config'
import { MDBCard,MDBCardBody, MDBContainer, MDBInput} from "mdbreact"

const Signup = (props) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignup = e => {

        e.preventDefault();

        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success('User is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })

                props.history.push('/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={submitSignup}>
              <MDBInput
                type="name"
                id="name"
                label="Name"
                outline
                icon="user"
                onChange={handleChange}
              />
              <MDBInput
                type="email"
                id="email"
                label="E-mail address"
                outline
                icon="envelope"
                onChange={handleChange}
              />

              <MDBInput
                type="password"
                id="password"
                label="Password"
                outline
                icon="unlock-alt"
                onChange={handleChange}
              />

              <button type="submit" className="btn btn-success btn-block">
                Sign up
              </button>
              <br />
              <div class="text-center">
                <p>
                  Have an account already? <Link to="/signin">Signin</Link>
                </p>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );

    return (
      <div>
        <Layout
          title="Sign up"
          description="Sign up Node React Ecommerce App"
          className="container"
        >
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-md-6 mx-auto">{form()}</div>
          </div>
        </Layout>
      </div>
    );
}

export default Signup
