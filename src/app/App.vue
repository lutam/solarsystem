<template>
  <div class="app">
    <Sky
      :zoom-level="zoomLevel"
      :left-offset="leftOffset"
      :top-offset="topOffset"
      :simulated-days-per-second="simulatedDaysPerSecond"
    />
    <DateTracker :simulated-days-per-second="simulatedDaysPerSecond" />
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
    left: 50vw;
    top: 50vh;
  }
</style>

<script type="text/javascript">
import Sky from './components/astronomy/sky/Sky.vue';
import ZoomButtons from './components/navigation/zoom-buttons/ZoomButtons.vue';
import DateTracker from './components/navigation/date-tracker/DateTracker.vue';

export default {
  name: 'App',
  components: {
    DateTracker,
    ZoomButtons,
    Sky,
  },
  data: () => ({
    zoomLevel: 0.04,
    leftOffset: 0,
    topOffset: 0,
  }),
  computed: {
    simulatedDaysPerSecond() { return 365.25 / 40; },
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { this.leftOffset -= 2 / this.zoomLevel; }
      if (event.key === 'ArrowLeft') { this.leftOffset += 2 / this.zoomLevel; }
      if (event.key === 'ArrowUp') { this.topOffset += 2 / this.zoomLevel; }
      if (event.key === 'ArrowDown') { this.topOffset -= 2 / this.zoomLevel; }
    });
  },
  methods: {
    setZoomLevel(newZoomLevel) { this.zoomLevel = newZoomLevel; },
  },
};
</script>
