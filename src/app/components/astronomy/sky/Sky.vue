<template>
  <div
    :style="{left: `${leftOffset}vw`, top: `${topOffset}vh`}"
    class="sky"
  >
    <astronomical-object
      :size="zoomLevel"
      :top="0"
      :left="0"
      color="#a7c43b"
      name="Sun"
    />

    <astronomical-object
      :size="planets.mercury.size"
      :gravitational-param=" planets.mercury.standardGravitionalParameter * zoomLevel"
      :aphelion-distance=" planets.mercury.aphelionDistance * zoomLevel"
      :eccentricity="planets.mercury.size.eccentricity"
      :last-aphelion-date="planets.mercury.lastAphelionDate"
      :revolution-period-in-earth-days="planets.mercury.revolutionPeriodInEarthDays"
      :simulated-days-per-second="simulatedDaysPerSecond"
      color="#b8b4b4"
      name="Mercury"
    />

    <astronomical-object
      :size="earthSize"
      :gravitational-param="3.248599 * (10 ** 14) * zoomLevel"
      :aphelion-distance="78.295 * zoomLevel"
      :eccentricity="0.006772"
      :last-aphelion-date="new Date('2020-07-10')"
      :revolution-period-in-earth-days="224.701"
      :simulated-days-per-second="simulatedDaysPerSecond"
      color="#ce982c"
      name="Venus"
    />

    <astronomical-object
      :size="earthSize"
      :gravitational-param="3.986004418 * (10 ** 14) * zoomLevel"
      :aphelion-distance="109.3 * zoomLevel"
      :eccentricity="0.0167086"
      :last-aphelion-date="new Date('2020-07-04')"
      :revolution-period-in-earth-days="365.256363004"
      :simulated-days-per-second="simulatedDaysPerSecond"
      color="#27a191"
      name="Earth"
    />

    <astronomical-object
      :size="marsSize"
      :gravitational-param="4.282837 * (10 ** 13) * zoomLevel"
      :aphelion-distance="179.1* zoomLevel"
      :eccentricity="0.0934"
      :last-aphelion-date="new Date('2019-08-26')"
      :revolution-period-in-earth-days="686.971"
      :simulated-days-per-second="simulatedDaysPerSecond"
      color="#e2541e"
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
import planets from '../../../assets/data/planets';

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
  computed: {
    earthSize() {
      return this.zoomLevel / 109.2;
    },
    marsSize() {
      return this.zoomLevel / 205.3;
    },
  },
};
</script>
