import { NextPageContext } from "next";
import GhostContentAPI from "@tryghost/content-api";
import atob from "atob";
import Container from "@/components/Container";
import Head from "next/head";
import config from "@/lib/config";
import ResponsiveContainer from "@/components/Responsive";
import moment from "moment";

const sizeClassnames = [
  "prose-h1:text-4xl",
  "prose-h1:tracking-tight",
  "prose-h2:text-3xl",
  "prose-h2:tracking-tight",
  "prose-h3:text-2xl",
  "prose-p:text-lg",
  "prose-p:leading-relaxed",
  "prose-p:my-6",
  "prose-code:text-lg",
  "prose-li:text-lg",
  "prose-table:text-lg",
  "prose-ol:my-1.5",
  "prose-ul:my-1.5",
  "prose-ol:pl-12",
  "prose-ul:pl-12",
  "lg:prose-xl",
  "prose",
  "prose-headings:mt-10",
];

export default function Post({ post, section }: any) {
  return (
    <Container>
      <Head>
        <title>{`${post.title} – ${config.title}`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <ResponsiveContainer>
        <div className="py-16 w-full mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            {post.title}
          </h1>
          <p className="text-xl text-gray-700 font-medium pb-5 mb-10 border-b">
            {moment(post.updated_at).fromNow()} in {section} &nbsp;/&nbsp;{" "}
            {post.meta_description || "BUA Now Staff"}
          </p>
          <div
            className={sizeClassnames.join(" ")}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <style>{`
    .prose :where(li):not(:where([class~="not-prose"] *)) {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
    .prose :where(li):not(:where([class~="not-prose"] *))::marker {
      font-size: inherit;
    }
    .prose :where(pre):not(:where([class~="not-prose"] *)) {
      border-radius: 0;
      padding: 0;
      background: transparent;
      border: none;
      overflow: hidden;
    }
    .prose :where(pre code):not(:where([class~="not-prose"] *)) {
      border-radius: .25rem;
      padding: 0.75rem 1rem;
      background: rgb(40, 44, 52);
      display: block;
    }
    `}</style>
          {post.meta_title && (
            <div className="border-t mt-16 mb-12 pt-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-8">
                Discussion
              </h1>
              <a
                href={post.meta_title}
                target="_blank"
                className="px-5 py-4 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all"
              >
                View Discussion on Instagram
              </a>
            </div>
          )}
        </div>
      </ResponsiveContainer>
    </Container>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  // @ts-ignore
  const path = context.params.article;
  const api = new GhostContentAPI({
    url: "https://bua-now.ghost.io",
    key: "417badf22041f4f6d16a27aaee",
    version: "v5.0",
  });

  let posts = Array.from(
    await api.posts.browse({
      limit: 1000000,
      // @ts-ignore
      include: "tags,authors,-html",
    })
  );
  const limitedPost = posts[posts.length - parseInt(atob(path))];
  const post = await api.posts.read({ id: limitedPost.id });
  return { props: { post, section: limitedPost?.primary_tag?.name } };
}
