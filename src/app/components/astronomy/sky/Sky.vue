<template>
  <div
    :style="{left: `${leftOffset}vw`}"
    class="sky"
  >
    <div style="position: fixed; top: 0; left: 0; z-index: 9; width: 100vw; background: bisque;">
      MDFS/EDFS =
      {{ ((sunDistanceFromCenter - marsDistanceFromCenter)/(sunDistanceFromCenter -
        earthDistanceFromCenter)).toFixed(2) }}
    </div>
    <astronomical-object
      :size="zoomLevel"
      :top="`calc(50vh - ${zoomLevel/2}vw)`"
      :left="`${sunDistanceFromCenter}vw`"
      color="#a7c43b"
      name="Sun"
    />
    <astronomical-object
      :size="earthSize"
      :left="`${earthDistanceFromCenter}vw`"
      top="50vh"
      color="#27a191"
      name="Earth"
    />
    <astronomical-object
      :size="marsSize"
      :left="`${marsDistanceFromCenter}vw`"
      top="50vh"
      color="#27a191"
      name="Mars"
    />
  </div>
</template>

<style scoped lang="scss">
    .sky {
        position: absolute;
        width: 100%;
        height: 100%;

        &:after {
            position: fixed;
            content: "";
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vw;
            background: #333333;
            z-index: -1;

        }
    }
</style>

<script type="text/javascript">
import AstronomicalObject from '../astronomical-object/AstronomicalObject.vue';

export default {
  name: 'App',
  components: {
    AstronomicalObject,
  },
  props: {
    zoomLevel: {
      type: Number,
      required: true,
    },
    leftOffset: {
      type: Number,
      required: true,
    },
  },
  computed: {
    earthSize() {
      return this.zoomLevel / 109.2;
    },
    marsSize() {
      return this.zoomLevel / 205.3;
    },
    sunEarthDistance() {
      return this.zoomLevel * 109.3;
    },
    sunMarsDistance() {
      return this.zoomLevel * 149.2;
    },
    relativeDistanceFromCenter() {
      return 50 - this.leftOffset + this.leftOffset * this.zoomLevel;
    },
    earthDistanceFromCenter() {
      return this.relativeDistanceFromCenter - this.earthSize / 2 - this.sunEarthDistance;
    },
    marsDistanceFromCenter() {
      return this.relativeDistanceFromCenter - this.marsSize / 2 - this.sunMarsDistance;
    },
    sunDistanceFromCenter() {
      return this.relativeDistanceFromCenter - this.zoomLevel / 2;
    },
  },
};
</script>
