exports.Product = {
  reviews: (parent, args, { db }) => {
    let productId = parent.id;

    let resRevs = db.reviewsList.filter((eachReview) => {
      return eachReview.productId === productId;
    });

    return resRevs ? resRevs : null;
  },
};
