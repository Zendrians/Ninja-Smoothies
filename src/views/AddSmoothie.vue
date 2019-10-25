<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add new Smoothie Recipe</h2>
        <form @submit.prevent='AddSmoothie'>
            <div class="field title">
                <label for='title'>Smoothie Title:</label>
                <input type="text" name='title' v-model="title">
            </div>
            <div class="field" v-for='(ing, i) in ingredients' :key='i'>
                <label for="ingredient">Ingredient:</label>
                <input type="text" name='ingredient' v-model="ingredients[i]">
                <i @click='deleteIng(ing)' class="material-icons delete">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for='add-ingredient'>Add Ingredient:</label>
                <input type="text" name='add-ingredient' @keydown.tab.prevent='addIng' v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null,
        }
    },
    methods: {
        AddSmoothie () {
           if (this.title) {
               this.feedback = null;
               // create slug
               this.slug = slugify(this.title, {
                   replacement: '-',
                   remove: /[$*_+~.()'"!-:@]/g,
                   lower: true,
               });
               db.collection('Smoothies').add({
                   title: this.title,
                   ingredients: this.ingredients,
                   slug: this.slug,
               }).then(() => {
                   this.$router.push({ name: 'home' }).catch(err => {
                       alert(err)
                   })
               })
           } else {
               this.feedback = 'you must enter a title'
           }
        },
        addIng () {
            if (this.another) {
               this.ingredients.push(this.another);
               this.another = null;
               this.feedback = null;
            } else {
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng (ing) {
            this.ingredients = this.ingredients.filter(el => {
                return ing !== el
            })
        }
    }
}
</script>

<style scoped>
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
h2 {
    font-size: 2rem;
    margin: 20px auto;
}

.field {
    margin: 20px auto;
    position: relative;
}

.delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
    color: #aaa;
    cursor: pointer;
}
</style>