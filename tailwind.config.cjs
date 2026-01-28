/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          50: "hsl(var(--neutral-50))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          950: "hsl(var(--neutral-950))",
        },
        gray: {
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          600: "hsl(var(--gray-600))",
          900: "hsl(var(--gray-900))",
          950: "hsl(var(--gray-950))",
        },
        zinc: {
          300: "hsl(var(--zinc-300))",
          700: "hsl(var(--zinc-700))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Roboto", "Inter", "SF Pro Display", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Roboto", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography from Design System
        body: ["16px", { lineHeight: "1.75", fontWeight: "400" }],
        "body-medium": ["16px", { lineHeight: "1.75", fontWeight: "500" }],
        "body-bold": ["16px", { lineHeight: "1.75", fontWeight: "600" }],
        caption: ["12px", { lineHeight: "1.67", fontWeight: "400" }],
        "caption-medium": ["12px", { lineHeight: "1.67", fontWeight: "500" }],
        small: ["14px", { lineHeight: "1.43", fontWeight: "400" }],
        "small-medium": ["14px", { lineHeight: "1.43", fontWeight: "500" }],
        "small-bold": ["14px", { lineHeight: "1.43", fontWeight: "600" }],
        h1: ["36px", { lineHeight: "0.78", fontWeight: "500" }],
        h2: ["24px", { lineHeight: "1.5", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.6", fontWeight: "600" }],
        h4: ["18px", { lineHeight: "1.56", fontWeight: "500" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        button:
          "0px 1px 10px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        "button-additional": "0px 0.5px 1.5px 0px rgba(0, 0, 0, 0.35)",
        card: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
