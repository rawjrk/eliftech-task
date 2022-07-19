export const disableButtonsExceptShopId = (shopId) => {
  const addToCartForms = document.querySelectorAll('.add-to-cart');
  for (const form of addToCartForms) {
    const formShopId = form.querySelector('[name="shop"]').value;
    const button = form.querySelector('button');
    if (formShopId !== shopId) button.disabled = true;
  }
  const shopsNavigation = document.querySelectorAll('#shops-nav a');
  for (const link of shopsNavigation) {
    if (link.id !== `shop-link-${shopId}`) link.classList.add('disabled');
  }
};
