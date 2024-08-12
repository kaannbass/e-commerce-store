import electronics from '../assets/electronics.jpg';
import jewelery from '../assets/jewelery.jpg';
import femaleClothes from '../assets/female_clothes.jpg';
import mensClothing from '../assets/mens_clothing.jpg';

export const getCardData = (translate: (key: string) => string) => {
    return [
        { title: translate('HomePage.electronics'), src: electronics, link: translate('ProductPage.url') },
        { title: translate('HomePage.jewelery'), src: jewelery, link: translate('ProductPage.url') },
        { title: translate("HomePage.mens clothing"), src: femaleClothes, link: translate('ProductPage.url') },
        { title: translate("HomePage.womens clothing"), src: mensClothing, link: translate('ProductPage.url') },
    ];
};


export const getCategoriesData = (translate: (key: string) => string) => {
    return [
        { id: 1, value: "electronics", text: translate('ProductPage.electronics') },
        { id: 2, value: "jewelery", text: translate('ProductPage.jewelery') },
        { id: 3, value: "men's clothing", text: translate('ProductPage.mensClothing') },
        { id: 4, value: "women's clothing", text: translate('ProductPage.womensClothing') }
    ];
};
