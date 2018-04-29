<template>
  <div class="a-input__wrapper">
    <slot ></slot>
    <input type="text" :value="formatVal" @change="onChange($event)" @keyup.enter="$emit('change')"><span>{{unit}}</span>
  </div>
</template>
<style scoped>
  input {
    padding: 4px;
    margin: 4px;
    border-radius: 3px;
    border: 1px solid gray;
    outline-color: transparent;
  }

  input[type='text']:hover {
    border-color: orange;
  }
</style>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
  },

  computed: {
    formatVal () {
      console.warn(`value changed by user..: ${this.value}`);
      if (this.unit === '%') {
        return (this.value * 100).toFixed(2);
      }
      return this.value.toLocaleString();
    }
  },

  methods: {
    onChange(evt) {
      console.warn(`target.value: ${evt.target.value}`);
      const ridOfComma = evt.target.value.replace(/,/g, '');
      const newVal = this.unit === '%'? parseFloat(ridOfComma)/100 : parseFloat(ridOfComma);
      console.warn(`submit newVal : ${newVal}`);
      this.$emit('input', newVal);
    }
  }
}
</script>
