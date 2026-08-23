/* AUTO-GENERATED from oxc docs — rule nextjs/no-before-interactive-script-outside-document. Do not edit. */

// pages/index.js
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive"  // ❌ Wrong placement
      />
    </div>
  )
}
