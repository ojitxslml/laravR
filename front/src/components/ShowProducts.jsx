import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  const endpoint = 'http://localhost:8000/api';

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${endpoint}/products`);
      setProducts(response.data); // Asegúrate de que response.data es un array de objetos
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${endpoint}/product/${id}`);
      getAllProducts(); // Refrescar los productos después de eliminar
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description', // Asegúrate de que esto coincide con la clave en los datos de tu API
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price', // Asegúrate de que esto coincide con la clave en los datos de tu API
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock', // Asegúrate de que esto coincide con la clave en los datos de tu API
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/edit/${record.id}`} className='btn btn-warning' style={{ marginRight: 8 }}>
            Edit
          </Link>
          <Button type="danger" onClick={() => deleteProduct(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className='d-grid gap-2'>
        <Link to="/create" className='btn btn-success btn-lg mt-2 text-white'>
          Create
        </Link>
      </div>
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default ShowProducts;