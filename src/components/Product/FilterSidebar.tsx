import React from 'react';
import { Collapse, Slider, Select, Button, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import Sider from 'antd/es/layout/Sider';

const { Panel } = Collapse;
const { Option } = Select;

const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

interface FilterSidebarProps {
    onApplyFilters: () => void;
    selectedCategory: string;
    onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    priceRange: number[];
    onPriceChange: (value: number[]) => void;
    sortOrder: string;
    onSortChange: (value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    onApplyFilters,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    sortOrder,
    onSortChange
}) => {
    const { t } = useTranslation();

    return (
        <Sider width={300} style={{ background: '#fff', padding: '20px' }}>
            <h1>{t('ProductPage.filter')}</h1>
            <Collapse defaultActiveKey={['1']} bordered={false}>
                <Panel header={t('ProductPage.category')} key="1">
                    <Radio.Group onChange={onCategoryChange} value={selectedCategory}>
                        <Radio value="">{t('ProductPage.allCategories')}</Radio>
                        {categories.map(category => (
                            <div key={category}>
                                <Radio value={category}>{category}</Radio>
                            </div>
                        ))}
                    </Radio.Group>
                </Panel>
                <Panel header={t('ProductPage.priceRange')} key="2">
                    <Slider
                        range
                        min={0}
                        max={200}
                        step={10}
                        value={priceRange}
                        onChange={onPriceChange}
                        tipFormatter={(value) => `$${value}`}
                    />
                    <div>{t('ProductDetailPage.price')}: ${priceRange[0]} - ${priceRange[1]}</div>
                </Panel>
                <Panel header={t('ProductPage.sortBy')} key="3">
                    <Select defaultValue={sortOrder} style={{ width: '100%' }} onChange={onSortChange}>
                        <Option value="asc">{t('ProductPage.priceLowToHigh')}</Option>
                        <Option value="desc">{t('ProductPage.priceHighToLow')}</Option>
                    </Select>
                </Panel>
            </Collapse>
            <Button type="primary" style={{ marginTop: '20px', width: '100%' }} onClick={onApplyFilters}>
                {t('ProductPage.filter')}
            </Button>
        </Sider>
    );
};

export default FilterSidebar;
