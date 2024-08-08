import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from 'axios';
import { baseURL } from '../../config';

interface DataType {
  key: React.Key;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Username',
    dataIndex: 'username',
    sorter: (a, b) => a.username.localeCompare(b.username),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
];

const AdminPage: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/users');
        const users = response.data.map((user: any) => ({
          key: user.id,
          name: `${user.name.firstname} ${user.name.lastname}`,
          username: user.username,
          email: user.email,
          address: `${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
          phone: user.phone,
        }));
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
};

export default AdminPage;
