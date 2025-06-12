//All the elements selection
const promptForm= document.querySelector(".prompt-form");
const chatscontainer= document.querySelector(".chats-container");
const promptInput= document.querySelector(".prompt-input");
const API_KEY=`AIzaSyD4sD_ipgMIfj1VQ-R_hbKv5rFl20DgeTM`;
const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

//handle the form submission and display the prompt of the user.
let userMssg =" ";
let chatHistory=[];
//user message div create
const createMssgDiv=(content, className)=>{
const mssgDiv = document.createElement("div");
mssgDiv.classList.add("message",className);
mssgDiv.innerHTML=content;
return mssgDiv;
}

const generateResponse= async (chatMssgDiv)=>{
    const textElement =chatMssgDiv.querySelector(".mssg-text");
    chatHistory.push({
        role:"user",
        parts: [{text:userMssg}]
    });
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
                body: JSON.stringify({contents:chatHistory})
        });

        const data= await response.json();
        if (!response.ok)throw new Error (data.error.message);
        const responseText= data.candidates[0].content.parts[0].text;
        textElement.textContent=responseText;
        console.log(responseText);
    } catch (error) {
console.log(error);
    }
}
const handleFormSubmit=(e)=> {
    e.preventDefault();
    userMssg= promptInput.value.trim();
    if(!userMssg) {
        return;
    }
    let userMssgHTML=`<p class="mssg-text"></p>`;
    let userMssgDiv =createMssgDiv(userMssgHTML,"user-mssg");
    userMssgDiv.querySelector(".mssg-text").textContent=userMssg;
    chatscontainer.appendChild(userMssgDiv);
    console.log(userMssg);

    setTimeout(()=>{
         let chatMssgHTML=`<p class="mssg-text">Just a sec...</p>`;
    let chatMssgDiv =createMssgDiv(chatMssgHTML,"chat-mssg");
    chatscontainer.appendChild(chatMssgDiv);
    generateResponse(chatMssgDiv);
    },600);
    
}
promptForm.addEventListener("submit", handleFormSubmit);