/* AUTO-GENERATED from oxc docs — rule nextjs/next-script-for-ga. Do not edit. */

// Using regular script tag with GA source
<script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

// Using inline script for GA initialization
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `
}} />
