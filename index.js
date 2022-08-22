const selectElement =(selector)=>{
    const element =document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find the element ${selector}`);
}

const form =selectElement('form');
const input=selectElement('input');
const result=selectElement('.result');
const hamburger =selectElement('.hamburger');
const navMenu=selectElement('.nav-menu');
const cards=selectElement('.cards').children;
console.log(cards);

for(const card of cards){
  card.addEventListener("click",()=>{
    // console.log(card.classList)
    if(card.classList[1]==='card1')
      location.href = '#link-inputText';
    else if(card.classList[1]==='card2') 
      window.location = "/"
    else window.location = "http://www.w3schools.com";
  });
}


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = input.value;
  
    shortenUrl(url);
  });



  async function shortenUrl(url) {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await res.json();
      const newUrl = document.createElement("div");
      newUrl.classList.add("item");
      newUrl.innerHTML = `
     <p> ${data.result.short_link}</p>
     <button class="newUrl-btn" >Copy</button>
     `;
      result.prepend(newUrl);
      const copyBtn = result.querySelector(".newUrl-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(data.result.short_link);
      });
      input.value = "";
    } catch (err) {
      console.log(err);
    }
  }

 