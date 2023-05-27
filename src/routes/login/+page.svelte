<script lang="ts">
    import Google from '~icons/ant-design/google-square-filled';
    import { enhance } from '$app/forms'
</script>
<section class=" max-w-2xl mx-auto h-screen flex items-center w-full" >
    <div>
        <a href="/api/oauth?provider=google" class="btn">
            <Google/> Signin with google
        </a>
        <form method="POST" use:enhance>
            <input type="text" name="name">
            <button type="submit">Submit</button>
        </form>
    </div>
</section>