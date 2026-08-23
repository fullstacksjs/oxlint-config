/* AUTO-GENERATED from oxc docs — rule nextjs/no-styled-jsx-in-document. Do not edit. */

// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx>{`
            body {
              background: hotpink;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}
