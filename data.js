const https = require('https')
const express = require('express')


function getData(){
https.get('https://meta.discourse.org/latest.json', (resp) => {
  let data = ''

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end',() => {
  //console.log(data)

  //console.log(JSON.parse(data))
  return(JSON.parse(data))
  //console.log(JSON.parse(data))
  });
}).on("error", (err) => {
  
  console.log("error :" + err.message);
});
}

//returns undefined 
console.log(getData())


function getLatestIds (data){
  latest= []
  
  topics = data.topic_list.topics
  for(i = 0; i < topics.length; i ++){
    
    latest.push(topics[i]["id"])
  }
  console.log(latest)
  return latest
}

//console.log(getData(getLatestIds))

//Testing callbacks to return the values
function myCallback (data) {
    console.log(data)
    return data
}


function getLatestIds (data){
  latest= []
  
  topics = data.topic_list.topics
  for(i = 0; i < topics.length; i ++){
    
    latest.push(topics[i]["id"])
  }
  //console.log(latest)
  
  console.log(getPosts(latest))

  //callback(latest)
  

}

function getPosts(latestArr){

    for( i = 0 ; i < latestArr.length; i++){
    https.get('https://meta.discourse.org/t/' + i + '.json', (resp) => {

      let data = ''

     resp.on('data', (chunk) => {
       data += chunk;
       console.log(chunk)
     });

     resp.on('end',() => {
       console.log(data)
       console.log(JSON.parse(data))
      });

    }).on("error", (err) => {
  
  console.log("error :" + err.message);
});

  }
}



