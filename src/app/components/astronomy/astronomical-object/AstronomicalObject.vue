<template>
  <div>
    <div v-if="top === undefined">
      <div
        v-for="item in orbitPoints"
        :style="{top: `${item.x}vw`, left: `${item.y}vw`, backgroundColor: color}"
        class="orbit-point"
      />
    </div>
    <div
      v-if="top !== undefined || currentOrbitPoint !== null"
      :style="{
        width: `${size}vw`,
        height:`${size}vw`,
        top: `${(top !== undefined ? top : orbitPoints[currentOrbitPoint].x) - size/2}vw` ,
        left:`${ (left !== undefined ? left : orbitPoints[currentOrbitPoint].y) - size/2}vw`,
        background: color
      }"
      class="celestial-object"
    >
      <div class="label">
        <p class="name">
          {{ name }}
        </p>
        <p
          v-if="top === undefined"
          class="distance"
        >
          ({{ (((orbitPoints[currentOrbitPoint].x ** 2 + orbitPoints[currentOrbitPoint].y ** 2) ** 0.5) * 0.1391).toFixed(3) }}
          × 10<sup>8</sup> km)
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import '../../../../assets/scss/vars';
  .celestial-object{
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    transition: all linear 1000ms ;

    .label {
      color: $white;
      font-family: $font-family-sans-serif;
      position: relative;
      top: -2rem;

      .name {
        font-size: 0.9rem;
        font-weight: 900;
        text-align: center;
      }

      .distance {
        font-size: 0.7rem;
        text-align: center;
        min-width: 8rem;
      }

    }
  }

  .orbit-point {
    position: absolute;
    width: 2px;
    height: 2px;
  }
</style>

<script type="text/javascript">
export default {
  name: 'SiteHeader',
  props: {
    size: {
      type: Number,
      required: true,
    },
    top: {
      type: Number,
      required: false,
      default: undefined,
    },
    left: {
      type: Number,
      required: false,
      default: undefined,
    },
    color: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gravitationalParam: {
      type: Number,
      default: null,
    },
    eccentricity: {
      type: Number,
      default: null,
    },
    lastAphelionDate: {
      type: Date,
      default: new Date(),
    },
    aphelionDistance: {
      type: Number,
      default: null,
    },
    revolutionPeriodInEarthDays: {
      type: Number,
      default: null,
    },
    simulatedDaysPerSecond: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    orbitPoints: [],
    currentOrbitPoint: null,
  }),
  computed: {
    startOrbitPoint() {
      const daysFromAphelion = (Math.abs(new Date() - this.lastAphelionDate) * (1.15741 * (10 ** -8)));
      const stepsFromAphelion = Math.round(daysFromAphelion / this.simulatedDaysPerSecond);
      const x = stepsFromAphelion > this.stepsInACompleteOrbit ? stepsFromAphelion - this.stepsInACompleteOrbit : stepsFromAphelion;
      if(this.name === 'Mercury') {
        console.log('days:',daysFromAphelion);
        console.log('steps:', stepsFromAphelion, '/', this.stepsInACompleteOrbit);
        console.log('start', x);
      }
      return x;
    },
    squaredSpecificAngularMomentum() {
      return (this.aphelionDistance * this.gravitationalParam) / (1 + this.eccentricity);
    },
    stepsInACompleteOrbit() {
      return this.revolutionPeriodInEarthDays / this.simulatedDaysPerSecond;
    },
  },
  watch: {
    gravitationalParam() {
      this.loadPoints();
    },
  },
  mounted() {
    this.loadPoints();

    // console.log(this.name);
    // console.log(0.1391 * (this.squaredSpecificAngularMomentum / this.gravitationalParam) * (1 + this.eccentricity));
    // console.log(0.1391 * (this.squaredSpecificAngularMomentum / this.gravitationalParam) * (1 - this.eccentricity));

    let firstOrbit = true;
    setInterval(() => {
      if (firstOrbit) {
        this.currentOrbitPoint = this.startOrbitPoint;
        firstOrbit = false;
      } else {
        this.currentOrbitPoint = this.currentOrbitPoint + 1 >= this.stepsInACompleteOrbit ? 1 : this.currentOrbitPoint + 1;
      }
    }, 1000);
  },
  methods: {
    loadPoints() {
      this.orbitPoints = [];
      for (let i = 0; i < 2; i += (2 / this.stepsInACompleteOrbit)) {
        const theta = Math.PI * i;
        const r = (this.squaredSpecificAngularMomentum / this.gravitationalParam) * (1 + this.eccentricity * Math.cos(theta));

        this.orbitPoints.push({
          x: r * Math.sin(theta),
          y: r * Math.cos(theta),
        });
      }
    },
  },
};
</script>
