const _ = require('lodash')
const catalog = require('../models/catalog')
let cache = {}

exports.checkout = (cartItems) => {

    if (!isCartValid(cartItems)) {
        return {
            success: false,
            message: "Error in finding some watch ID, Please check if watch ID(s) are correct",
            data: {}
        }
    }

    //count cart items by watchID  i.e {'001':2, '002': 1}
    const uniqueWatchCount = _.countBy(cartItems);

    //Retrieving each watch price based on the quantity and summing up the total price using functional programming
    const totalCost = Object.entries(uniqueWatchCount)
        .map(([watchId, count]) => retrieveTotalPriceByWatchID(watchId, count))
        .reduce((total, price) => total + price, 0);

    // Return the total cost as a JSON object
    return {
        success: true,
        message: "Checkout successful",
        data: {
            price: totalCost
        }
    };
}

//Utility functions
const retrieveTotalPriceByWatchID = (watchID, quantity) => {
    if (cache[watchID] === undefined) {
        cache[watchID] = catalog.getCatalogByID(watchID)
    }
    const item = cache[watchID]
    if (item.discountAvailable) {
        return getTotalPriceAfterDiscount(quantity, item.discountQuantity, item.price, item.discountPrice);
    }
    return item.price * quantity;
};

const getTotalPriceAfterDiscount = (quantity, discountQuantity, regularPrice, discountedPrice) => {

    /* Discount scenarios to be handled here */
    if (quantity >= discountQuantity) {
        const discountedItemCount = Math.floor(quantity / discountQuantity); //Calculate discounted item count
        const nonDiscountedItemCount = quantity % discountQuantity; //Calculate remaining item count on which discount is not applicable
        return (discountedItemCount * discountedPrice + nonDiscountedItemCount * regularPrice);
    }
    return (quantity * regularPrice); //return if itemCounts is less than discountQuantity

}
const isCartValid = (cartItems) => {
    return cartItems.every((item) => {
        if (cache[item] === undefined) {
            cache[item] = catalog.getCatalogByID(item)
        }
        return cache[item] !== undefined;
    });
};