import { createGlobalStyle } from "styled-components";

const GlobalStyles: ReturnType<typeof createGlobalStyle> = createGlobalStyle`
    /* Root CSS Variables */
  :root {
    --mr-gray-1: rgba(61, 37, 20, .05);
    --mr-gray-2: rgba(61, 37, 20, .08);
    --mr-gray-3: rgba(61, 37, 20, .12);
    --mr-gray-4: rgba(53, 38, 28, .3);
    --mr-gray-5: rgba(28, 25, 23, .6);

    --mr-border-radius: 0px;
    --mr-border-color: #E0E0E0;
    --mr-border: 1px solid var(--mr-border-color);
    --mr-icon-scale: 1.2;
    --mr-gap-m: 10px;
    --mr-gap-l: 24px;
    --mr-shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04);

    & .mdlr-reviewer-notes, & .mdlr-reviewer-panel {
      ::-webkit-scrollbar {
        width: 3px; /* width of the entire scrollbar */
      }

      ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0);
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.1); /* color of the scroll thumb */
        border-radius: 3px; / roundness of the scroll thumb */
        }
        
      ::-webkit-scrollbar-thumb:hover {
        background: #555; /* color when hovering over the scroll thumb */
      }
    }

    & .mdlr-reviewer-panel {
      &, & * {
        font-size: 12px;
      }
        
      & .MuiButton-root {
        border-radius: var(--mr-border-radius);
      }

      h1 {
        font-size: 24px;
      }

      p {
        font-size: 15px;
        line-height: 1.5;
      }
    }
  }
`;

export default GlobalStyles;
