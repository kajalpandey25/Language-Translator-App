import React, { useEffect } from 'react';
import countries from "../data";
const Translate = () => {
  useEffect(() => {
   const  fromText = document.querySelector(".from-text");
   const  toText = document.querySelector(".to-text");
   const  exchangeIcon = document.querySelector(".exchange");
   const  selectTag = document.querySelectorAll("select");
   const icons = document.querySelector(".row i");
   const translateBtn = document.querySelector("button");


   selectTag.forEach((tag, id) =>{
    for (let country_code in countries){
     let selected = 
     id == 0
      ? country_code == "en-GB" 
      ? "selected" 
      : ""
      : country_code == "hi-IN" 
      ? "selected"
      : "";
      let option = `<option ${selected}  value="${country_code}">${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend",option )
     }

   });

   exchangeIcon.addEventListener("click", () =>{
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
   fromText.value = toText.value;
   toText.value = tempText;
   selectTag[0].value = selectTag[1].value;
   selectTag[1].value = tempLang;

   });
   fromText.addEventListener("keyup", () => {
    if(!fromText.value){
      toText.value = "";
    }
   });


   translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating..");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) =>{
toText.value = data.responseData.TranslatedText;
    });


  
  
  });
  }, []);



  return <>
  <div className="container">
    <div className="wrapper">
    <div className="text-input">
  <textarea 
  spellCheck="false"
  className="from-text"
  placeholder="Enter text"
  ></textarea>
   <textarea 
   readOnly
  spellCheck="false"
  className="to-text"
  placeholder="Translator"
  ></textarea>
    </div>
    <ul className="controls">
      <li className="row from">
        <div className="icons">
          <i id="from" className="fas fa-volume-up"/>
          <i id="from" className="fas fa-copy" />
        </div>
        <select></select>
      </li>
      <li className="exchange">
        <i className="fas fa-exchange-alt" />
      </li>
      <li className="row to">
        <select></select>
        <div className="icons">
          <i id="to" className="fas fa-volume-up" />
          <i id="to" className="fas fa-copy" />
        </div>
      </li>
    </ul>
  </div>
  <button>Translate Text</button>
</div>
  
  
  
  </>
  
};

export default Translate
