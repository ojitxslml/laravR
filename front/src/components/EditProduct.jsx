import { useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, InputNumber, Button } from 'antd';

const endpoint = 'http://localhost:8000/api/product/';

const EditProduct = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`${endpoint}${id}`);
        form.setFieldsValue({
          description: response.data.description || '',
          price: response.data.price || 0,
          stock: response.data.stock || 0,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProductById();
  }, [id, form]);

  const updateProduct = async (values) => {
    try {
      await axios.put(`${endpoint}${id}`, values);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h3>Edit Product</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={updateProduct}
      >
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please input the stock!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
