<template>
  <div class="calc__container">
    <h4>{{title}}</h4>
    <base-input type="text" v-model.number="totalLoan" @change="calc">total Loan Money:</base-input>
    <base-input type="text" v-model.number="totalMonth" :unit="'months'" @change="calc">total Month:</base-input>
    <base-input type="text" v-model.number="yearRate" :unit="'%'" @change="calc">Loan Year Rate:</base-input> 
    <base-input type="text" v-model.number="expected_YearEarn" :unit="'%'" @change="calc">Expected Earn Rate:</base-input>
    <base-button @click="calc">Calculate!</base-button>
    <p class="text--bold">
      If you can borrow Cash from bank, then invest the money.. <br><br>
      After {{totalMonth}} months ... <br>
      Monthly pay: {{monthlyPay.toFixed(0)}},
      Total Loan fee: <span style="color: red">{{Math.round(totalPay).toLocaleString()}}</span> , <br>
      Invest earned: <span style="color: green">{{Math.round(totalEarning).toLocaleString()}}</span> , 
      Absolute Earned: <span class="text--bolder">{{Math.round(totalEarning - totalPay).toLocaleString()}}</span></p>
  </div>
</template>

<style>
  input[type='text'] {
    font-size: 16px;
  }

  .text--bold {
    font-size: 22px;
    color: #999;
  }

  .text--bolder {
    color: green; 
    font-size: 24px;
    font-weight: bolder;
  }
</style>

<script >
import { default as BaseInput } from './BaseInput.vue';
import { default as BaseButton } from './BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      totalLoan: 80000,
      totalMonth: 36,
      yearRate: 0.033,
      expected_YearEarn: 0.10,
      totalEarning: 0,
      cashLeft: this.$props.totalLoan,
    };
  },

  mounted () {
    this.calc();
  },

  computed: {
    monthlyPay () {
      return this.totalLoan/this.totalMonth + this.totalLoan * (this.yearRate / 12);
    },
    totalPay () {
      return this.totalLoan * (this.yearRate * this.totalMonth / 12);
    },
  },

  methods: {
    calc() {
      this.cashLeft = this.totalLoan;
      this.totalEarning = 0;
      for(let i = 0; i < this.totalMonth; i++){
        // should not change @Props !
        this.cashLeft -= this.monthlyPay;
        const monthEarning = (this.cashLeft + this.totalEarning) * this.expected_YearEarn / 12;
        this.totalEarning += monthEarning;
        // console.warn(`after month ${i+1}, left ${this.cashLeft.toFixed(0)}, 
        //   monthEarning: ${monthEarning.toFixed(0)}, totalEarning: ${this.totalEarning.toFixed(0)}`);
      }
      console.warn(`calculate loan and invest done`);
      return this.totalEarning;
    },
  }
}

</script>
