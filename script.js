// https://type.fit/api/quotes
let quoteAny = {text: 'You can observe a lot just by watching.', author: 'Yogi Berra'}

let body = document.querySelector("body");

quotesUrl = "https://type.fit/api/quotes"

let quotesStore = [];

function random_item(items){
    return items[Math.floor(Math.random()*items.length)];    
}

let container = document.createElement("div");
container.classList.add("quoteBox");
let copiedmesg = document.createElement("h3");
copiedmesg.classList.add("quoteCopied");
copiedmesg.textContent = "Quote Copied";
copiedmesg.style.visibility = "hidden";
container.appendChild(copiedmesg);
let head = document.createElement("h1");
head.textContent = "Quotes";
container.appendChild(head);
let quotetext = document.createElement("h2");
quotetext.classList.add("quoteText");
quotetext.textContent = quoteAny.text;
let quoteAuthor = document.createElement("h1");
quoteAuthor.classList.add("quoteAuthor");
quoteAuthor.textContent = quoteAny.author;

const quotes = async () => {
    let response = await fetch(quotesUrl);
    let data = await response.json();
    quotesStore = data;
    let randomQuote = random_item(quotesStore);
    let text = randomQuote.text;
    let author = randomQuote.author;
    quotetext.textContent = text;
    quoteAuthor.textContent = `- ${author === null ? "Great Person" : author}`;
    container.append(quotetext,quoteAuthor);
}
body.append(container)
quotes();

setInterval(function(){
    quotes();
},10000);

container.addEventListener('click',() => {
    navigator.clipboard.writeText(quotetext.textContent);
    copiedmesg.style.visibility = "visible";
    setTimeout(()=>{
        copiedmesg.style.visibility = "hidden";
    },1000)
})