// Get the main container and detailed product containers by their IDs
var mainContainer = document.getElementById("subContainer");
var productDetaileContainer_1 = document.getElementById("productDetaileContainer-1");
var productDetaileContainer_2 = document.getElementById("productDetaileContainer-2")
var productDetaileContainer_3 = document.getElementById("productDetaileContainer-3");
var productDetaileContainer_4 = document.getElementById("productDetaileContainer-4")

// Get the navigation buttons by their IDs
var leftsideNavBtn = document.getElementById("leftNav");
var rightsideNavBtn = document.getElementById("right");

var productTitle = [];
var productPrice = [];
var productImages = [];

// Fetch product data from the API
fetch('https://dummyjson.com/products/search?q=phone')
    .then(res => res.json())
    .then(data => {
        const products = data.products;
        console.log(products);
        // Store product data in respective arrays
        for (let key in products) {
            productTitle.push(products[key].title);
            productPrice.push(products[key].price);
            productImages.push(products[key].images[0]);
        }
        // Display the fetched products
        displayProduct(productTitle, productPrice, productImages);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display products on the page
function displayProduct(productTitle, productPrice, productImages) {
    for (let i = 0; i < 12; i++) {
        var subDiv = document.createElement("div");
        var productImageTag = document.createElement("img");
        var productPriceTag = document.createElement("p");
        var productNameTag = document.createElement("p");

        productImageTag.src = productImages[i];
        productNameTag.innerHTML = productTitle[i];
        productPriceTag.innerHTML = "$" + productPrice[i];

        productImageTag.style.width = "100px";
        productPriceTag.setAttribute("class", "productPriceInformation");
        productNameTag.setAttribute("class", "productNameInformation");

        subDiv.setAttribute("class", "productInformation");
        subDiv.append(productImageTag, productPriceTag, productNameTag);

        // Append products to respective containers based on their index
        if (i < 3) {
            productDetaileContainer_1.append(subDiv);
        } else if (i < 6) {
            productDetaileContainer_2.append(subDiv);
        } else if (i < 9) {
            productDetaileContainer_3.append(subDiv);
        } else {
            productDetaileContainer_4.append(subDiv);
        }
    }
}

// Get the product containers and navigation buttons
var IndexContainer = document.getElementsByClassName("productDiv");
var buttons = document.querySelectorAll(".buttonConatiner .nagBtn");

// Add event listeners to the navigation buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        currentIndex = i;
        updateProductList();
        updateNavButtons();
    });
}

var currentIndex = 0;

// Event listener for the left navigation button
leftsideNavBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateProductList();
        updateNavButtons();
    }
});

// Event listener for the right navigation button
rightsideNavBtn.addEventListener("click", () => {
    if (currentIndex < IndexContainer.length - 1) {
        currentIndex++;
        updateProductList();
        updateNavButtons();
    }
});

// Function to update the product list display based on the current index
function updateProductList() {
    for (let i = 0; i < IndexContainer.length; i++) {
        if (i === currentIndex) {
            IndexContainer[i].classList.add("nextProductlist");
            IndexContainer[i].classList.remove("hideProductlist");
        } else {
            IndexContainer[i].classList.add("hideProductlist");
            IndexContainer[i].classList.remove("nextProductlist");
        }
    }
    updateNavButtons();
}

// Function to update the state of navigation buttons based on the current index
function updateNavButtons() {
    buttons.forEach((button, index) => {
        if (index === currentIndex) {
            button.style.color = "white";
            button.style.backgroundColor = "#19161f";
        } else {
            button.style.color = "";
            button.style.backgroundColor = "";
        }
    });

    if (currentIndex === 0) {
        leftsideNavBtn.disabled = true;
    } else {
        leftsideNavBtn.disabled = false;
    }

    if (currentIndex === IndexContainer.length - 1) {
        rightsideNavBtn.disabled = true;
    } else {
        rightsideNavBtn.disabled = false;
    }
}


updateNavButtons();













