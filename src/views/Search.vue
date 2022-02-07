<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ImageList />
    <PaintList />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import ImageList from '@/components/ImageList.vue';
  import PaintList from '@/components/PaintList.vue';

  import { mapActions } from 'vuex';

  export default {
    name: 'Search',
    
    components: {
      Header,
      ImageList,
      PaintList
    },

    data() {
      return {
        subtitle: 'Search results: ',
        imageIDs: null,
        paintIDs: null,
      }
    },

    mounted() {
      this.search(this.$route.query.q).then( res => {
        this.subtitle += res;
      });
    },

    methods: {
      ...mapActions([
        'search'
      ])
    }
  }
</script>

<style scoped>

</style>
