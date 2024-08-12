import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCategoriesData } from '../../../data';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });



const AddNewProductPage: React.FC = () => {
    const { t } = useTranslation();
    const categories = getCategoriesData(t)
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);

    const onFinish = async (values: any) => {
        try {
            const imageFile = fileList.length > 0 ? fileList[0].originFileObj : null;
            const base64Image = imageFile ? await getBase64(imageFile) : '';

            const existingProducts = JSON.parse(localStorage.getItem('NewProduct') || '[]');

            const productExists = existingProducts.some((item) => item.title === values.title);

            if (productExists) {
                message.warning('A product with this title already exists.');
                return;
            }

            const newId = existingProducts.length > 0 ? existingProducts[existingProducts.length - 1].id + 1 : 1;

            const productData = {
                id: newId,
                ...values,
                image: base64Image,
            };

            existingProducts.push(productData);

            localStorage.setItem('NewProduct', JSON.stringify(existingProducts));

            message.success('Product added successfully!');

            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error('Error adding product:', error);
            message.error('Failed to add product.');
        }
    };


    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2>Add Product</h2>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form.Item label="Product Image">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </div>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select placeholder="Select a category">
                        {categories.map(category => (
                            <Option key={category.id} value={category.value}>{category.text}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddNewProductPage;
