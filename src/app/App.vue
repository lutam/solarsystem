<template>
  <div class="app">
    <Sky
      :zoom-level="zoomLevel"
      :left-offset="leftOffset"
    />
    <ZoomButtons
      :zoom-level="zoomLevel"
      @set-zoom-level="setZoomLevel"
    />
  </div>
</template>

<style scoped lang="scss">
  .app{
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
</style>

<script type="text/javascript">
import Sky from './components/astronomy/sky/Sky.vue';
import ZoomButtons from './components/navigation/zoom-buttons/ZoomButtons.vue';

export default {
  name: 'App',
  components: {
    ZoomButtons,
    Sky,
  },
  data: () => ({
    zoomLevel: 1,
    leftOffset: 0,
  }),
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { this.leftOffset += 2 / this.zoomLevel; }
      if (event.key === 'ArrowLeft') { this.leftOffset -= 2 / this.zoomLevel; }
    });
  },
  methods: {
    setZoomLevel(newZoomLevel) { this.zoomLevel = newZoomLevel; },
  },
};
</script>
