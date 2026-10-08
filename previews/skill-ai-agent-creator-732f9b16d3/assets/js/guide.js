(function () {
  'use strict';
  document.querySelectorAll('.guide-body pre > code').forEach((code) => {
    const pre = code.parentElement;
    const command = code.textContent;
    const button = document.createElement('button');
    button.className = 'copy-command';
    button.type = 'button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code block');
    button.addEventListener('click', async () => {
      const oldStatus = pre.querySelector('.copy-status');
      if (oldStatus) oldStatus.remove();
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(command);
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = 'Copy'; }, 1600);
      } catch (error) {
        const status = document.createElement('span');
        status.className = 'copy-status';
        status.setAttribute('role', 'status');
        status.textContent = 'Copy unavailable. Select the code and copy it manually.';
        pre.appendChild(status);
      }
    });
    pre.appendChild(button);
  });
}());
