// Microsoft Clarity
(() => {
  const CLARITY_TAG = 'imymdn2o1e';
  const CLARITY_NAME = 'clarity';

  // declare and initialize clarity function
  window[CLARITY_NAME] =
    window[CLARITY_NAME] ||
    function (...args) {
      (window[CLARITY_NAME].q = window[CLARITY_NAME].q || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_TAG}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
})();

// Google Analytics (gtag.js)
(() => {
  // GA4 Tracking ID
  const GA_MEASUREMENT_ID = 'G-G9DEENBZJF';

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }

  gaScript.onload = () => {
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };
})();

// LinkedIn Insight Tag
(() => {
  const PARTNER_ID = '5852474';

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(PARTNER_ID);

  // initialize lintrk
  if (!window.lintrk) {
    window.lintrk = (a, b) => {
      window.lintrk.q.push([a, b]);
    };
    window.lintrk.q = [];
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
})();
