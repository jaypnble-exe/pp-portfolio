import "react";

// Allow CSS custom properties in `style`, e.g. style={{ "--c": app.color }}.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
