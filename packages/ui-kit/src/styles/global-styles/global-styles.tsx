import { createGlobalStyle } from "styled-components";

const GlobalStyles: ReturnType<typeof createGlobalStyle> = createGlobalStyle`
    /* Root CSS Variables */
  :root {
    --mr-gray-1: rgba(61, 37, 20, .05);
    --mr-gray-2: rgba(61, 37, 20, .08);
    --mr-gray-3: rgba(61, 37, 20, .12);
    --mr-gray-4: rgba(53, 38, 28, .3);
    --mr-gray-5: rgba(28, 25, 23, .6);

    --mr-border-radius: 9px;
    --mr-border-color: #E0E0E0;
    --mr-border: 1px solid var(--mr-border-color);
    --mr-icon-scale: 1.2;
    --mr-gap-m: 10px;
    --mr-shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04);
  }
`;

export default GlobalStyles;
