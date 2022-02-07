<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleArt v-if="paint" :paint="paint" />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleArtP from '@/components/SingleArtP.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'SinglePaint',

    components: {
      Header,
      SingleArtP
    },

    data() {
      return {
        paint: null,
        subtitle: ''
      }
    },
    
    methods: {
      ...mapActions([
        'getPaintItem'
      ])
    },

    mounted() {
      this.getPaintItem(this.$route.params.id).then( res => {
        this.paint = res;
        this.subtitle = this.paint.name;
      });
    }
  }

</script>