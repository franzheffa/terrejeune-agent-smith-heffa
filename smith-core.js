document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const area = document.querySelector('textarea');
    const log = document.querySelector('.text-green-500') || document.querySelector('.terminal-box');

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
                log.innerText = data.candidates[0].content.parts[0].text;
            } catch (err) {
                log.innerText = "[ERREUR] Connexion au noyau impossible.";
            }
        };
    }
});
