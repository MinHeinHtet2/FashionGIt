document.addEventListener('DOMContentLoaded', () => {
    const brandContainer = document.querySelector(".brand-container");
    const contentShop1 = document.querySelector(".content-shop-1");
    const productCardContainerVertical = document.querySelector(".product-card-container-vertical");
    const productItemsHorizontal = document.querySelectorAll(".product-card-container-horizontal .product-card-shop");
    const productItemsVertical = document.querySelectorAll(".product-card-container-vertical .product-card-shop");
    const filterTagsContainer = document.querySelector('.filter-tags');
    const clearFilterButton = document.querySelector('.clear-filter-btn');
    const searchInput = document.getElementById("search-input");
  
    const activeFilterTags = [];
    let selectedBrandName = "All Items";
    let selectedFilter = "all";
    let searchQuery = "";
  
    function updateFilterTags() {
      filterTagsContainer.innerHTML = '';
      activeFilterTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('filter-tag', 'badge', 'bg-secondary', 'me-2', 'mb-2');
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => {
          const index = activeFilterTags.indexOf(tag);
          if (index > -1) {
            activeFilterTags.splice(index, 1);
            updateFilterTags();
            updateProductItems();
          }
        });
        filterTagsContainer.appendChild(tagElement);
      });
    }
  
    function updateProductItems() {
      productItemsHorizontal.forEach(item => {
        const brandName = item.getAttribute("data-brand");
        const productType = item.getAttribute("data-type");
        const shouldShow = (selectedBrandName === "All Items" || brandName === selectedBrandName) &&
                           (selectedFilter === "all" || productType === selectedFilter) &&
                           (searchQuery === "" || item.querySelector("h3").textContent.toLowerCase().includes(searchQuery));
        item.style.display = shouldShow ? "inline-block" : "none";
      });
  
      productItemsVertical.forEach(item => {
        const brandName = item.getAttribute("data-brand");
        const productType = item.getAttribute("data-type");
        const shouldShow = (selectedBrandName === "All Items" || brandName === selectedBrandName) &&
                           (selectedFilter === "all" || productType === selectedFilter) &&
                           (searchQuery === "" || item.querySelector("h3").textContent.toLowerCase().includes(searchQuery));
        item.style.display = shouldShow ? "block" : "none";
      });
  
      const bagsItems = productCardContainerVertical.querySelectorAll("[data-type='bags']");
      bagsItems.forEach(item => {
        const brandName = item.getAttribute("data-brand");
        const shouldShow = (selectedBrandName === "All Items" || brandName === selectedBrandName) &&
                           (selectedFilter === "bags" || selectedFilter === "all") &&
                           (searchQuery === "" || item.querySelector("h3").textContent.toLowerCase().includes(searchQuery));
        item.style.display = shouldShow ? "inline-block" : "none";
      });
    }
  
    brandContainer.addEventListener("click", event => {
      const targetBrand = event.target.closest(".brand-item");
      if (!targetBrand) return;
      brandContainer.querySelectorAll(".brand-item").forEach(brand => brand.classList.remove("active"));
      targetBrand.classList.add("active");
      const bgImage = targetBrand.getAttribute("data-bg-image");
      contentShop1.style.backgroundImage = `url('${bgImage}')`;
      selectedBrandName = targetBrand.querySelector(".brand-name").textContent;
      document.querySelector(".col h1").textContent = selectedBrandName;
      updateProductItems();
      updateFilterTags();
    });
  
    const filterButtons = document.querySelectorAll(".dropdown-item");
    filterButtons.forEach(button => {
      button.addEventListener("click", event => {
        selectedFilter = event.target.textContent.toLowerCase();
        activeFilterTags.length = 0; // Clear all active filter tags
        if (selectedFilter !== "all") {
          activeFilterTags.push(selectedFilter); // Add the selected filter to activeFilterTags
        }
        updateFilterTags();
        updateProductItems();
      });
    });
  
    clearFilterButton.addEventListener('click', () => {
      activeFilterTags.length = 0;
      selectedFilter = "all";
      updateFilterTags();
      updateProductItems();
    });
  
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.toLowerCase().trim();
      updateProductItems();
    });
  
    const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
    viewDetailsButtons.forEach(button => {
      button.addEventListener("click", event => {
        const productCard = event.target.closest(".product-card-shop");
        const brand = productCard.getAttribute("data-brand");
        const type = productCard.getAttribute("data-type");
        const productName = productCard.querySelector("h3").textContent;
        const url = `product-details.html?brand=${encodeURIComponent(brand)}&type=${encodeURIComponent(type)}&name=${encodeURIComponent(productName)}`;
        window.location.href = url;
      });
    });

    const addToCartButton = document.querySelector(".add-to-cart-btn");
    addToCartButton.addEventListener("click", event => {
    // Redirect the user to the "add-to-cart.html" page using JavaScript
    window.location.href = "add-to-card.html";
  });

    
  
    // Initial update to show all products
    updateProductItems();
});
