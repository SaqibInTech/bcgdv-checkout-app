const _ = require('lodash');

const priceMapping = [{
        watchID: '001',
        watchName: 'Rolex',
        price: 100,
        discountAvailable: true,
        discountQuantity: 3,
        discountPrice: 200,
    },
    {
        watchID: '002',
        watchName: 'Michael Kors',
        price: 80,
        discountAvailable: true,
        discountQuantity: 2,
        discountPrice: 120,
    },
    {
        watchID: '003',
        watchName: 'Swatch',
        price: 50,
        discountAvailable: false,
    },
    {
        watchID: '004',
        watchName: 'Casio',
        price: 30,
        discountAvailable: false,
    },
];

const getAllCatalog = () => {
    return priceMapping;
};

const getCatalogByID = (id) => {
    return _.find(priceMapping, {
        watchID: id
    });
};

module.exports = {
    getAllCatalog,
    getCatalogByID
};
