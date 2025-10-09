import { join } from "path";

const config = {
  content: [
    join(process.cwd(), "src/app/**/*.{js,ts,jsx,tsx}"),
    join(process.cwd(), "src/pages/**/*.{js,ts,jsx,tsx}"),
    join(process.cwd(), "src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      screen: {
        flix: "1128px",
      },
    },
  },
  plugins: [],
};
export default config;
