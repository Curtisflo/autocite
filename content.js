// Create the box element
let box = document.createElement('div');
box.id = 'hoveringBox';

// Create the button element
let button = document.createElement('button');
button.innerText = 'Cite Page';

// Add an event listener to the button
button.addEventListener('click', function() {
  scrapePage();
});

// Append the button to the box
box.appendChild(button);

// Append the box to the body
document.body.appendChild(box);

// Function to scrape the citation
function scrapePage() {
  let citationElement = document.querySelector('#documentMeta');
  let citationText;
  if(citationElement.children.length > 4){
    console.log(citationElement.children[3].children[1]);
    citationText = citationElement.children[3].children[1] ? citationElement.children[3].children[1].innerText.trim() : 'Citation not found';
  }
  else{
    console.log(citationElement.children[2].children[1]);
    citationText = citationElement.children[2].children[1] ? citationElement.children[2].children[1].innerText.trim() : 'Citation not found';
  }

  let formattedCitation = formatCitation(citationText);

  // Log the citation to the console
  console.log('Citation:', formattedCitation);

  // Copy the citation to the clipboard
  copyToClipboard(formattedCitation);
}

// Function to copy text to clipboard as HTML
async function copyToClipboard(htmlText) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlText], { type: 'text/html' }),
          'text/plain': new Blob([htmlText.replace(/<\/?[^>]+(>|$)/g, "")], { type: 'text/plain' }) // Fallback for plain text
        })
      ]);
      alert('Formatted citation copied to clipboard');
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  }

// Function to format the citation according to the specified requirements
function formatCitation(citation) {
    // Example citation: "Bracklow v. Bracklow, 1999 CanLII 715 (SCC), [1999] 1 SCR 420, <https://canlii.ca/t/dlq>, retrieved on 2024-05-29"
    // Split the citation text to extract necessary parts
    let parts = citation.split(', ');
    let styleOfCause = parts[0]; // e.g., "Bracklow v. Bracklow"
    let postComma = parts[1].split(' (')[0]; // Everything in parts[1] up to the first '('
  
    // Construct the formatted citation with italicized style of cause
    let formattedCitation = `<i>${styleOfCause}</i>, ${postComma}.`;
  
    return formattedCitation;
  }  