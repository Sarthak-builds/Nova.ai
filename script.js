
//All the elements selection
const promptForm=document.querySelector(".prompt-form");
const chatscontainer= document.querySelector(".chats-container");
const promptInput= document.querySelector(".prompt-input");
const dltBtn= document.querySelector("#dlt-chat")
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;//hidden until i learn how to hide it, lol
// const logo= document.querySelector(".nav-logo");

//handle the form submission and display the prompt of the user.

//user message div create
const createMssgDiv=(content, className)=>{
const mssgDiv = document.createElement("div");
mssgDiv.classList.add("message",className);
mssgDiv.innerHTML=content;
return mssgDiv;
}//div create kra uske andar html daldiya jiske andar hamara user prompt text tha

//typing effect and scrolling to the bottom effect
const scrollToBottom= ()=> chatscontainer.scrollTo({top:chatscontainer.scrollHeight, behavior:"smooth"});
const typingEffect=(text, textElement, chatMssgDiv)=>{
    textElement.textContent="";
    const words= text.split("");
    let wordIndex=0;
    const typingInterval= setInterval(()=>{
        if (wordIndex< words.length){
         textElement.textContent+= (wordIndex===0?" ":"")+words[wordIndex++];
         scrollToBottom();
        }else {
            clearInterval(typingInterval)
        }
    },8);

}//typing effect learned and scrolling to the bottom effects!!!
let chatHistory=[];
const generateResponse= async (chatMssgDiv)=>{
    const textElement =chatMssgDiv.querySelector(".mssg-text");
    chatHistory.push({
        role:"user",
        parts: [{text:userMssg}] //bot aur user dono ki chat save krenge for reference
    });
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
                body: JSON.stringify({contents:chatHistory})
        });

        const data= await response.json();
        if (!response.ok)throw new Error (data.error.message);
        // const responseText= data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        const responseText = data.candidates[0].content.parts[0].text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*\s?/g, "• ") // convert * to bullet
    .replace(/\. (?=• )/g, ".\n") // add newlines before each new bullet
    .trim();
        textElement.textContent=responseText;
        typingEffect(responseText, textElement, chatMssgDiv);//typing effect call
        chatHistory.push({
            role:"model", parts:[{text:responseText}]
        });
        console.log(responseText);
    } catch (error) {
console.log(error);
    }
}
let userMssg =" ";
const handleFormSubmit=(e)=> {
    e.preventDefault();//prevents from reloading of page....
    userMssg= promptInput.value.trim();
    if(!userMssg) {
        return;
    }
    promptInput.value="";
    let userMssgHTML=`<p class="mssg-text"></p>`;
    let userMssgDiv =createMssgDiv(userMssgHTML,"user-mssg");
    userMssgDiv.querySelector(".mssg-text").textContent=userMssg;
    chatscontainer.appendChild(userMssgDiv);

    setTimeout(()=>{
         let chatMssgHTML=`<img src="Assets/nova_logo.png" alt="gemini_logo" class="avatar"><p class="mssg-text">Just a sec...</p>`;
    let chatMssgDiv =createMssgDiv(chatMssgHTML,"chat-mssg");
    chatscontainer.appendChild(chatMssgDiv);
    scrollToBottom();
    generateResponse(chatMssgDiv);
    },500);
}
promptForm.addEventListener("submit", handleFormSubmit);
dltBtn.addEventListener("click", () => {
    // Clear all messages from the chat container
    chatscontainer.innerHTML = "";
    
    // Reset chat history array
    chatHistory = [];
    
    // Optional: Add back the initial greeting message
    const initialGreeting = `
        <div class="message chat-mssg">
            <img src="Assets/nova_logo.png" alt="gemini_logo" class="avatar">
            <p class="mssg-text">Hola! How can i help you?</p>
        </div>
    `;
    chatscontainer.innerHTML = initialGreeting;
});