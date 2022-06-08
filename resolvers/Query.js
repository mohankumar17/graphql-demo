exports.Query = {
  products: (parent, { filter }, { db }) => {
    if (filter) {
      let onSaleProds = db.productsList;
      if (filter.onSale) {
        onSaleProds = onSaleProds.filter((eachProd) => {
          return eachProd.onSale === true;
        });
      }

      let onSaleHighRatedProds = [];

      onSaleProds.forEach((eachProd) => {
        let prodsReviews = db.reviewsList.filter((eachReview) => {
          return eachReview.productId === eachProd.id;
        });

        let sum = 0;
        let tot = 0;

        prodsReviews.forEach((eachReview) => {
          tot += 1;
          sum += eachReview.rating;
        });

        let avgRating = sum / tot;

        //console.log(eachProd.name + " average rating: " + avgRating);
        if (avgRating >= filter.avgRating) {
          onSaleHighRatedProds.push(eachProd);
        }
      });
      return onSaleHighRatedProds;
    } else {
      return db.productsList;
    }
  },
  product: (parent, args, { db }) => {
    let id = args.id;

    let resProd = db.productsList.find((eachProduct) => {
      return eachProduct.id === id;
    });

    return resProd ? resProd : null;
  },
  categories: (parent, args, { db }) => {
    return db.categoriesList;
  },
  category: (parent, args, { db }) => {
    let { id } = args;

    let resCat = db.categoriesList.find((eachCategory) => {
      return eachCategory.id === id;
    });

    return resCat ? resCat : null;
  },
  reviews: (parent, args, { db }) => {
    return db.reviewsList;
  },
};
