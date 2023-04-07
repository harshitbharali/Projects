const financialAdvice = [
    "1)Create a budget and stick to it.",
    "2)Save at least 20% of your income.",
    "3)Invest in a diversified portfolio.",
    "4)Pay off high-interest debt first.",
    "5)Get a side hustle to increase your income.",
    "6)Don't try to time the market."
 ];
 
 const financeAdvice = document.getElementById("finance-advice");
 const showAdviceButton = document.getElementById("show-advice-button");
 
 // Hide the financial advice section by default
 financeAdvice.style.display = "none";
 
 // Add a click event listener to the button
 showAdviceButton.addEventListener("click", () => {
    // If the financial advice section is currently hidden, show it
    if (financeAdvice.style.display === "none") {
       financeAdvice.style.display = "block";
       // Add the financial advice to the section
       for (let i = 0; i < financialAdvice.length; i++) {
          const advice = document.createElement("p");
          advice.textContent = financialAdvice[i];
          financeAdvice.appendChild(advice);
       }
       showAdviceButton.textContent = "Hide Advice"; // Change button text
    } else {
       // If the financial advice section is currently visible, hide it
       financeAdvice.style.display = "none";
       financeAdvice.innerHTML = ""; // Remove the financial advice
       showAdviceButton.textContent = "Show Advice"; // Change button text
    }
 });