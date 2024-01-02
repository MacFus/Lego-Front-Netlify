<script>
    import Nav from '$lib/nav.svelte'
</script>
<header class="header">
    <Nav/>
</header>
<body>
    <slot/>
</body>
<footer>

</footer>
<style>
    body{
        background-color: #ffffff;
        height: 100%;
    }
</style>
