"use client";
import React, { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      if (document) {
        document.open();
        try {
          document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script type="text/javascript">
                ${js}
              </script>
            </body>
            </html>
          `);
          document.close();
        } catch (error) {}
      }
    }
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Preview"
    />
  );
};

export default Preview;
