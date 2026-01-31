document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const area = document.querySelector('textarea');
    const log = document.querySelector('.text-green-500');

    if (btn && area) {
        btn.onclick = async (e) => {
            e.preventDefault();
            const prompt = area.value;
            if(!prompt) return;
            
            log.innerText = "[SYSTÈME] Analyse en cours...";
            
            try {
                const res = await fetch('/api/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });
                
                const data = await res.json();
                
                // Correction ici : lecture directe de la réponse Gemini
                if (data.candidates && data.candidates[0].content) {
                    log.innerText = data.candidates[0].content.parts[0].text;
                } else {
                    log.innerText = "[ERREUR] Format de réponse inconnu.";
                }
            } catch (err) {
                log.innerText = "[ERREUR] Connexion au noyau impossible.";
            }
        };
    }
});
