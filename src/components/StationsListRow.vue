<template>
  <div class="stations-list-row df jcsb">
    <span>
      <p>
        {{ name }}
      </p>
    </span>
    <span>
      <p>
        {{ bikes }}
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StationsListRow',
  data () {
    return {
      sortBy: ''
    }
  },
  props: ['name', 'bikes'],
  components: {
  },
  methods: {
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
</style>
