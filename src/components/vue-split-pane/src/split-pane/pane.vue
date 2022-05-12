<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'Pane',
    props: {
      className: String
    },
    data() {
      const classes = [this.$parent.split, this.className]
      return {
        classes: classes.join(' '),
        percent: 50
      }
    }
  }
</script>

<style scoped>
.splitter-pane.vertical.splitter-paneL {
  position: absolute;
  left: 0px;
  height: 100%;
  padding-right: 3px;
}

.splitter-pane.vertical.splitter-paneR {
  position: absolute;
  right: 0px;
  height: 100%;
  padding-left: 3px;
}

.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
  padding-bottom: 3px;
}

.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-top: 3px;
}
</style>
<style scoped>
  .splitter-pane-resizer{
    background:rgb(59, 59, 59);
    opacity: .9;
  }

  .splitter-pane.vertical.splitter-paneL{
    padding-right:0px;
  }
  .splitter-pane.vertical.splitter-paneR{
    padding-left:0px;
  }
  .splitter-pane-resizer.vertical{
    width: 1px;
    height: 100%;
    margin: 0 -0px;
    border-left: 0px solid hsla(0,0%,100%,0);
    border-right: 0px solid hsla(0,0%,100%,0);
  }
  .splitter-pane-resizer.vertical:hover{
    background:yellow;
  }
  .splitter-pane-resizer.vertical:active{
    background:cyan;
  }

  .splitter-pane.horizontal.splitter-paneL {
    padding-bottom: 0px;
  }
  .splitter-pane.horizontal.splitter-paneR {
    padding-top: 0px;
  }
  .splitter-pane-resizer.horizontal {
    height: 1px;
    width: 100%;
    margin: -0px 0;
    border-top: 0px solid hsla(0,0%,100%,0);
    border-bottom: 0px solid hsla(0,0%,100%,0);
  }
  .splitter-pane-resizer.horizontal:hover{
    background:yellow;
  }
  .splitter-pane-resizer.horizontal:active{
    background:cyan;
  }
</style>
