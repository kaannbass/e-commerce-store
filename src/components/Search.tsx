import React from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Search: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Input
            style={{ width: '90%' }}
            placeholder={t('HomePage.search')}
            variant="filled"
        />
    )
};

export default Search;
