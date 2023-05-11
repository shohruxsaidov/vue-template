<script lang="ts" setup>
import { a } from '~Config'
</script>
<template>
  <div>
    <h1>{{ a }}</h1>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
