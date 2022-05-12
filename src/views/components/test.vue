<template>
  <div class="container">
    <test />
  </div>
</template>
<script>
import Begin from './ext_el_begin'
export default {
  name: 'Aside',
  components: {
    'test': Begin
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style scoped>
  aside{
    padding:0;
    margin: 0;
    width: 240px;
    height:100%;
  }
  .container{
    height: calc(100vh - 50px);
  }
  .hasTagsView .container{
    height: calc(100vh - 84px);
  }
</style>

