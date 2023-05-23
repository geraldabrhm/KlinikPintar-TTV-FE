<script lang="ts">
  export default {
    name: 'Header',
  }
</script>

<template>
  <header>
    <div class="website-title">
      <router-link to="/">
        <h3>TTV <span class="italic">@KlinikPintar</span></h3>
      </router-link>
    </div>
    <div class="menu-list">
      <router-link to="/user" class="menu-item">
        User
      </router-link>
      <router-link to="/vital" class="menu-item">
        Vital
      </router-link>
    </div>
  </header>
</template>

<style scoped>
  .website-title {
    @apply flex flex-row justify-start items-center;
  }

  .menu-list {
    @apply flex flex-row justify-end items-center;
  }

  .menu-item {
    @apply hover:bg-white hover:text-[#12ae8f] px-4 py-2 rounded-md cursor-pointer;
  }
</style>
