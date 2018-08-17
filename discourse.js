const fetch = require('node-fetch');
const rp = require('request-promise')
const app = require('express')

module.exports = {

getTopicDetails : function (res){


  var options = {
  	//change url
    uri: 'https://meta.discourse.org/latest.json',
    json: true // Automatically parses the JSON string in the response
    //,api_username : "API USERNAME",
    //api_key : "APIKEY"
     };
 
    rp(options)
    .then(function (responseJson){
    
    topics = responseJson.topic_list.topics
	details = []
	for(i = 0; i < topics.length; i ++){    

        details.push({id : topics[i]["id"] , title : topics[i]["title"] , created_at : topics[i]["created_at"],  excerpt : topics[i]["excerpt"] })
    } 


    res.render('topics' , {details: details})
    
   

    })   
    .catch(function (err) {
        
    });

},

//getLatest(getTopicDetails()) should render page with array with title and created at time passed to view
getPostDetails : function (res, id){
	    	
        var options = {
        //change url
        uri: 'https://meta.discourse.org/t/' + id + '.json',
        json: true // Automatically parses the JSON string in the response
        };
 
        rp(options)
	       .then(function (response) {
	       
	       var participantsData = []
	       var postCountData = new Map()
	       

	       // ?????? user id as well???
	      participants = response.details.participants
	      for(i = 0; i < participants.length; i ++){    
        	participantsData.push({username : participants[i]["username"] , post_count : participants[i]["post_count"]})
          }
          postStream = response.post_stream.posts
          
          //Repeat username ?????
          
            for(i = 0; i < postStream.length ; i++){

          		if(postCountData.has(postStream[i]["username"])){

          			postArr = postCountData.get(postStream[i]["username"])
          			postArr.push(postStream[i]["cooked"])	
          			postCountData.set(postStream[i]["username"] , postArr)
          		}else{

          			postArr = []
          			postArr.push(postStream[i]["cooked"])	
          			postCountData.set(postStream[i]["username"] , postArr)
          		}
            }

           
		  
          
	      res.render('students' , {participantsData : participantsData , postCountData : postCountData})

	      }).catch(function (err) {
	        // API call failed...
	    });
}

}

