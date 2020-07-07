<template>
  <div>
    <div
      :style="{width: `${size}vw`, height:`${size}vw`, top, left, background: color}"
      class="celestial-object"
    >
      <p class="label">{{name}}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import '../../../../assets/scss/vars';
  .celestial-object{
    border-radius: 50%;
    background: aqua;
    position: absolute;
    display: flex;
    justify-content: center;

    .label {
      color: $white;
      font-family: $font-family-sans-serif;
      font-size: 0.9rem;
      font-weight: 900;
      position: relative;
      top: -2rem;

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
      type: String,
      required: true,
    },
    left: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    title: 'TITLE ON HEADER',
  }),
};
</script>
