<!-- scripts -->
<script>
    import { useTracker } from 'meteor/rdb:svelte-meteor-data'
    import { Resolutions } from '../api/resolutions'

    $: resolutions = useTracker( () => Resolutions.find({}).fetch())
</script>

<!-- style -->

<!-- html -->

<div class="container">
    <h3>Resolutions</h3>
    {#each $resolutions as resolution}
        <p>{resolution.title}</p>
    {/each}
</div>
