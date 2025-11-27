document.addEventListener("DOMContentLoaded", () => {
  const quoteBox = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  async function loadQuote() {
    try {
      const response = await fetch("/data/quotes.json"); 
      if (!response.ok) {
        throw new Error("Failed to load quotes");
      }

      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      quoteBox.textContent = randomQuote.text;
    } catch (err) {
      console.error("Error loading quote:", err);
      quoteBox.textContent = "Unable to load quote. Please try again.";
    }
  }

  newQuoteBtn.addEventListener("click", loadQuote);

  // Load a quote when the page starts
  loadQuote();
});
