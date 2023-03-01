import Link from 'next/link'
import prisma from "prisma/client";
import Posts from './Posts';
import { IPost } from './types/interfaces';
import getQueryClient from './utils/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import Hydrate from './utils/HydrateClient';

const getPosts = async () => {
  const posts: IPost[] = await prisma?.post?.findMany();
  return posts;
}

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], getPosts);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className='py-12'>
      <h1 className="text-3xl font-bold underline">
        Welcome home
      </h1>
      <Link href="/dashboard">Navigate to Dashboard</Link>
      <Hydrate state={dehydratedState}>
        <Posts />
      </Hydrate>
    </main>
  )
}
