# Forge React Starter

A starter project that integrates forge javascript sdk with mainstream javascript application batteries:

- [Next.js] for crafting pages and SSR
- [React] the framework for view layer
- [Material-UI] for resuable react components
- [Express.js] as custom web server that can serve custom api
- [Mongoose] as database ORM layer

Forge SDK libraries included in the starter project:

- [@arcblock/graphql-client] as communication layer between application and forge powered blockchain
- [@arcblock/did-auth-react] react components that can implements basic UI elements to connect your application with ABT Wallet
- [@arcblock/did-auth-storage] storage engines that powers the magic behind ABT Wallet qrcode scanning

Other javascript project goodies:

- [eslint] for consistent coding style
- [prettier] for consistent code formatting
- [husky] and [lint-staged] for prepush and precommit hooks
- [nodemon] for auto restart server on node.js code change
- [next.js] supports hot reload on client code change
- [dotenv] to load configurations from `.env.x` files

## Folder Structure

```terminal
.
├── LICENSE
├── Makefile
├── README.md
├── app.js                    // application entry file
├── client                    // code for client side pages
│   ├── babel.config.js       // custom babel configuration
│   ├── components            // shared react components/layouts across all pages
│   ├── hooks                 // shared react hooks
│   ├── libs                  // shared utility code
│   ├── next.config.js        // custom next.js configuration
│   ├── pages                 // pages
│   └── static                // static assets that can be loaded by browser
├── package.json
├── server                    // backend code
│   ├── libs                  // shared server libs
│   ├── models                // mongoose db models
│   └── routes                // express routes and handlers
├── version
└── yarn.lock
```

## Documentation

TODO:

## LICENSE

TODO:
