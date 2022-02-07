<template>
  <div id="app">
    <Header subtitle="Home"/>
    <img
      src="../assets/homepage.png"
      width="830"
      alt="Logo"
    />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    
    components: {
      Header
    }
  }
</script>
