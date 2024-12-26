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
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: $background-light;
}

.joke {
  @include shadow;
  align-items: center;
  text-align: center;
  width: 50vh;
  max-width: 400px;
  background-color: $background;
  padding: 5rem;
  border-radius: 1rem;
}

.joke__title {
  color: $primary;
  text-align: center;
  font-size: 3rem;
}

.joke__text {
  text-align: center;
  line-height: 2rem;
  font-size: 1.2rem;
  transition: all 150ms;
  margin: 2rem 0rem;
}

.joke__button {
  background-color: $primary;
  border: none;
  color: $background;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  width: 100%;
  transition: all 150ms;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    filter: brightness(0.9);
    scale: 1.02;
  }

  &:active {
    scale: 0.95;
  }

  &:disabled {
    filter: brightness(0.5);
  }
}
</style>
