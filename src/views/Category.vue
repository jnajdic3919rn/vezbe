<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <PaintList />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import PaintList from '@/components/PaintList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Category',
    
    components: {
      Header,
      PaintList
    },

    data() {
        return {
            subtitle: '',
            catID: null
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.catID = this.$route.params.id;
       
        this.fetchIDsByCategory(this.catID);
      }
    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.catID = this.$route.params.id;

        this.fetchIDsByCategory(this.catID);
    },

    methods: {
      ...mapActions([
        'fetchIDsByCategory'
      ])
    }
  }
</script>

<style scoped>

</style>
