<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;

  export let form: ActionData;
</script>

<div class="min-h-screen grid md:place-items-center">
  <div class="max-w-md w-full p-8 space-y-8">
    <div class="">
      <h1 class="font-bold text-3xl">Login</h1>
      <p class="text-sm text-gray-400">Let's get started</p>

      <form action="" method="post" use:enhance class="mt-8 space-y-6">
        <div class="space-y-3">
          {#if form?.invalid}
            <div class="bg-rose-100 text-rose-500 px-3 py-1 rounded text-sm">
              <div class="">All fields are required</div>
            </div>
          {/if}
          {#if form?.credentials}
            <div class="bg-rose-100 text-rose-500 px-3 py-1 rounded text-sm">
              <div class="">Email or Password is incorrect</div>
            </div>
          {/if}
          <div class="space-y-1">
            <label for="email">Email</label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined"> mail </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="space-y-1">
            <label for="password">Password</label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined"> lock </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>
        <p class="text-sm text-gray-500">
          By clicking continue, you simply agree to our <a
            href="/"
            class="text-blue-500">Terms of Service</a
          >
          and <a href="/" class="text-blue-500">Privacy Policy</a>.
        </p>
        <div class="">
          <button> Continue </button>
        </div>
      </form>
    </div>
  </div>
</div>

<style lang="postcss">
  label {
    @apply text-sm;
  }

  input {
    @apply bg-[#f9f9f9] pl-8 h-9 pr-3.5 rounded-md w-full;
  }
  input::placeholder {
    @apply text-[#aeb0b2] text-sm;
  }
  button {
    @apply bg-blue-500 text-white w-full rounded-md h-9 text-sm;
  }
  .material-symbols-outlined {
    @apply text-base absolute left-2.5 text-[#b4b6b8];

    font-variation-settings:
      "FILL" 1,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
</style>
