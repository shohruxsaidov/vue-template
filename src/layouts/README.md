This works best along with the vite-plugin-pages.

Layouts are stored in the /src/layouts folder by default and are standard Vue components with a <router-view><
/router-view> in the template.

```javascript
<route lang="yaml">
  meta:
    layout: users
</route>
```


In the layouts:

```vue
<template>
  <div class='wrapper'>
    <RouterView/>
  </div>
</template>
```

[Read more ...](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
