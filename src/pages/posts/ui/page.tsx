import { withViewModel } from "mobx-view-model-react";
import { PostsVM } from "../model/vm";

export const PostsPage = withViewModel(PostsVM, ({ model }) => {
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

  if (model.selectedPost) {
    return (
      <div>
        <button
          onClick={() => model.clearSelection()}
          className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="text-lg leading-none">&larr;</span> Back to posts
        </button>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-xl font-semibold text-gray-900">
            {model.selectedPost.title}
          </h1>
          <p className="leading-relaxed text-gray-600">{model.selectedPost.body}</p>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Comments</h2>
          {model.isCommentsLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {model.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-baseline gap-2">
                    <strong className="text-sm text-gray-900">{comment.name}</strong>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Posts</h1>
      <div className="flex flex-col gap-3">
        {model.posts.map((post) => (
          <button
            key={post.id}
            className="rounded-xl bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
            onClick={() => model.selectPost(post.id)}
          >
            <h3 className="mb-1.5 font-semibold text-gray-900">{post.title}</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {post.body.slice(0, 100)}...
            </p>
          </button>
        ))}
      </div>
    </div>
  );
});
