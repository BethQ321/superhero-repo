//import React from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

const SingleProduct = ({ products, users,  cartItems, createLineItem, updateLineItem, auth }) => {

    const params = useParams()
    const id = params.id

    const oneProduct = products.find((product) => {
        return product.id === id
    })

    //console.log(oneProduct)

    //const cartItem = cartItems.find(lineItem => lineItem.product_id === oneProduct.id);

    
    const [review, setReview] = useState([]);
    const ReviewO = {
        review: review
    }

    const ReviewB = {
        review: "Best",
        producid: oneProduct,
        user: null
    }


    const handleReviewerSubmit = async (ReviewC) => {
        const words = ReviewC.review
        const ID = oneProduct.id
        const user= `Billy` 
        try{
        const response = await axios.post('/api/product', { ID, words, user });
      console.log(response.data);
    }catch (error) {
        next(error)
    }  
      //await api.createReview({ReviewO})
    
      }


      //const handleReviewerSubmitbeta = async () => {
        //const response = await axios.put(`api/products/`)
      //}

    if (!oneProduct) {
        return "did not find anything"
    } else {
        return (

            <div>

                <h1>{oneProduct.name}</h1>


                {
                    //text box
                }
                

                <form onSubmit={handleReviewerSubmit}>
                    <input
                        type="text"
                        value={review}
                        onChange={(event) => setReview(event.target.value)}
                        placeholder="Place review here"
                        

                    //<button onClick={() => {handleReviewerSubmitbeta(ReviewB)}}>Add</button>

                    />
                    <button type="submit">Add review</button>
                </form>

                <br />

                


                <br />
                <Link to='/products'><button>Back to Products</button></Link>
            </div>
        )
    }

}

export default SingleProduct