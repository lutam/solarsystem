<template>
  <astronomical-object
    :size="zoomLevel / planet.size"
    :gravitational-param=" planet.standardGravitionalParameter * zoomLevel"
    :aphelion-distance=" planet.aphelionDistance * zoomLevel"
    :eccentricity="planet.eccentricity"
    :last-aphelion-date="planet.lastAphelionDate"
    :revolution-period-in-earth-days="planet.revolutionPeriodInEarthDays"
    :simulated-days-per-second="simulatedDaysPerSecond"
    :color="planet.color"
    :name="planet.name"
  />
</template>

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
};
</script>
