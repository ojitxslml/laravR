import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/product/'

const EditProduct = () => {
    const [description, setDescription] = useState('');
    const [price , setPrice ] = useState(0);
    const [stock , setStock ] = useState(0);
    const {id} = useParams()
    const navigate = useNavigate();
    const update = async(e) =>{
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            description: description,
            price: price,
            stock: stock
        })
        navigate('/')
    }

useEffect(() => {
    const getProudctById = async () => {
        try {
            const response = await axios.get(`${endpoint}${id}`);
            setDescription(response.data.description || '');
            setPrice(response.data.price || 0);
            setStock(response.data.stock || 0);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }
    getProudctById();
}, []);


  return (
    <div>
    <h3>Edit Product</h3>
    <form onSubmit={update}>
        <div className='mb-3'>
            <label className='form-label'>Description</label>
            <input value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            className='form-control' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Precio</label>
            <input value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            className='form-control' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Stock</label>
            <input value={stock}
            onChange={(e) => setStock(e.target.value)}
            type='number'
            className='form-control' />
        </div>
        <button type='submit' className='btn btn-primary'>update</button>
    </form>
</div>
  )
}

export default EditProduct