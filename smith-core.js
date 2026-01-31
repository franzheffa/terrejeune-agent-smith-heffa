document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const area = document.querySelector('textarea');
    // On cible précisément le texte vert du terminal
    const log = document.querySelector('.terminal-box div') || document.querySelector('.terminal-box');

    if (btn && area) {
        btn.onclick = async (e) => {
            e.preventDefault();
            const prompt = area.value;
            if(!prompt) return;
            
            log.innerHTML = '<span class="animate-pulse">[SYSTÈME] Analyse Smith-Heffa en cours...</span>';
            
            try {
                const res = await fetch('/api/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });
                
                const data = await res.json();
                
                if (data.candidates && data.candidates[0].content) {
                    log.innerText = data.candidates[0].content.parts[0].text;
                } else {
                    log.innerText = "[ERREUR] Le noyau a renvoyé une réponse vide. Vérifiez votre quota.";
                }
            } catch (err) {
                log.innerText = "[ERREUR] Connexion au noyau impossible.";
            }
        };
    }
});
