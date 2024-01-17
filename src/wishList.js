import React from "react";

const WishList = ({
  removeFromWishList,
  wishList,
  products,
  updateOrder,
  cart,
}) => {
  // Function to format a price into dollars (e.g., 100 => $1.00)
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="wishlist-container">
      <h2>Wish List</h2>
      {wishList.length > 0 ? (
        <ul className="wishlist-list">
          {wishList.map((lineItem) => {
            return (
              <li key={lineItem.id} className="wishlist-item">
                <span>{`${lineItem.name} ${formatPrice(lineItem.price)}`}</span>
                <button
                  className="wishlist-button"
                  onClick={async () => {
                    try {
                      await updateOrder({ ...cart, is_cart: true, lineItem });
                      removeFromWishList(lineItem.id);
                    } catch (error) {
                      console.error("Could not add item to cart:", error);
                    }
                  }}
                >
                  Add to cart
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Wish List is empty.</p>
      )}
    </div>
  );
};

export default WishList;
