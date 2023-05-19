<script setup lang="ts">
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import useDropdown from '@/composable/useDropdown'
import { useViaPlaceholderError } from '@/composable/useViaPlaceholderError'

const dropdownElement = ref<HTMLElement>()
const dropdown = useDropdown(dropdownElement)
</script>

<template>
  <div class="toolbar-notifications is-hidden-mobile">
    <div ref="dropdownElement" class="dropdown is-spaced is-dots is-right dropdown-trigger">
      <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
        <Icon icon="feather:bell" />
        <span class="new-indicator pulsate"></span>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="heading">
            <div class="heading-left">
              <h6 class="heading-title">Notifications</h6>
            </div>
            <div class="heading-right">
              <RouterLink class="notification-link" to="/"> See all </RouterLink>
            </div>
          </div>
          <ul class="notification-list">
            <!--            <li>-->
            <!--              <a class="notification-item">-->
            <!--                <div class="img-left">-->
            <!--                  <img-->
            <!--                    class="user-photo"-->
            <!--                    alt=""-->
            <!--                    src="/demo/avatars/7.jpg"-->
            <!--                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"-->
            <!--                  />-->
            <!--                </div>-->
            <!--                <div class="user-content">-->
            <!--                  <p class="user-info"><span class="name">Alice C.</span> left a comment.</p>-->
            <!--                  <p class="time">1 hour ago</p>-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
