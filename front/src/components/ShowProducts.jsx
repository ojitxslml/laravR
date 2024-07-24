import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ShowProducts = () => {

const [products, setProducts] = useState([]);

const endpoint = 'http://localhost:8000/api'

useEffect(() => {
getAllProducts()    
}, []);

const getAllProducts = async () => {
   try {
      const response = await axios.get(`${endpoint}/products`);
      setProducts(response.data);  // Set products state with array of data
   } catch (error) {
      console.error('Error fetching products:', error);
   }
}

const deleteProduct = async (id) => {  // Ensure deleteProduct accepts id parameter
   try {
      await axios.delete(`${endpoint}/product/${id}`);
      getAllProducts();  // Refresh products after delete
   } catch (error) {
      console.error('Error deleting product:', error);
   }
}


  return (
    <div>
        
       <div className='d-grid gap-2'>
        <Link to="/create" className='btn btn-success btn-lg mt-2 text-white'>Create</Link>
       </div>
       <table className='table table-stripped'>
        <thead className='bg-primary text-white'>
            <tr>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            { products.map( (product) =>(
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                            <Link to={`/edit/${product.id}`} className='btn btn-warning'>Edit</Link>
                            <button className="btn btn-danger" onClick={() => deleteProduct(product.id)} >Delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
       </table>
    </div>
  )
}

export default ShowProducts