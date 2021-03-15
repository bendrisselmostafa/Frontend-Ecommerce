import React, { useState } from 'react'
import Layout from './../core/Layout'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import { API_URL } from './../config'
import { Link } from 'react-router-dom';
import { MDBCard,MDBCardBody, MDBContainer, MDBInput } from "mdbreact"
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Signin = (props) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignin = e => {

        e.preventDefault();

        fetch(`${API_URL}/signin`, {
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
                toastr.info('User is authenticated Successfully', 'Welcome', {
                    positionClass: "toast-bottom-left",
                })

                localStorage.setItem('jwt_info', JSON.stringify(res))

                props.history.push('/')
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
            <form onSubmit={submitSignin}>
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
                Sign in
              </button>
              <br />
              <div class="text-center">
                <p>
                  Not a member? <Link to="/signup">Register</Link>
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
           title="Sign In" 
           description="Sign in App" 
           className="container"
        >
         <br/><br/><br/>
        <div className="row">
            <div className="col-md-6 mx-auto">
                { form() } 
            </div>
        </div> 

        </Layout>
    </div>
    )
}

export default Signin
