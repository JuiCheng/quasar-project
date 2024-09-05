<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <q-btn color="primary" label="Primary" @click="increment"
          >{{ todo.id }} - {{ todo.content }}</q-btn
        >
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';
import { api } from 'boot/axios';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}

const data = ref(null);

const fetchData = async () => {
  try {
    // 使用全局的 $axios 發送請求
    const response = await api.get('https://api.example.com/some-endpoint');
    api.post;
    data.value = response.data;
  } catch (err) {
    //error.value = 'Error fetching data: ' + err.message;
    console.error(err);
  }
};
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  fetchData();
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
