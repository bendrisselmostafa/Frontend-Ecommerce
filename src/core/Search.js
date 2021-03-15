import React, { useState, useEffect } from 'react'
import { getCategories, getProducts } from './ApiCore'
import Card from './Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {MDBCol, MDBIcon, MDBInput, MDBDropdown,MDBDropdownToggle,MDBDropdownItem,MDBDropdownMenu, MDBContainer, MDBRow} from "mdbreact"

const Search = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [result, setResult] = useState('')
    const [searchData, setSearchData] = useState({search: '', category: ''})

    const handleChange = (e) => {

        setSearchData({...searchData, [e.target.id]: e.target.value})

    }


    const resultMessage = () => {

        return products && products.length > 0 && (
            <h3>Found {products.length} Product(s)</h3>
        )

    }
 
    const searchSubmit = (e) => {

        e.preventDefault()

        let { search, category } = searchData

        if(search || category) {

            getProducts({search: search || undefined, category})
              .then(res => setProducts(res))
        }
        else {
            setProducts([])
        }
       

    }

    useEffect(() => {

        getCategories()
          .then(categories => setCategories(categories))

    }, [])

    return (
      <div>
        <form onSubmit={searchSubmit}>
          <div >
            <Container>
              <Row className="row d-flex align-items-center">
                <Col>
                  <select onChange={handleChange} id="category" className="btn">
                    <option value="">Select a Category</option>
                    {categories.map((category, i) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={7}>
                  <MDBInput
                    type="search"
                    id="search"
                    label="Search product"
                    outline
                    icon="search"
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <button className="btn btn-success container">Search</button>
                </Col>
              </Row>
            </Container>
          </div>
        </form>
        {resultMessage()}

        <div className="row">
          {products.map((product, i) => (
            <div key={product._id} className="col-md-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
}

export default Search
