import { PRODUCT_DATA } from "../../../mainpages/data/data.js";
import cartCreate from "./cartcreate.js";
import createOption from "./createoption.js";

// 상품 상세 페이지를 로드하는 함수
loadProductDetailPage();

function loadProductDetailPage() {
  const productId = new URLSearchParams(window.location.search).get(
    "productId"
  );

  const selectedProduct = PRODUCT_DATA.data.find(
    (product) => product.id === Number(productId)
  );

  productShow(selectedProduct);
}

function productShow(product) {
  const productContainer = document.querySelector(".product-container");

  const div = document.createElement("div");
  div.classList.add("product-show");

  const discountPrice = Math.floor(
    product.price * (1 - product.discountRate / 100)
  );

  div.innerHTML = `
      <div class = image-container>
        <img src="${product.imageUrl}" alt="신발 예시" />
        <div class='pages'><span>1 / 8</span></div>
      </div>
      <div class="product-information">
        <p class='product-name'>${product.name}</p>
        <p class='product-category'>${product.category}</p>
        <p class='product-price'>${product.price.toLocaleString() + " won"}</p>
        <div>
          <span class='product-discount'>${product.discountRate + "%"}</span>
          <span class='product-discountPrice'>${
            discountPrice.toLocaleString() + " won"
          }</span>
        </div>
        <p class='product-company'>제조사: ${product.company}</p>
        
        <div class="product-options">
          <form>
            <div class="select is-small">
              <select class='color-option'>
                <option selected disabled>Color</option>
              </select>
            </div>

           <div class="select is-small">
              <select class='size-option'>
                <option selected disabled>Size</option>
              </select>
            </div>
          </form>
          <div class="botton-container">
            <button class="cart-button">장바구니</button>
            <button class="purchase-button">구매하기</button>
          </div>  
        </div>

      </div>
    `;

  productContainer.appendChild(div);

  createOption(div, product);

  cartCreate(div, product);
}
