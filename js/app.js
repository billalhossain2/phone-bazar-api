const spinner = document.getElementById("Spinner");
const errorMessageContainer = document.getElementById("error-message-container");
const loadPhonesApi = async (phone) =>{
    const API_URL = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones);
    } catch (error) {
      console.log("Something went wrong!! ", error)
      spinner.classList.add('d-none');
      errorMessageContainer.classList.remove('d-none')
    }
}

const loadPhoneDetailsApi = async phoneId =>{
  const DETAILS_API = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const response = await fetch(DETAILS_API);
  const data = await response.json();
  const phoneDetalObject = data.data;
  displayPhoneDetails(phoneDetalObject);
}

//Load More Buttons
const phonesContainer = document.getElementById("phones-container");
const loadBtn = document.getElementById("load-btn");
let restPhones = null;

//Display phone details 
const displayPhoneDetails = phoneDetail => {
  document.getElementById("phone-title").innerText = phoneDetail.name;
  const detailTable = document.getElementById("details-table");
  detailTable.innerHTML = "";

  const mainFeaturesTitle = document.createElement('tr');
  const titleTd = document.createElement('td');
  titleTd.innerText = "Main Features";
  titleTd.setAttribute("colspan", 2);

  mainFeaturesTitle.appendChild(titleTd)

  mainFeaturesTitle.style = "color: green; font-size: 1.5rem";
  
  const mainFeaturesDiv = document.createElement('div');
  mainFeaturesDiv.appendChild(mainFeaturesTitle);
//Show main features after loop
  for(let key in phoneDetail.mainFeatures){
      const TR = document.createElement('tr');

      const TD = document.createElement('td');
      TD.style = "padding: 10px 30px 10px 0"
      TD.innerText = `${key}: `;
      TR.appendChild(TD)

      const TD_VALUE = document.createElement('td');
      TD_VALUE.innerText = phoneDetail.mainFeatures[key];
      TR.appendChild(TD_VALUE)

      mainFeaturesDiv.appendChild(TR);
  }
  detailTable.appendChild(mainFeaturesDiv);

  const othersTitle = document.createElement('tr');
  const othersTd = document.createElement('td');
  othersTd.innerText = "Others";
  othersTd.setAttribute('colspan', 2);
  othersTitle.appendChild(othersTd);

  othersTd.style = "color: green; font-size: 1.5rem; padding-top: 20px"

  const othersDiv = document.createElement('div');
  othersDiv.appendChild(othersTitle)

  //Show  others feature after loop
  for(let key in phoneDetail.others){
    const TR = document.createElement('tr');
    console.log(key)
    const TD = document.createElement('td');
    TD.style = "padding: 10px 20px 10px 0"
    TD.innerText = `${key}: `;
    TR.appendChild(TD)

    const TD_VALUE = document.createElement('td');
    TD_VALUE.innerText = phoneDetail.others[key];
    TR.appendChild(TD_VALUE)

    othersDiv.appendChild(TR);
}
detailTable.appendChild(othersDiv)
}


const displayPhones = phones => {
  //show an alert if phone does not availabe
  const phoneAlertElem = document.getElementById("phone-alert");
  phones.length ? phoneAlertElem.classList.add('d-none') : phoneAlertElem.classList.remove('d-none');
    let limitedPhones = null;
    if(phones.length > 6){
        limitedPhones = phones.slice(0, 6);
        restPhones = phones.slice(5);
    }else{
        limitedPhones = phones;
    }
    limitedPhones.forEach(phone => {
        phonesContainer.innerHTML += `
        <div class="col">
          <div class="card h-100 px-4">
            <img src="${phone.image}" class="card-img-top" alt="Phone Thumbnail Photo">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <h6>Brand: ${phone.brand}</h6>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer">
                <button onclick='loadPhoneDetailsApi("${phone.slug}")' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetail">Show Details</button>
            </div>
          </div>
        </div>
        `
    });
    spinner.classList.add('d-none');
    phones.length > 6 ? loadBtn.classList.remove('d-none') : loadBtn.classList.add('d-none')
}

//Event listeners
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', function(ev){
  ev.preventDefault();
  const searchField = document.getElementById("search-field");
  const searchInputValue = searchField.value;
  console.log("Searched value======> ", searchInputValue);
  phonesContainer.innerHTML = "";
  loadPhonesApi(searchInputValue)
})

loadBtn.addEventListener('click', function(){
  displayPhones(restPhones)
})
loadPhonesApi('iphone')