<template>
  <div :style="{userSelect}" class="vue-splitter-container clearfix" @mouseup="onMouseUp" @mousemove="onMouseMove">

    <pane class="splitter-pane splitter-paneL" :split="split" :style="{ [type]: percent+'%'}">
      <slot name="paneL"></slot>
      <resizer v-show="resizer_show" :className="className" :style="{ [resizeType]: '100%'}" :split="split" @mousedown.native="onMouseDown" @click.native="onClick"></resizer>
    </pane>
    <pane class="splitter-pane splitter-paneR" :split="split" :style="{ [type]: 100-percent+'%'}">
      <resizer v-show="resizer_show" :className="className" :style="{ [resizeType]: '0%'}" :split="split" @mousedown.native="onMouseDown" @click.native="onClick"></resizer>
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>

<script>
  import Resizer from './resizer.vue'
  import Pane from './pane.vue'

  export default {
    name: 'splitPane',
    components: { Resizer, Pane },
    props: {
      resizer_show: {
        type: Boolean,
        default: true
      },
      minPercent: {
        type: Number,
        default: 0
      },
      maxPercent: {
        type: Number,
        default: 100
      },
      defaultPercent: {
        type: Number,
        default: 50
      },
      split: {
        validator(value) {
          return ['vertical', 'horizontal'].indexOf(value) >= 0
        },
        required: true
      },
      className: String
    },
    computed: {
      userSelect() {
        return this.select ? '' : 'none'
      }
    },
    watch: {
      defaultPercent(newValue, oldValue) {
        this.percent = newValue
      }
    },
    data() {
      return {
        select: true,
        active: false,
        height: null,
        percent: this.defaultPercent,
        type: this.split === 'vertical' ? 'width' : 'height',
        resizeType: this.split === 'vertical' ? 'left' : 'top'
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e)
      },
      onMouseDown() {
        this.select = false;
        if (this.minPercent <= this.percent && this.percent <= this.maxPercent) {
          this.active = true
        }
      },
      onMouseUp() {
        this.select = true;
        this.active = false
      },
      onMouseMove(e) {
        if (e.buttons === 0 || e.which === 0) {
          this.active = false
        }

        if (this.active) {
          let offset = 0
          let target = e.currentTarget
          if (this.split === 'vertical') {
            while (target) {
              offset += target.offsetLeft
              target = target.offsetParent
            }
          } else {
            while (target) {
              offset += target.offsetTop
              target = target.offsetParent
            }
          }

          const currentPage = this.split === 'vertical' ? e.pageX : e.pageY
          const targetOffset = this.split === 'vertical' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight
          const percent = Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100

          if (percent >= this.minPercent && percent <= this.maxPercent) {
            this.percent = percent
          }

          this.$emit('resize', this.percent)
        }
      }
    }
  }
</script>

<style scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.vue-splitter-container {
  height: 100%;
  position: relative;
}

.vue-splitter-container-mask {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
