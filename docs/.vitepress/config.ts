import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config

export default defineConfig({
  lang        : 'en-US',
  base        : '/', // https://btc1.tools
  title       : 'DID BTC1 JS',
  description : 'Monorepo for did:btc1 js/ts implementation and supporting packages.',
  cleanUrls   : true,
  themeConfig : {
    outline : {
      level : [2, 3]
    },
    externalLinkIcon : true,
    search           : {
      provider : 'local'
    },
    nav : [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Change Log', link: '/change-log' },
    ],

    sidebar : [
      {
        text  : 'Getting Started',
        link  : '/getting-started',
        items : [
          { text: 'Installation', link: '/installation' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Usage', link: '/usage' },
        ],
      },
      {
        text  : 'Packages',
        link  : '/packages',
        items : [
          { text: 'Common', link: '/packages/common/globals' },
          { text: 'Keypair', link: '/packages/keypair/globals' },
          { text: 'Cryptosuite', link: '/packages/cryptosuite/globals' },
          { text: 'Method', link: '/packages/method/globals' },
          { text: 'CLI', link: '/packages/cli/globals' },
          { text: 'SMT', link: '/packages/smt/globals' },
        ]
      }
    ],

    socialLinks : [{ icon: 'github', link: 'https://github.com/dcdpr/did-btc1-js' }],
  }
});