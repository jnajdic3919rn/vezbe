<template>
  <div>

    <div class="art">
      <img v-if="paint.image" :src="paint.image" />
      <img v-else src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" />
      
      <ul>
        <li>Author: {{ paint.artist }}</li>
        <li>Year: {{ paint.year}}</li>
        <li>Description: {{ paint.description }}</li>
      </ul>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'SingleArtP',

    props: {
      image: Object
    }
  }

</script>

<style scoped>

  img {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>