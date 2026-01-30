document.addEventListener('DOMContentLoaded', function() {
    const emails = [
        'mariamgvasalialw@gmail.com',
        'mariamkhurtsilava9@gmail.com',
        'lali.gvasalia18@gmail.com'
    ];
    
    let emailIndex = 0;
    
    function replaceEmails() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        while(walker.nextNode()) textNodes.push(walker.currentNode);
        
        textNodes.forEach(node => {
            if (node.textContent.includes('[email protected]') || 
                node.textContent.includes('email protected') ||
                node.textContent.includes('[email\u00a0protected]')) {
                if (emailIndex < emails.length) {
                    node.textContent = node.textContent
                        .replace(/\[email.*?protected\]/gi, emails[emailIndex])
                        .replace(/email\s*protected/gi, emails[emailIndex]);
                    emailIndex++;
                }
            }
        });
    }
    
    replaceEmails();
    setTimeout(replaceEmails, 500);
    setTimeout(replaceEmails, 1000);
});
```

**2. აიღე Raw ლინკი:**

GitHub-ზე ფაილზე დააჭირე **Raw** ღილაკს და დააკოპირე URL. იქნება მსგავსი:
```
https://raw.githubusercontent.com/sheni-username/repo-name/main/emails.js
