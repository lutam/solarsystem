<template>
  <div class="zoom-buttons">
    <button @click="zoomOut">
      -
    </button>
    <button @click="zoomIn">
      +
    </button>
  </div>
</template>

<style scoped lang="scss">
    @import '../../../../assets/scss/vars';

    .zoom-buttons {
        display: flex;
        position: fixed;
        right: 0;
        bottom: 0;
        button {
            width: 3rem;
            height: 3rem;
            border: 1px solid $white;
            box-shadow:
                inset 2px 0 0 #333333,
                inset 0 2px 0 #333333,
                inset 0 -2px 0 #333333,
                inset -2px 0 0 #333333;
            font-size:2rem;
        }
    }
</style>

<script>
export default {
  name: 'ZoomButtons',
  props: {
    zoomLevel: {
      type: Number,
      required: true,
    },
  },
  methods: {
    zoomOut() {
      const newZoomLevel = this.zoomLevel * 0.9;
      this.stepZoomLevel(newZoomLevel);
    },
    zoomIn() {
      const newZoomLevel = this.zoomLevel * 1.1;
      this.stepZoomLevel(newZoomLevel);
    },
    stepZoomLevel(step) {
      this.$emit('set-zoom-level', step);
    },
  },
};
</script>
