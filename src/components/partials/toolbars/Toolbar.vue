<script setup lang="ts">
import { ref } from 'vue'

import { isDark, toggleDarkModeHandler } from '@/state/darkModeState'
import { activePanel } from '@/state/activePanelState'
import useDropdown from '@/composable/useDropdown'

const dropdownElement = ref<HTMLElement>()
const dropdown = useDropdown(dropdownElement)
</script>

<template>
  <div class="toolbar ml-auto">
    <div class="toolbar-link">
      <label class="dark-mode ml-auto">
        <input type="checkbox" :checked="!isDark" @change="toggleDarkModeHandler" />
        <span></span>
      </label>
    </div>

    <slot></slot>
  </div>
</template>
