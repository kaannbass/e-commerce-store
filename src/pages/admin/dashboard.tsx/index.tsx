import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Col, Row } from 'antd';
import { baseURL } from '../../../config';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage: React.FC = () => {
  const [productChartData, setProductChartData] = useState<any>({ labels: [], datasets: [] });
  const [cartChartData, setCartChartData] = useState<any>({ labels: [], datasets: [] });
  const [userChartData, setUserChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseURL + '/products');
        const products = response.data;
        const categories = [...new Set(products.map((product: any) => product.category))];

        const categoryCounts = categories.map(category =>
          products.filter((product: any) => product.category === category).length
        );

        setProductChartData({
          labels: categories,
          datasets: [
            {
              label: 'Product Count',
              data: categoryCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCarts = async () => {
      try {
        const response = await axios.get(baseURL + '/carts');
        const carts = response.data;

        const dateProductMap: { [key: string]: number } = {};

        carts.forEach(cart => {
          const date = new Date(cart.date).toLocaleDateString();
          cart.products.forEach(product => {
            const quantity = product.quantity;

            if (dateProductMap[date]) {
              dateProductMap[date] += quantity;
            } else {
              dateProductMap[date] = quantity;
            }
          });
        });

        const labels = Object.keys(dateProductMap);
        const data = Object.values(dateProductMap);

        setCartChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Quantity by Date',
              data: data,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseURL + '/users');
        const users = response.data;
        const userCount = users.length;

        setUserChartData({
          labels: ['Total Users'],
          datasets: [
            {
              label: 'User Count',
              data: [userCount],
              backgroundColor: ['rgba(153, 102, 255, 0.6)'],
              borderColor: ['rgba(153, 102, 255, 1)'],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    fetchProducts();
    fetchCarts();
  }, []);

  return (
    <Row gutter={[16, 30]}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h2>Product Count by Category</h2>
          <Bar data={productChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h2>User Count</h2>
          <Doughnut data={userChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h2>Total Quantity by Date</h2>
          <Bar data={cartChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Col>
    </Row>
  );
};

export default DashboardPage;
