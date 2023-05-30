<script setup lang="ts">
import { ref, watchPostEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

import { pageTitle } from '@/state/sidebarLayoutState'
import MobileNavbar from '@/components/navigation/mobile/MobileNavbar.vue'
import NotificationsMobileDropdown from '@/components/partials/dropdowns/NotificationsMobileDropdown.vue'
import UserProfileDropdown from '@/components/partials/dropdowns/UserProfileDropdown.vue'
import MobileSidebar from '@/components/navigation/mobile/MobileSidebar.vue'
import DashboardsMobileSubsidebar from '@/layouts/mobile-subsidebars/DashboardsMobileSubsidebar.vue'
import ComponentsMobileSubsidebar from '@/layouts/mobile-subsidebars/ComponentsMobileSubsidebar.vue'
import ElementsMobileSubsidebar from '@/layouts/mobile-subsidebars/ElementsMobileSubsidebar.vue'
import Sidebar from '@/components/navigation/desktop/Sidebar.vue'
import Toolbar from '@/components/partials/toolbars/Toolbar.vue'
import ToolbarNotification from '@/components/partials/toolbars/ToolbarNotification.vue'
import LayoutsMobileSubsidebar from '@/layouts/mobile-subsidebars/LayoutsMobileSubsidebar.vue'
import AnimatedLogo from '@/components/svg/AnimatedLogo.vue'
import DashboardsSubsidebar from '@/layouts/sidebar-subsidebar/DashboardsSubsidebar.vue'

export type SidebarTheme =
  | 'default'
  | 'color'
  | 'color-curved'
  | 'curved'
  | 'float'
  | 'labels'
  | 'labels-hover'

const props = withDefaults(
  defineProps<{
    theme?: SidebarTheme
    defaultSidebar?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSidebar: 'dashboard',
    theme: 'default'
  }
)

const route = useRoute()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  const isOpen = isDesktopSidebarOpen.value
  const wrappers = document.querySelectorAll('.view-wrapper')

  wrappers.forEach((wrapper) => {
    if (!isOpen) {
      wrapper.classList.remove('is-pushed-full')
    } else if (!wrapper.classList.contains('is-pushed-full')) {
      wrapper.classList.add('is-pushed-full')
    }
  })
})
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink to="/" class="navbar-item is-brand">
          <AnimatedLogo />
        </RouterLink>
        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            aria-label="Display dashboard content"
            @click="activeMobileSubsidebar = 'dashboard'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:activity"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Dsiplay layout content"
            :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
            @click="activeMobileSubsidebar = 'layout'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Dsiplay element content"
            :class="[activeMobileSubsidebar === 'elements' && 'is-active']"
            @click="activeMobileSubsidebar = 'elements'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:box"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Dsiplay components content"
            :class="[activeMobileSubsidebar === 'components' && 'is-active']"
            @click="activeMobileSubsidebar = 'components'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:cpu"></i>
          </a>
        </li>
        <li>
          <RouterLink to="/">
            <i aria-hidden="true" class="iconify" data-icon="feather:message-circle"></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li></li>
        <li>
          <a aria-label="View settings" href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <transition name="slide-x">
      <LayoutsMobileSubsidebar v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'layout'" />
      <DashboardsMobileSubsidebar
        v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'"
      />
      <ComponentsMobileSubsidebar
        v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'components'"
      />
      <ElementsMobileSubsidebar
        v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'elements'"
      />
    </transition>

    <!-- Desktop navigation -->

    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Dashboards -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            data-content="Dashboards"
            aria-label="View dashboards"
            @click="switchSidebar('dashboard')"
          >
            <Icon class="iconify sidebar-svg" icon="feather:activity" />
          </a>
        </li>

        <!-- Layouts -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
            data-content="Layouts"
            aria-label="View layouts"
            @click="switchSidebar('layout')"
          >
            <Icon class="iconify sidebar-svg" icon="feather:grid" />
          </a>
        </li>

        <!-- Elements -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'elements' && 'is-active']"
            data-content="Elements"
            aria-label="View elements"
            @click="switchSidebar('elements')"
          >
            <Icon class="iconify sidebar-svg" icon="feather:box" />
          </a>
        </li>

        <!-- Components -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'components' && 'is-active']"
            data-content="Components"
            aria-label="View components"
            @click="switchSidebar('components')"
          >
            <Icon class="iconify sidebar-svg" icon="feather:cpu" />
          </a>
        </li>

        <!-- Messaging -->
        <li>
          <RouterLink id="open-messages" to="/" data-content="Messaging">
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:message-circle"
            ></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <!-- Switch Sidebar  Layouts -->
        <li class="is-hidden-touch"></li>

        <!-- Search -->
        <li class="right-panel-trigger is-hidden-touch">
          <a aria-label="Close all panels" class="is-hidden is-inactive">
            <i aria-hidden="true" class="iconify sidebar-svg" data-icon="feather-x" />
          </a>
        </li>

        <!-- Settings -->
        <li class="is-hidden-touch">
          <RouterLink id="open-settings" to="/" data-content="Settings">
            <i aria-hidden="true" class="iconify sidebar-svg" data-icon="feather:settings"></i>
          </RouterLink>
        </li>

        <!-- Profile Dropdown -->
        <li>
          <UserProfileDropdown up />
        </li>
      </template>
    </Sidebar>
    <DashboardsSubsidebar v-if="isDesktopSidebarOpen" />

    <div class="view-wrapper">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span :class="[isDesktopSidebarOpen && 'active']" class="icon-box-toggle">
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar">
              <ToolbarNotification />
            </Toolbar>
          </div>

          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
