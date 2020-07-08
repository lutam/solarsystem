<template>
  <div>
    <div
      :style="{
        width: `${size}vw`,
        height:`${size}vw`,
        top: `${top - size/2}vw` ,
        left:`${left- size/2}vw`,
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
          ({{ (((orbitPoints[currentOrbitPoint].x ** 2 + orbitPoints[currentOrbitPoint].y ** 2) ** 0.5) *
            0.1391).toFixed(3) }}
          × 10<sup>8</sup> km)
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
    @import '../../../../assets/scss/vars';

    .celestial-object {
        border-radius: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        transition: all linear 1000ms;

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
  },
};
</script>
