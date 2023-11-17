document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('party-list');
    const form = document.getElementById('new-party-form');
    let parties = [];
  
    function renderParties() {
      listContainer.innerHTML = ''; // Clear the list
      parties.forEach((party, index) => {
        const partyElement = document.createElement('div');
        partyElement.className = 'party-item';
        partyElement.innerHTML = `
          <h2>${party.name}</h2>
          <p>Date: ${party.date}</p>
          <p>Location: ${party.location}</p>
          <p>Description: ${party.description}</p>
          <button onclick="deleteParty(${party.id})">Delete</button>
        `;
        listContainer.appendChild(partyElement);
      });
    }
  
    function deleteParty(partyId) {
      fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2303-acc-pt-web-pt-b/events/${partyId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data.success && Array.isArray(data.data)) {
            parties = data.data;
            renderParties();
          } else {
            console.error('Error deleting party:', data.error);
          }
        })
        .catch(error => {
          console.error('Error deleting party:', error);
        });
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const partyData = {
        name: form.name.value,
        date: form.date.value,
        location: form.location.value,
        description: form.description.value
      };
  
      fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2303-acc-pt-web-pt-b/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partyData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success && Array.isArray(data.data)) {
            parties = data.data;
            renderParties();
            form.reset();
          } else {
            console.error('Error creating party:', data.error);
          }
        })
        .catch(error => {
          console.error('Error creating party:', error);
        });
    });
  
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2303-acc-pt-web-pt-b/events/')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          parties = data.data;
          renderParties();
        } else {
          console.error('Error retrieving parties:', data.error);
        }
      })
      .catch(error => {
        console.error('Error retrieving parties:', error);
      });
  });