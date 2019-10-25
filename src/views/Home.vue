<template>
  <div class="container">
    <div v-if="hasLoaded" class="home ">
      <div class="card" v-for='smoothie in smoothies' :key='smoothie.id'>
        <div class="card-content">
          <i @click='deleteSmoothie(smoothie.id)' class="material-icons delete">delete</i>
          <h2 class="indigo-text">{{smoothie.title}}</h2>
          <ul class="ingredients">
            <li v-for='(ing, i) in smoothie.ingredients' :key='i'>
              <span class="chip">{{ ing }}</span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug }}">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
    <div v-else class="container">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'


export default {
  name: 'Home',
  data () {
    return {
      smoothies: [],
      hasLoaded: false,
    }
  },
  methods: {
    deleteSmoothie(Id) {
        db.collection("Smoothies").doc(Id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(e => {
            return e.id !== Id
          })
        })
      }
      
    },
  created () {
    db.collection('Smoothies').get()
    .then(res => res.forEach(element => {
      let newSmoothie = { ...element.data(), id: element.id };
      this.smoothies.push(newSmoothie);
      this.hasLoaded = true;
    }))
    .catch( err => console.log(err));
  }
}
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}

.ingredients {
  margin: 30px auto;
}

.ingredients li {
  display: inline-block;
}

.delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em
}


/* Loader */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: 15rem 50% 0 50%;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: red;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>