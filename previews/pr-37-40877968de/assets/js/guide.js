(function () {
  'use strict';
  document.querySelectorAll('.guide-body pre > code').forEach((code) => {
    const pre = code.parentElement;
    const command = code.textContent;
    const language = [...code.classList].find((name) => name.startsWith('language-'));
    const format = language === 'language-bash' ? 'Terminal' :
      language === 'language-json' ? 'JSON settings' :
      language === 'language-text' && !command.trimStart().startsWith('/') ? 'Implementation prompt' :
      language === 'language-text' ? 'Agent prompt' : 'Code';
    let section = pre.previousElementSibling;
    while (section && !/^H[1-6]$/.test(section.tagName)) section = section.previousElementSibling;
    const sectionName = section ? section.textContent.trim() : document.title;
    const label = document.createElement('span');
    label.className = 'command-label';
    label.textContent = format;
    const button = document.createElement('button');
    button.className = 'copy-command';
    button.type = 'button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', `Copy ${format.toLowerCase()}: ${sectionName}`);
    const status = document.createElement('span');
    status.className = 'copy-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-atomic', 'true');
    let resetTimer;
    let copying = false;
    button.addEventListener('click', async () => {
      if (copying) return;
      copying = true;
      clearTimeout(resetTimer);
      status.textContent = '';
      button.dataset.state = 'pending';
      button.textContent = 'Copying...';
      button.setAttribute('aria-disabled', 'true');
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(command);
        button.textContent = 'Copied';
        button.dataset.state = 'copied';
        status.textContent = format === 'Terminal' ? 'Copied. Paste into your terminal.' :
          format === 'JSON settings' ? 'Copied. Merge into your existing settings.' :
          format === 'Implementation prompt' ? 'Copied. Start a new session with the approved architecture files.' :
          format === 'Agent prompt' ? 'Copied. Use in your application workspace.' : 'Copied to clipboard.';
        resetTimer = setTimeout(() => {
          button.textContent = 'Copy';
          delete button.dataset.state;
          status.textContent = '';
        }, 4000);
      } catch (error) {
        button.textContent = 'Try again';
        button.dataset.state = 'error';
        status.textContent = 'Copy unavailable. Select the code and copy it manually.';
      } finally {
        copying = false;
        button.removeAttribute('aria-disabled');
      }
    });
    pre.prepend(label);
    pre.appendChild(button);
    pre.appendChild(status);
  });
}());
