/* AUTO-GENERATED from oxc docs — rule nextjs/inline-script-id. Do not edit. */

import Script from 'next/script';

export default function Page() {
  return (
    <Script>
      {`console.log('Hello world');`}
    </Script>
  );
}

// Also incorrect with dangerouslySetInnerHTML
export default function Page() {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `console.log('Hello world');`
      }}
    />
  );
}
