import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        forest: {
          50: "#eef7f1",
          100: "#d6ecdd",
          200: "#aed9bd",
          300: "#7cbe96",
          400: "#4e9c70",
          500: "#317d55",
          600: "#226343",
          700: "#1b4d36",
          800: "#123527",
          900: "#0b241a",
          950: "#081a13",
        },
        mint: {
          50: "#eefdf5",
          100: "#d4f9e5",
          200: "#acf1cd",
          300: "#74e4ad",
          400: "#43cf8d",
          500: "#22b674",
          600: "#15935e",
        },
        lime: {
          50: "#f7ffd9",
          100: "#edffad",
          200: "#dcff63",
          300: "#d7ff4f",
          400: "#b9ed24",
          500: "#94c912",
        },
        cream: "#f7f5eb",
        ink: "#0d1b14",
      },
      fontFamily: {
        sans: ["DM Sans Variable", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ["Fraunces Variable", "Fraunces", "Georgia", "ui-serif", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--primary) / 0.18), 0 20px 60px -20px hsl(var(--primary) / 0.35)",
        lift: "0 30px 80px -40px rgba(3, 25, 16, 0.55)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
