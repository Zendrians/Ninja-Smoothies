<template>
    <div v-if='smoothie' class="edit-smoothie container">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
    name: 'EditSmoothie',
    data () {
        return {
            smoothie: null,
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

</style>