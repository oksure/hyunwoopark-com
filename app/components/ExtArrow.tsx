import { LuArrowUpRight } from "react-icons/lu";

// Deterministic external-link arrow. The previous &#8599; (U+2197) glyph has
// an emoji presentation, so some client font stacks rendered it as a legacy
// emoji icon instead of a thin text arrow. An inline SVG renders identically
// on every platform.
const ExtArrow = () => (
  <LuArrowUpRight
    aria-hidden
    size="0.9em"
    style={{ display: "inline", verticalAlign: "-0.08em", marginLeft: "0.1em" }}
  />
);

export default ExtArrow;
