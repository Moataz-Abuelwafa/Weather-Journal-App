/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=681e3d94b5ffe5dee6f8e41e5b94875d&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
// add 1 to getMonth() because counts month from 0 to 11
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//Event listener to add function to exiting HTML element
document.getElementById("generate").addEventListener("click", generateAction);

// 

function generateAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getData(baseURL, newZip, apiKey)
    // New Syntax!
    .then(function (data) {
      // Add data
      console.log(data);
      postData("/addData", {
        date: newDate,
        temp: data.main.temp,
        content: feelings,
      });
      updateUI();
    });
}

//async function to GET Data
const getData = async (baseURL, zip, key) => {
  const response = await fetch(baseURL + zip + key);
  try {
    const data = await response.json();
    return data;

        // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
};

//async function to post Data
const postData = async (url = "", data = {}) => {
  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header 
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
        
    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
};

// Updating UI Elements
const updateUI = async()=>{
  const request = await fetch('/all')
  try{
  const allData = await request.json();
  console.log(allData)
  document.getElementById("date").innerHTML = `Date:${allData.date}`;
  document.getElementById("temp").innerHTML = `Temperature:${allData.temp}`;
  document.getElementById("content").innerHTML = `I feel:${allData.content}`;
  }catch(err){
  console.log('error',err);
  }
  }