import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Hỗ trợ switch mode thủ công
  theme: {
    extend: {
      colors: {
        // Bạn có thể thêm bảng màu brand tại đây
      },
    },
  },
  plugins: [],
};

export default config;
