import type { ThemeConfig } from 'antd';

/**
 * Base design tokens mapped from SCSS variables.
 * These tokens are shared between light and dark themes.
 */
const baseTokens = {
  // Colors
  colorPrimary: '#8b5cf6',
  colorSuccess: '#22c55e',
  colorWarning: '#f59e0b',
  colorError: '#ef4444',
  colorInfo: '#0ea5e9',

  // Typography
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 16,
  fontSizeSM: 14,
  fontSizeLG: 18,

  // Border
  borderRadius: 8,
  borderRadiusSM: 4,
  borderRadiusLG: 12,

  // Motion
  motionDurationFast: '150ms',
  motionDurationMid: '250ms',
  motionDurationSlow: '350ms',

  // Disable ripple effect for cleaner look
  wireframe: false,
};

/**
 * Light theme configuration.
 * Maps to CSS custom properties defined in _light.scss.
 */
export const lightTheme: ThemeConfig = {
  token: {
    ...baseTokens,
    // Backgrounds
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f8fafc',
    colorBgElevated: '#ffffff',

    // Text
    colorText: '#0f172a',
    colorTextSecondary: '#475569',
    colorTextTertiary: '#94a3b8',

    // Borders
    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#cbd5e1',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 0 rgba(139, 92, 246, 0.1)',
    },
    Card: {
      boxShadow:
        '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1)',
    },
  },
};

/**
 * Dark theme configuration.
 * Maps to CSS custom properties defined in _dark.scss.
 */
export const darkTheme: ThemeConfig = {
  token: {
    ...baseTokens,
    // Use lighter primary for dark mode
    colorPrimary: '#a78bfa',

    // Backgrounds
    colorBgContainer: '#1e293b',
    colorBgLayout: '#0f172a',
    colorBgElevated: '#334155',

    // Text
    colorText: '#f1f5f9',
    colorTextSecondary: '#cbd5e1',
    colorTextTertiary: '#64748b',

    // Borders
    colorBorder: '#334155',
    colorBorderSecondary: '#475569',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 0 rgba(167, 139, 250, 0.2)',
    },
    Card: {
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
    },
  },
};
