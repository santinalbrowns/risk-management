<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  const pages = [
    {
      path: "/",
      name: "Dashboard",
    },
  ];
</script>

<aside class="fixed bg-gray-900 h-screen text-white pl-16 pr-5 py-10 w-[280px]">
  <nav class="flex flex-col justify-between h-full">
    <main>
      <ul class="space-y-1">
        {#each pages as webpage}
          <li>
            <a
              href={webpage.path}
              class="hover:text-blue-500 block px-4 py-1.5 bg-opacity-15 hover:bg-opacity-10 rounded-md"
              class:text-blue-500={$page.url.pathname == webpage.path}
              class:bg-gray-500={$page.url.pathname == webpage.path}
              >{webpage.name}</a
            >
          </li>
        {/each}
      </ul>
    </main>

    <main>
      <ul>
        <form action="/logout" method="post" use:enhance>
          <button type="submit" class="hover:text-blue-500">Logout</button>
        </form>
      </ul>
    </main>
  </nav>
</aside>

<main class="pl-[280px] h-screen flex flex-col">
  <div class="w-full bg-gray-100 h-full flex-1 overflow-auto">
    <slot />
  </div>
</main>
