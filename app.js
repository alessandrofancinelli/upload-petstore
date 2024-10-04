let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene che il browser mostri immediatamente il prompt
  e.preventDefault();
  deferredPrompt = e;

  // Mostra il pulsante "Installa"
  const installButton = document.createElement("button");
  installButton.textContent = "Installa l'app";
  installButton.id = "install-button";
  installButton.style = "margin-top: 20px; padding: 10px 20px; font-size: 16px;";
  document.body.appendChild(installButton);

  installButton.addEventListener('click', () => {
    // Mostra il prompt di installazione
    deferredPrompt.prompt();

    // Verifica cosa sceglie l'utente
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Utente ha accettato l\'installazione');
      } else {
        console.log('Utente ha rifiutato l\'installazione');
      }
      deferredPrompt = null;
    });
  });
});
