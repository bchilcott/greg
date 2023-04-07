import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-8">
      <h1 className="mt-28 text-6xl font-bold">Welcome to Next.js!</h1>
      <p>Hello world: {posts[0].author}</p>
    </main>
  );
}

type Post = {
  author: string;
  content: string;
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts: Post[] = [{ author: "chen", content: "hello" }];

  return {
    props: {
      posts,
    },
  };
};
