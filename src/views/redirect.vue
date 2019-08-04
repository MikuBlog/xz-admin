<script>
import store from '@/store/store'
export default {
    beforeRouteEnter (to, from, next) {
        !from.name || from.name == 'login'
        && next(store.state.tagsList[0].path)
        next()
    }
}
</script>
