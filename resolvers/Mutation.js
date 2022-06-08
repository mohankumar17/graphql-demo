const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    db.categoriesList.push(newCategory);

    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, price, image, onSale, categoryId } = input;

    const newProduct = {
      id: uuid(),
      name,
      description,
      price,
      image,
      onSale,
      categoryId,
    };

    db.productsList.push(newProduct);
    return newProduct;
  },

  deleteProduct: (parent, { id }, { db }) => {
    db.productsList = db.productsList.filter((eachProduct) => {
      return eachProduct.id !== id;
    });

    //Making productID of each review to null
    // db.reviewsList = db.reviewsList.map((eachReview) => {
    //   if (eachReview.productId === id) {
    //     return {
    //       ...eachReview,
    //       productId: null,
    //     };
    //   } else {
    //     return eachReview;
    //   }
    // });

    //Cascading delete to reviews
    db.reviewsList = db.reviewsList.filter((eachReview) => {
      return eachReview.productId !== id;
    });

    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categoriesList.findIndex((eachCategory) => {
      return eachCategory.id === id;
    });

    if (index === -1) return null;
    db.categoriesList[index] = {
      ...db.categoriesList[index],
      ...input,
    };
    return db.categoriesList[index];
  },
};
