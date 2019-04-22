<template>
  <div class="wrap page1 f1 df">
    <div class="wrap-inner f1 df fdr">
      Friends
      <!-- <News/> -->
    </div>
  </div>
</template>

<script>
// import CreateNewProject from './CreateNewProject'
// import ProjectCard from './ProjectCard'

export default {
  name: 'DashboardProjects',
  data () {
    return {
      creatingNewProject: false
    }
  },
  props: ['myProjectDetailsList'],
  components: {
    // CreateNewProject,
    // ProjectCard
  },
  methods: {
    addNewProject () {
      this.creatingNewProject = true
    },
    closeNewProject () {
      this.creatingNewProject = false
    }
  },
  computed: {
    // allProjects: {
    //     get: function() {
    //         let projects = this.$store.getters.myProjectListWithDetails;
    //         return projects;
    //     }
    // }
  },
  watch: {
    // allProjects: {
    //   handler: (newProp, oldProp) => {console.log('projects changed', newProp, oldProp)},
    //   deep: true,
    //   immediate: true
    // }
  },
  created () {
    // var callback = function(a, b) {
    //   console.log('projects changed', a, b)
    // }

    // this.$watch('allProjects', callback, {
    //   deep: true
    // })
  }
}
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  /*position: relative;*/
}
.wrap2 {
  position: relative;
  padding: 40px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
}
.add {
  height: 60px;
  width: 60px;
  background-color: #0874D8;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.26);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 40px;
  transform: translateY(-50%);
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  color: white;
  font-size: 28px;
  font-weight: 500;
}
.no-projects {
  padding: 100px 120px;
  max-height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  & > p {
    color: #000000;
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 1.29px;
    line-height: 43px;
    margin-bottom: 40px;
  }
}
</style>
