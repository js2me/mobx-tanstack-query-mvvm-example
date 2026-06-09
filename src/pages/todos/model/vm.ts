import { makeObservable, observable, action, computed } from "mobx";
import { InferViewModelParams, ViewModelBase } from "mobx-view-model";
import { createQuery, createMutation } from "mobx-tanstack-query/preset";
import { api } from "@/shared/api";
import { Ticker } from "@/shared/lib/mobx/ticker";

export class TodosVM extends ViewModelBase {
  isTodosEnabled: boolean;

  todosQuery;

  toggleMutation;

  ticker = new Ticker({ name:'todos', abortSignal: this.unmountSignal });

  get todos() {
    return this.todosQuery.data ?? [];
  }

  get isLoading() {
    return this.todosQuery.isLoading;
  }

  get error() {
    return this.todosQuery.error;
  }

  toggle(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;
    this.toggleMutation.mutate({ id, completed: !todo.completed });
  }

  loadTodos() {
    this.isTodosEnabled = true;
  }

  constructor(params: InferViewModelParams<TodosVM>) {
    super(params);

    this.todosQuery = createQuery({
      abortSignal: this.unmountSignal,
      queryKey: ["todos"],
      queryFn: ({ signal }) => api.getTodos({ signal }),
      options: () => ({
        // обращаемся до объявления но это нужно специально
        // чтобы начальное значение isTodosEnabled при маунте страницы
        // была включена
        enabled: !!this.isTodosEnabled,
      })
    });

    this.isTodosEnabled = !!this.todosQuery.data;

    makeObservable(this, {
      todosQuery: observable,
      toggleMutation: observable,
      isTodosEnabled: observable,
      todos: computed,
      isLoading: computed,
      error: computed,
      toggle: action,
      loadTodos: action,
    });

    this.toggleMutation = createMutation(
      ({ id, completed }: { id: number; completed: boolean }) =>
        api.toggleTodo(id, completed),
      {
        abortSignal: this.unmountSignal,
        onMutate: async ({ id, completed }) => {
          await this.todosQuery.cancel();
          const prev = this.todosQuery.data;
          this.todosQuery.setData((old) =>
            old?.map((t) => (t.id === id ? { ...t, completed } : t))
          );
          return { prev };
        },
        onError: (_err, _vars, context) => {
          if (context?.prev) {
            this.todosQuery.setData(context.prev);
          }
        },
        // because real api returns static not changable data
        // onSettled: () => {
        //   this.todosQuery.invalidate();
        // },
      }
    );
  }
}
