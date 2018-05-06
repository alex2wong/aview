<template>
  <a href="#" class="a-button " @click="$emit('click')">
    <slot></slot>
  </a>
</template>
<style>
  .a-button {
    display: inline-block;
    padding: 6px;
    margin: 6px;
    border-radius: 3px;
    border: 1px solid gray;
    text-decoration: none;
    user-select: none;
  }
  .a-button:hover {
    color: #eee;
    background: #333;
  }
  .primary {
    background: #61bd12;
  }

</style>

<script>
export default {
  
}
</script>
