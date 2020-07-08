<template>
  <div class="date-tracker">
    <p v-if="simulatedDate !== null">
      Date: {{ simulatedDate }}
    </p>
  </div>
</template>

<style scoped lang="scss">
    .date-tracker {
        position: fixed;
        top: 0;
        right: 0;
        width: 15rem;
        height: 2rem;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        color: black;
    }
</style>

<script type="text/javascript">
export default {
  name: 'DateTracker',
  props: {
    simulatedDaysPerSecond: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    simulatedDaysSinceStart: 0,
    simulatedDate: null,
  }),
  watch: {
    simulatedDaysSinceStart(v) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const d = new Date();
      d.setDate(d.getDate() + v);
      this.simulatedDate = `${d.getDate() + 1} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    },
  },
  mounted() {
    let firstOrbit = true;
    setInterval(() => {
      this.simulatedDaysSinceStart += (firstOrbit ? 0.00001 : this.simulatedDaysPerSecond);
      firstOrbit = false;
    }, 1000);
  },
};
</script>
