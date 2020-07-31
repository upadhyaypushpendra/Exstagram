var activeUser=""
var friendsMap=new Map();
friendsMap.set("Raju",["Hello","My name is Raju"]);
friendsMap.set("Golu",[]);
friendsMap.set("Ramesh",[]);
friendsMap.set("Suresh",[]);
friendsMap.set("Joseph",[]);
friendsMap.set("Anthony",[]);
friendsMap.set("Kishna",[]);
friendsMap.set("Geeta",[]);
friendsMap.set("Babeeta",[]);
friendsMap.set("Seeta",[]);
friendsMap.set("Reeta",[]);

function getSentMessage(message,id){
	var messageWrapper=document.createElement('div');
	messageWrapper.setAttribute('class','message-wrapper');
	messageWrapper.setAttribute('id',id);
	var messageDiv=document.createElement('div');
	messageDiv.setAttribute('id',id);
	messageDiv.innerHTML=message;
	messageDiv.setAttribute('class','sent-message');
	messageWrapper.appendChild(messageDiv);
	return messageWrapper;
}

class User{
	constructor(){
	}
	static getUser(username){
		var user=document.createElement('div');
		user.setAttribute('class','user');
		user.setAttribute('id',username);
		
		var profileIconWrapper=document.createElement('div');
		profileIconWrapper.setAttribute('class','user-profile-icon-wrapper');
		var profileIcon=document.createElement('img');
		profileIcon.setAttribute('class','user-profile-icon');
		profileIcon.setAttribute('src','./images/user-icon.png');
		profileIconWrapper.appendChild(profileIcon);
		
		var userNameWrapper=document.createElement('div');
		userNameWrapper.setAttribute('class','user-name-wrapper');
		var userName=document.createElement('div');
		userName.setAttribute('class','user-name');
		userName.innerHTML=username;
		userNameWrapper.appendChild(userName);
		
		user.appendChild(profileIconWrapper);
		user.appendChild(userNameWrapper);
		user.onclick=function(){
				activeUser=username;
				var activeUserName=document.getElementById("active-user-name");
				if(username!=activeUserName.innerHTML)
				{
				activeUserName.innerHTML=username;
				var  messageArea=document.getElementById("message-area");
				document.getElementById('active-status').innerHTML="Active Now";
				messageArea.innerHTML="";
				var messages=friendsMap.get(username);
				for(var i=0;i<messages.length;i++)
				{
					messageArea.appendChild(getSentMessage(messages[i],i));
				}
				}
			};
		return user;
	}
}

window.onload=function(){
	var friendListDiv=document.getElementById("user-list-left");
for (let key of friendsMap.keys()) {
		friendListDiv.appendChild(User.getUser(key));
}	
};


function searchFriend(searchText){
	var friends=document.getElementById("user-list-left");
	friends.innerHTML="";
	searchText=searchText.toUpperCase();
	for(let friend of friendsMap.keys()) 
	{
		if(friend.toUpperCase().startsWith(searchText)) friends.appendChild(User.getUser(friend));
	}
}

function sendMessage(){
	var messageArea=document.getElementById('message-area');
	var messageTextArea=document.getElementById('message-textarea');
	message=messageTextArea.value;
	if(message!="" && activeUser!="")
	{
	messageArea.appendChild(getSentMessage(message,friendsMap.get(activeUser).length));
	friendsMap.get(activeUser).push(message);
	messageTextArea.value='';
	}
}
function checkEnter(textarea)
{
	var key = window.event.keyCode;
	message=textarea.value.trim();
	if (key === 13 && message!=''){
		
		sendMessage();
		textarea.value='';
		return false;
	}
        return true;
}
setInterval(function(){
    var element = document.getElementById("message-area-scroll");
    element.scrollTop = element.scrollHeight;
},1000);
