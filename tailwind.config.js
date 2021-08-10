module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.js', './pages/**/*.mdx', './components/**/*.jsx'],
    safelist: ["opacity-0", "animate-fade-in"],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4361a2',
          light: '#73a0ec',
          dark: '#132257',
        },
        accent: {
          DEFAULT: '#c73156',
          light: '#ff6188',
          dark: '#8f0024',
        },
      },
      fontFamily: {
        sans: ['Public Sans', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'mono'],
      },
      screens: {
        'xs': '370px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '8': '8px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.2)',
        none: 'none',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(1.5em)' },
          '100%': { opacity: 1 },
        },
      },
      translate: {
        'fullx2': '200%',
        'fullx3': '300%',
        'fullx4': '400%',
        'fullx5': '500%',
      },
      zIndex: {
        '-10': '-10',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: null,
            strong: {
              fontWeight: 700,
              transition: 'color 300ms ease-in-out',
            },
            hr: {
              borderColor: theme('colors.gray.500'),
              transition: 'border-color 300ms ease-in-out',
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.500'),
              transition: 'color 300ms ease-in-out',
              transition: 'border-left-color 300ms ease-in-out',
            },
            li: {
              transition: 'color 300ms ease-in-out',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
              transition: 'color 300ms ease-in-out',
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
              transition: 'background-color 300ms ease-in-out',
            },
            h1: {
              fontSize: null,
              transition: 'color 300ms ease-in-out',
            },
            h2: {
              transition: 'color 300ms ease-in-out',
            },
            h3: {
              transition: 'color 300ms ease-in-out',
            },
            h4: {
              transition: 'color 300ms ease-in-out',
            },
            p: {
              transition: 'color 300ms ease-in-out',
            },
          },
        },
        dark: {
          css: {
            a: null,
            strong: {
              color: theme('colors.white'),
              transition: 'color 300ms ease-in-out',
            },
            hr: {
              borderColor: theme('colors.gray.400'),
              transition: 'border-color 300ms ease-in-out',
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.400'),
              transition: 'color 300ms ease-in-out',
              transition: 'border-left-color 300ms ease-in-out',
            },
            li: {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
            'ol > li::before': {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.100'),
              transition: 'background-color 300ms ease-in-out',
            },
            h1: {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
            h2: {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
            h3: {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
            h4: {
              color: theme('colors.gray.400'),
              transition: 'color 300ms ease-in-out',
            },
            p: {
              color: theme('colors.gray.100'),
              transition: 'color 300ms ease-in-out',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
