import React from "react"
import { DocsThemeConfig } from "nextra-theme-docs"

const config: DocsThemeConfig = {
  logo: <span>HTTP React</span>,
  project: {
    link: "https://github.com/atomic-state/http-react",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase:
    "https://github.com/atomic-state/http-react.netlify.app/tree/main",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – HTTP React",
      description: "React hooks for data fetching",
    }
  },
  footer: {
    text: "Built with Nextra",
  },
}

export default config
