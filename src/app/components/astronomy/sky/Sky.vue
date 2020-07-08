<template>
  <div
    :style="{left: `${leftOffset}vw`, top: `${topOffset}vh`}"
    class="sky"
  >
    <Sun
      :zoom-level="zoomLevel"
    />

    <planet
      v-for="planet in Object.values(planets)"
      :planet="planet"
      :key="planet.name"
      :zoom-level="zoomLevel"
      :simulated-days-per-second="simulatedDaysPerSecond"
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
import Sun from '../astronomical-object/sun/Sun.vue';
import planets from '../../../assets/data/planets';
import Planet from '../astronomical-object/planet/Planet.vue';

export default {
  name: 'App',
  components: {
    Planet,
    Sun,
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
    topOffset: {
      type: Number,
      required: true,
    },
    simulatedDaysPerSecond: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    planets,
  }),
};
</script>
