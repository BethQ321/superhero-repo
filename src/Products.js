import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
//Needed for search feature 
const [searchQuery, setSearchQuery] = useState('')
const [filteredProducts, setFilteredProducts] = useState(products)

useEffect(() => {
  setFilteredProducts(products)
}, [products]);

  // format price 
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

//search feature 

const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};


const handleSearchClick = () => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
      setFilteredProducts(filtered)
  };
//show all button
const handleShowAllClick = () => {
  setFilteredProducts(products);
  setSearchQuery('');
};

  return (
    <div>
      <h2>Products</h2>
        <input 
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={handleShowAllClick}>Show All</button>
        <ul>
        {
          filteredProducts.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                { product.name } - { formatPrice(product.price) }
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
