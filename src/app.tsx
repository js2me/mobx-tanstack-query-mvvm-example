import { observer } from "mobx-react-lite";
import { lazy, Suspense, startTransition } from "react";
import { history } from "./shared/config";

const TodosPage = lazy(() => import('@/pages/todos/ui/page').then(m => ({ default: m.TodosPage })));
const PostsPage = lazy(() => import('@/pages/posts/ui/page').then(m => ({ default: m.PostsPage })));

export const App = observer(() => {
  const pathname = history.location.pathname;

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-2xl items-center gap-1 px-5 py-3">
          <button
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/todos"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => startTransition(() => history.push("/todos"))}
          >
            Todos
          </button>
          <button
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/posts"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => startTransition(() => history.push("/posts"))}
          >
            Posts
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-8">
        {pathname === "/todos" && (
          <Suspense fallback={<div>loading...</div>}>
            <TodosPage />
          </Suspense>
        )}
        {pathname === "/posts" && (
          <Suspense fallback={<div>loading...</div>}>
            <PostsPage />
          </Suspense>
        )}
        {pathname !== "/todos" && pathname !== "/posts" && (
          <div className="flex flex-col items-center gap-4 pt-20">
            <h1 className="text-2xl font-semibold text-gray-900">Not found</h1>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={() => startTransition(() => history.push("/todos"))}
            >
              Go to Todos
            </button>
          </div>
        )}
      </main>
    </div>
  );
});
