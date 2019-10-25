<template>
    <div v-if='smoothie' class="edit-smoothie container">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.prevent='EditSmoothie'>
            <div class="field title">
                <label for='title'>Smoothie Title:</label>
                <input type="text" name='title' v-model="smoothie.title">
            </div>
            <div class="field" v-for='(ing, i) in smoothie.ingredients' :key='i'>
                <label for="ingredient">Ingredient:</label>
                <input type="text" name='ingredient' v-model="smoothie.ingredients[i]">
                <i @click='deleteIng(ing)' class="material-icons delete">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for='add-ingredient'>Add Ingredient:</label>
                <input type="text" name='add-ingredient' @keydown.tab.prevent='addIng' v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data () {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        EditSmoothie () {
           if (this.smoothie.title) {
               this.feedback = null;
               // create slug
               this.smoothie.slug = slugify(this.smoothie.title, {
                   replacement: '-',
                   remove: /[$*_+~.()'"!-:@]/g,
                   lower: true,
               });
               db.collection('Smoothies').doc(this.smoothie.id).update({
                   title: this.smoothie.title,
                   ingredients: this.smoothie.ingredients,
                   slug: this.smoothie.slug,
               }).then(() => {
                   this.$router.push({ name: 'home' }).catch(err => {
                       console.log(err)
                   })
               })
           } else {
               this.feedback = 'you must enter a title'
           }
            },
        addIng () {
            if (this.another) {
               this.smoothie.ingredients.push(this.another);
               this.another = null;
               this.feedback = null;
            } else {
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng (ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(el => {
                return ing !== el
            })
        }
    },
    created () {
       const ref = db.collection('Smoothies').where('slug', '==', this.$route.params.smoothie_slug);
       ref.get().then(res => {
           res.forEach(doc => {
               this.smoothie = { ...doc.data(), id: doc.id }
           })
       }).catch(err => console.log(err))
    }
}
</script>

<style scoped>
.edit-smoothie {
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