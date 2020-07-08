<template>
  <div class="planet">
    <div
      v-for="item in orbitPoints"
      :style="{top: `${item.x}vw`, left: `${item.y}vw`, backgroundColor: planet.color}"
      class="orbit-point"
    />

    <astronomical-object
      v-if="currentOrbitPoint !== null && orbitPoints.length > currentOrbitPoint"
      :size="zoomLevel / planet.size"
      :top="orbitPoints[currentOrbitPoint].x"
      :left="orbitPoints[currentOrbitPoint].y"
      :color="planet.color"
      :name="planet.name"
    />
  </div>
</template>

<style scoped lang="scss">
  .orbit-point {
    position: absolute;
    width: 1px;
    height: 1px;
  }
</style>

<script type="text/javascript">
import AstronomicalObject from '../AstronomicalObject.vue';

export default {
  name: 'Planet',
  components: {
    AstronomicalObject,
  },
  props: {
    planet: {
      type: Object,
      required: true,
    },
    zoomLevel: {
      type: Number,
      required: true,
    },
    simulatedDaysPerSecond: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    orbitPoints: [],
    currentOrbitPoint: null,
  }),
  computed: {
    startOrbitPoint() {
      const daysFromAphelion = (Math.abs(new Date() - this.planet.lastAphelionDate) * (1.15741 * (10 ** -8)));
      const stepsFromAphelion = Math.round(daysFromAphelion / this.simulatedDaysPerSecond);
      return stepsFromAphelion > this.stepsInACompleteOrbit ? stepsFromAphelion - this.stepsInACompleteOrbit : stepsFromAphelion;
    },
    squaredSpecificAngularMomentum() {
      return (this.scaledAphelionDistance * this.scaledGravitationalParam) / (1 + this.planet.eccentricity);
    },
    stepsInACompleteOrbit() {
      return Math.round(this.planet.revolutionPeriodInEarthDays / this.simulatedDaysPerSecond);
    },
    scaledGravitationalParam() {
      return this.planet.standardGravitionalParameter * this.zoomLevel;
    },
    scaledAphelionDistance() {
      return this.planet.aphelionDistance * this.zoomLevel;
    },
  },

  watch: {
    scaledGravitationalParam() {
      this.loadPoints();
    },
  },
  mounted() {
    this.loadPoints();

    let firstOrbit = true;
    setInterval(() => {
      if (firstOrbit) {
        this.currentOrbitPoint = this.startOrbitPoint;
        firstOrbit = false;
      } else {
        const maxIndex = 2 / (2 / this.stepsInACompleteOrbit);
        this.currentOrbitPoint = this.currentOrbitPoint + 1 > maxIndex ? 1 : this.currentOrbitPoint + 1;
      }
    }, 1000);
  },
  methods: {
    loadPoints() {
      this.orbitPoints = [];
      for (let i = 0; i < 2; i += (2 / this.stepsInACompleteOrbit)) {
        const theta = Math.PI * i;
        const r = (this.squaredSpecificAngularMomentum / this.scaledGravitationalParam) * (1 + this.planet.eccentricity * Math.cos(theta));

        this.orbitPoints.push({
          x: r * Math.sin(theta),
          y: r * Math.cos(theta),
        });
      }
    },
  },
};
</script>
