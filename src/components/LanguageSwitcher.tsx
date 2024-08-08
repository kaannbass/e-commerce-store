import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLanguage } from '../store/languageSlice';

const { Option } = Select;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  const languages = [
    { code: 'tr', label: 'TR', svg: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#d12d24"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M19.807 16L21 14.358 19.069 14.985 17.876 13.342 17.876 15.373 15.945 16 17.876 16.627 17.876 18.658 19.069 17.015 21 17.642 19.807 16z"></path><path d="M15.953,19.325c-1.837,1.65-4.663,1.5-6.314-.337s-1.5-4.663,.337-6.314c1.837-1.65,4.663-1.5,6.314,.337-.442-.699-1.035-1.292-1.734-1.734-2.608-1.65-6.06-.874-7.711,1.734-1.65,2.608-.874,6.06,1.734,7.711,2.608,1.65,6.06,.874,7.711-1.734-.106,.118-.219,.231-.337,.337Z" fill="#fff"></path></svg> },
    { code: 'en', label: 'EN', svg: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path fill="#be2a2a" d="M31 14L18 14 18 4 14 4 14 14 1 14 1 18 14 18 14 28 18 28 18 18 31 18 31 14z"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg> },
  ];
  const handleLanguageChange = (value: 'en' | 'tr') => {
    i18n.changeLanguage(value);
    dispatch(setLanguage(value));
  };

  return (
    <Select
      value={language}
      style={{ width: '100%' }}
      onChange={handleLanguageChange}
    >
      {languages.map((lang) => (
        <Option value={lang.code} key={lang.code}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {lang.svg}
            <span style={{ marginLeft: 8 }}>{lang.label}</span>
          </span>
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
