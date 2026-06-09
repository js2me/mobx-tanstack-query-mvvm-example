import { withViewModel } from "mobx-view-model-react";
import { TodosVM } from "../model/vm";

export const TodosPage = withViewModel(TodosVM, ({ model }) => {
  if (model.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (model.error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-700">
        {model.error.message}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Todos</h1>
      {!model.isTodosEnabled ? (
        <div className="flex justify-center py-8">
          <button
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => model.loadTodos()}
          >
            Load todos
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {model.todos.map((todo) => (
            <label
              key={todo.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                model.toggleMutation.isPending ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => model.toggle(todo.id)}
                disabled={model.toggleMutation.isPending}
                className="h-4 w-4 shrink-0 accent-blue-600"
              />
              <span
                className={`text-sm ${
                  todo.completed ? "text-gray-400 line-through" : "text-gray-900"
                }`}
              >
                {todo.title}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
});
