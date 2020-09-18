# Had to do the following to get Fluid going in Angular

Update: https://blog.lysender.com/2018/07/angular-6-cannot-resolve-crypto-fs-net-path-stream-when-building-angular/

- `npm i assert`
- Add the following into `polyfills.ts`:

```typescript
(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
global.process = require('process');
global.process.env = { NODE_DEBUG: 'false' }
```

