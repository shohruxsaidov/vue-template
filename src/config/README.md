In the .env file
```
VITE_SOME_KEY=test
you can add variable to .env file with VITE prefix to key
```

In the config

```typescript
export const SOME_KEY:string = import.meta.env.VITE_SOME_KEY || 'test'
// with default value
```