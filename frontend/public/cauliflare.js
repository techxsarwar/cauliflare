/**
 * Cauliflare Client-side Form Guard & Live Email Validator SDK
 * Version: 2.0.0
 * Usage: <script src="https://cauliflare.vercel.app/cauliflare.js" data-key="cf_sarwar_cauliflare_live_..."></script>
 */
(function () {
  'use strict';

  var currentScript = document.currentScript || document.querySelector('script[src*="cauliflare.js"]');
  var apiKey = currentScript ? currentScript.getAttribute('data-key') : '';
  var endpoint = currentScript && currentScript.getAttribute('data-endpoint') 
    ? currentScript.getAttribute('data-endpoint') 
    : 'https://cauliflare-backend.onrender.com/v1/check-email';

  function createTooltip(input) {
    var tooltip = document.createElement('div');
    tooltip.className = 'cauliflare-badge';
    tooltip.style.cssText = 'display:none;font-family:monospace;font-size:11px;font-weight:bold;padding:4px 8px;margin-top:4px;border:1px solid #121212;box-shadow:2px 2px 0px #121212;transition:all 0.2s ease;';
    input.parentNode.insertBefore(tooltip, input.nextSibling);
    return tooltip;
  }

  function validateEmail(input, tooltip) {
    var email = input.value.trim();
    if (!email || email.indexOf('@') === -1) {
      tooltip.style.display = 'none';
      input.style.border = '';
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey ? 'Bearer ' + apiKey : ''
      },
      body: JSON.stringify({ email: email })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.recommendation === 'BLOCK') {
        tooltip.style.display = 'block';
        tooltip.style.backgroundColor = '#ff5252';
        tooltip.style.color = '#ffffff';
        tooltip.textContent = '❌ Temporary / Disposable Email Blocked (' + (data.provider || 'Burner') + ')';
        input.style.border = '2px solid #ff5252';
      } else if (data.typo_detected && data.did_you_mean) {
        tooltip.style.display = 'block';
        tooltip.style.backgroundColor = '#ffd600';
        tooltip.style.color = '#121212';
        tooltip.innerHTML = '⚠️ Did you mean <span style="text-decoration:underline;cursor:pointer;">' + data.did_you_mean + '</span>?';
        input.style.border = '2px solid #ffd600';
        tooltip.onclick = function() {
          input.value = data.did_you_mean;
          validateEmail(input, tooltip);
        };
      } else {
        tooltip.style.display = 'block';
        tooltip.style.backgroundColor = '#00e676';
        tooltip.style.color = '#121212';
        tooltip.textContent = '✓ Verified Clean Email';
        input.style.border = '2px solid #00e676';
      }
    })
    .catch(function() {
      tooltip.style.display = 'none';
    });
  }

  function initCauliflare() {
    var inputs = document.querySelectorAll('input[type="email"], input[data-cauliflare="email"]');
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.getAttribute('data-cauliflare-initialized')) continue;
      input.setAttribute('data-cauliflare-initialized', 'true');

      var tooltip = createTooltip(input);
      var debounceTimer;
      input.addEventListener('blur', function() {
        validateEmail(input, tooltip);
      });
      input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          validateEmail(input, tooltip);
        }, 600);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCauliflare);
  } else {
    initCauliflare();
  }

  window.Cauliflare = {
    init: initCauliflare,
    validate: validateEmail
  };
})();
