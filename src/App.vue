<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const joke = ref("Click the button to get a joke!");
const loading = ref(false);

const getJoke = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Pun?type=single"
    );
    joke.value = response.data.joke;
  } catch (error) {
    console.error("Error fetching the joke:", error);
    joke.value = "Failed to fetch a joke. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="joke">
      <h1 class="joke__title">Joke Generator</h1>
      <p v-if="!loading" class="joke__text">{{ joke }}</p>
      <p v-else class="joke__text">Loading...</p>
      <button @click="getJoke" class="joke__button" :disabled="loading">
        Get Joke
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include flex-column;
  @include center;
  height: 100vh;
  background-color: $background-light;
}

.joke {
  @include shadow($background, 0.5);
  @include center;
  width: 50vh;
  max-width: 400px;
  background-color: $background;
  padding: 3rem;
  border-radius: 1rem;
}

.joke__title {
  @include text-title;
  text-align: center;
  color: $primary;
}

.joke__text {
  @include text-body;
  color: $text;
  text-align: center;
  line-height: 2rem;
  transition: all 150ms;
  margin: 2rem 0;
}

.joke__button {
  @include text-body;
  @include clickable;
  background-color: $primary;
  border: none;
  color: $background;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
</style>
