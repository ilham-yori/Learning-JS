const quoteContainer = document.getElementById('quote-cotainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show New Quote
function newQuote() {
    //Show Loading
    loading();
    //Randomizer
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Checking If There's Author
    if(!quote.author){
        authorText.textContent = "Unknown"
    }else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    //Set Quote Hide Loader
    quoteText.textContent = quote.text;
    finishLoad();
}

//Get Quote FROM API
async function getQuotes() {
    //Show Loading
    loading();
    //Accessing API
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error
    }
}

//Tweeting
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function finishLoad() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Event Listener
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//On Load
getQuotes();