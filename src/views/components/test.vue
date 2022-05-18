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
  }
}
</script>

<style scoped>
  .container{
    height: calc(100vh - 50px);
  }
  .hasTagsView .container{
    height: calc(100vh - 84px);
  }
</style>

