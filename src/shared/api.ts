export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  async getTodos(opts?: { signal?: AbortSignal }): Promise<Todo[]> {
    const res = await fetch(`${BASE_URL}/todos?_limit=10`, { signal: opts?.signal });
    return res.json();
  },

  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return res.json();
  },

  async getPosts(opts?: { signal?: AbortSignal }): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts?_limit=10`, { signal: opts?.signal });
    return res.json();
  },

  async getPostComments(postId: number, opts?: { signal?: AbortSignal }): Promise<Comment[]> {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, { signal: opts?.signal });
    return res.json();
  },
};
