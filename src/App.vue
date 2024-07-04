<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
const { VITE_GLOB_RUN_MODE } = import.meta.env;
import VConsole from 'vconsole';

if (VITE_GLOB_RUN_MODE === 'debug') {
	console.log("-----Enter debug mode---------")
	const vConsole = new VConsole({ theme: 'dark' });
}
const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>
