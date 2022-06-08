exports.Category = {
  products: (parent, args, { db }) => {
    let categoryId = parent.id;

    let resProds = db.productsList.filter((eachProduct) => {
      return eachProduct.categoryId === categoryId;
    });

    return resProds;
  },
};
