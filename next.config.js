const withNextra = require('nextra')(
  /**
   * @type { import("next").Config }
   */
  {
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    transpilePackages: ['geist']
  }
)

const nextraConfig = withNextra()

module.exports = {
  ...nextraConfig,

  transpilePackages: ['geist']
}
