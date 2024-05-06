/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["inter", "sans-serif"], // Edit here for global font
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {

        /** NEUTRAL COLORS */
        "neutral-50": "#f8fafc",
        "neutral-100": "#f1f5f9",
        "neutral-200": "#e2e8f0",
        "neutral-300": "#cbd5e1",
        "neutral-400": "#94a3b8",
        "neutral-500": "#64748b",
        "neutral-600": "#475569",
        "neutral-700": "#334155",
        "neutral-800": "#1e293b",
        "neutral-900": "#0f172a",

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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({addUtilities}) {
      const newUtilities = {};
      const fontStylesByTypes = {
        idisplay: {
          xl: {
            fontSize: `${66/16}rem`,
            lineHeight: '120%',
            letterSpacing: `${-0.025*66/16}rem`,
          },
          l: {
            fontSize: `${48/16}rem`,
            lineHeight: '120%',
            letterSpacing: `${-0.025*48/16}rem`,
          },
          m: {
            fontSize: `${42/16}rem`,
            lineHeight: '120%',
            letterSpacing: `${-0.025*42/16}rem`,
          },
          s: {
            fontSize: `${36/16}rem`,
            lineHeight: '120%',
            letterSpacing: `${-0.025*36/16}rem`,
          },
        },
        iheading: {
          xxxl: {
            fontSize: `${48/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*48/16}rem`,
          },
          xxl: {
            fontSize: `${40/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*40/16}rem`,
          },
          xl: {
            fontSize: `${32/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*32/16}rem`,
          },
          l: {
            fontSize: `${24/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*24/16}rem`,
          },
          m: {
            fontSize: `${20/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*20/16}rem`,
          },
          s: {
            fontSize: `${18/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*18/16}rem`,
          },
          xs: {
            fontSize: `${16/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*16/16}rem`,
          },
          xxs: {
            fontSize: `${14/16}rem`,
            lineHeight: '132%',
            letterSpacing: `${-0.03*14/16}rem`,
          },
        },
        ibody: {
          xxl: {
            fontSize: `${20/16}rem`,
            lineHeight: '148%',
            letterSpacing: `${-0.01*20/16}rem`,
          },
          xl: {
            fontSize: `${18/16}rem`,
            lineHeight: '148%',
            letterSpacing: `${-0.01*18/16}rem`,
          },
          l: {
            fontSize: `${16/16}rem`,
            lineHeight: '148%',
            letterSpacing: `${-0.01*16/16}rem`,
          },
          m: {
            fontSize: `${14/16}rem`,
            lineHeight: '148%',
            letterSpacing: `${-0.01*14/16}rem`,
          },
          s: {
            fontSize: `${12/16}rem`,
            lineHeight: '148%',
            letterSpacing: `${-0.01*12/16}rem`,
          },
        },
        ilabel: {
          xl: {
            fontSize: `${14/16}rem`,
            lineHeight: '142%',
          },
          l: {
            fontSize: `${13/16}rem`,
            lineHeight: '142%',
          },
          m: {
            fontSize: `${12/16}rem`,
            lineHeight: '142%',
          },
          s: {
            fontSize: `${10/16}rem`,
            lineHeight: '142%',
          },
        },
      }

      for(const [_type, _variant] of Object.entries(fontStylesByTypes)) {
        for (const [_v, _style] of Object.entries(_variant)) {
          newUtilities[`.${_type}-${_v}`] = _style;
        }
      }
      addUtilities(newUtilities);
    }
  ],
}