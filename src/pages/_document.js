import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <GoogleFonts href='https://fonts.googleapis.com/css?family=Inter"' />
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
