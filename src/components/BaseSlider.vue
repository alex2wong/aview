<template>
  <div :style="{'height': vertical? sliderSize: ''}" class="slider__cont">
    <div :class="[`${theme}`,'slider']"
       :style="{'width': sliderSize, 'transform': vertical? `rotateZ(-90deg) translateX(${translateX})`:''}">
      <input type="range" style="width:100%;"
        :name="uuid" :ref="uuid" id="" :value="value" :min="min" :max="max"
        @input="onInput($event)" @change="onChange($event)">
    </div>
  </div>
</template>
<style>
  .slider__cont {
    display: inline-flex;
    justify-content: center;
  }
  .slider {
    padding: 15px;
  }
  .dark {
    background: #333;
  }

  input[type=range] {
    margin-top: 8px;  
    outline: none;   
    -webkit-appearance: none;/*清除系统默认样式*/
    background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;    
    background-size: 0% 100%;
    border-radius: 2px;
    height: 3px;/*横条的高度*/    
  }   
  input[type=range]:focus {
    -webkit-appearance: none;
  }

  /*拖动块的样式*/    
  input[type=range]::-webkit-slider-thumb {
    content: 'val:x';
    -webkit-appearance: none;/*清除系统默认样式*/
    -moz-appearance: none;
    height: 16px;/*拖动块高度*/    
    width: 16px;/*拖动块宽度*/    
    background: #fff;/*拖动块背景*/    
    border-radius: 50%; /*外观设置为圆形*/    
    border: solid 1px #ddd; /*设置边框*/
    transition: transform .1s; 
  }
  input[type=range]::-webkit-slider-thumb::after {
    content: '';
  }
  input[type=range]::-webkit-slider-thumb:active {
    -webkit-appearance: none;
    -moz-appearance: none;
    transform: scale(1.1);
    /* background: #eee; */
  }

</style>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    theme: {
      type: String,
      default: 'light',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 300,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
  },

  data () {
    return {
      sliderVal: this.value,
    };
  },

  computed: {
    uuid () {
      return `slider + ${Math.round(Math.random()*1000000)}`;
    },
    isVertical() {
      if (this.vertical) {
        console.warn(`vertical slider...`);
        return true;
      }
      else console.warn('horizontall slider..');
      return false;
    },
    sliderSize() {
      return `${this.size}px`;
    },
    translateX() {
      return `${- this.size / 2}px`;
    },
  },

  methods: {
    onInput(evt) {
      const newVal = this.changeStyle();
      this.$emit('input', newVal);
    },
    onChange(evt) {
     const newVal = this.changeStyle();
      this.$emit('change');
    },
    changeStyle() {
      const inputRange = this.$refs[this.uuid];
      const newVal = Number(inputRange.value);
      const ratio = (newVal - this.min) * 100 / (this.max - this.min);
      inputRange.style.backgroundSize = `${ratio}% 100%`;
      return newVal;
    }
  },
}
</script>
