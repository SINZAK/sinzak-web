import use from "use-breakpoint";

const BREAKPOINTS = { narrow: 0, wide: 960 };
const useBreakpoint = () => use(BREAKPOINTS);
export default useBreakpoint;
