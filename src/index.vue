<template>
  <example-list :items="items" dir="src"></example-list>
</template>

<script>
  module.exports = {
    components: {
      'example-list': require('./include/example-list.vue')
    },
    data: {
      items: [
        // `name` key is the example filename without '.vue'
        {name: 'syntax/hello-world', title: 'Hello World'},
        {name: 'showcase/itemlist', title: 'List'},
        {name: 'showcase/calculator', title: 'Calculator'},
        {name: 'showcase/new-fashion', title: 'Activity Page'}
      ]
    }
  }
</script>
