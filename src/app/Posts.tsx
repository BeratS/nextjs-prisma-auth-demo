'use client'

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IPost } from "./types/interfaces"

export default function Posts() {
  const { data, isLoading } = useQuery<IPost[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((res) => res.json())
  })

  const queryClient = useQueryClient()

  const deleteHandler = async (deletePost: IPost) => {
    const data = await fetch('/api/posts', {
      method: 'DELETE',
      body: JSON.stringify(deletePost),
    });
    const post = await data.json();
    console.log(post);
  }

  const mutation = useMutation({
    mutationFn: deleteHandler,
    onMutate: async (deletePost) => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });
      // Just get a snapshot
      const previousPosts = queryClient.getQueriesData<IPost[]>(['posts']);
      // Optimistically update the data
      queryClient.setQueriesData(['posts'], (previousPosts as [])?.filter((post: IPost | undefined) => post?.id !== deletePost.id));
      return { previousPosts };
    },
    onError: (err, post, context) => {
      queryClient.setQueriesData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess(data, variables, context) {
      console.log(data, context);
    },
  })

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {(data as IPost[]).map((post, index) => (
        <div key={index} role={'button'} onClick={() => mutation.mutate(post)}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  )
}
