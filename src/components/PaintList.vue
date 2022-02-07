<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="paintIDs.length"
      :per-page="perPage"
      aria-controls="paint-table"
    ></b-pagination>
    <b-table
      id="paint-table"
      hover
      fixed
      :fields="fields"
      :paintItems="paintItems"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="paintIDs.length"
      :per-page="perPage"
      aria-controls="paint-table"
    ></b-pagination>
  </div>
</template>

<script>

  import { mapActions, mapState} from 'vuex';

  export default {
    name: 'PaintList',

    data() {
      return {
        fields: ['name', 'artist', 'year', 'description'],
        paintItems: [],
        currentPage: 1,
        perPage: 3
      }
    },

    computed: {
      ...mapState([
         'paintIDs',
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.paintIDs.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage).map( id => {
          this.getPaintItem(id).then( obj => {this.paintItems.push(obj); console.log("usaooo" + this.paintItems)} );
        });
      },

      paintIDs(nVal, oVal) {
        this.currentPage = 1;
        this.paintItems = [];

        nVal.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage).map( id => {
          this.getPaintItem(id).then( obj => {this.paintItems.push(obj); console.log("usaooo" + this.paintItems)});
        });
      }
    },

    mounted() {
      this.paintIDs.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage).map( id => {
        this.getPaintItem(id).then( obj => {this.paintItems.push(obj); console.log("usaooo" + this.paintItems)} );
      });
    },

    methods: {
      ...mapActions([
        'getPaintItem'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'SinglePaint', params: { id: record.id } });
      }
    }
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>