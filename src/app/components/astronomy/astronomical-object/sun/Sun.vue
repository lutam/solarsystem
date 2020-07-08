<template>
  <astronomical-object
    :size="zoomLevel"
    :top="0"
    :left="0"
    color="#a7c43b"
    name="Sun"
  />
</template>

<script type="text/javascript">
import AstronomicalObject from '../AstronomicalObject.vue';

export default {
  name: 'Sun',
  components: {
    AstronomicalObject,
  },
  props: {
    zoomLevel: {
      type: Number,
      required: true,
    },
  },
};
</script>
