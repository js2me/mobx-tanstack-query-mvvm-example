import { makeObservable, observable, action, computed } from "mobx";
import { InferViewModelParams, ViewModelBase } from "mobx-view-model";
import { createQuery } from "mobx-tanstack-query/preset";
import { api } from "@/shared/api";
import { Ticker } from "@/shared/lib/mobx/ticker";

export class PostsVM extends ViewModelBase {
  selectedPostId: number | null = null;

  postsQuery;

  commentsQuery;

  ticker = new Ticker({ name: 'posts', abortSignal: this.unmountSignal });

  get posts() {
    return this.postsQuery.data ?? [];
  }

  get isLoading() {
    return this.postsQuery.isLoading;
  }

  get error() {
    return this.postsQuery.error;
  }

  get selectedPost() {
    return this.posts.find((p) => p.id === this.selectedPostId) ?? null;
  }

  get comments() {
    return this.commentsQuery.data ?? [];
  }

  get isCommentsLoading() {
    return this.commentsQuery.isLoading;
  }

  selectPost(id: number) {
    this.selectedPostId = id;
  }

  clearSelection() {
    this.selectedPostId = null;
  }

  constructor(params: InferViewModelParams<PostsVM>) {
    super(params);

    makeObservable<PostsVM, "selectedPostId">(this, {
      postsQuery: observable,
      commentsQuery: observable,
      selectedPostId: observable,
      posts: computed,
      isLoading: computed,
      error: computed,
      selectedPost: computed,
      comments: computed,
      isCommentsLoading: computed,
      selectPost: action,
      clearSelection: action,
    });

    this.postsQuery = createQuery({
      abortSignal: this.unmountSignal,
      queryKey: ["posts"],
      queryFn: ({ signal }) => api.getPosts({ signal }),
    });

    this.commentsQuery = createQuery({
      abortSignal: this.unmountSignal,
      queryKey: ["posts", this.selectedPostId, "comments"],
      queryFn: ({ signal }) => api.getPostComments(this.selectedPostId!, { signal }),
      options: () => ({
        enabled: this.selectedPostId !== null,
      }),
    });
  }
}
