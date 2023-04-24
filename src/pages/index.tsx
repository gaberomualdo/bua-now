import GhostContentAPI from "@tryghost/content-api";
import Container from "@/components/Container";
import ResponsiveContainer from "@/components/Responsive";
import config from "@/lib/config";
import Head from "next/head";
import { NextPageContext } from "next";
import moment from "moment";
import atob from "atob";
import btoa from "btoa";

function FeaturedArticle(props: {
  title: string;
  subtitle: string;
  path: string;
  section: string;
  date: Date;
}) {
  return (
    <div className="relative w-full pt-16 pb-16 border-b px-8">
      {/* <div
          className="bg-gray-100 absolute rounded-lg"
          style={{
            width: "calc(100% + 5rem)",
            height: "calc(100% + 5.5rem)",
            top: "-2.5rem",
            left: "-2.5rem",
            zIndex: "-1",
          }}
        ></div> */}
      <a
        className="font-semibold tracking-tight hover:opacity-80 transition-all"
        href={"/" + props.path}
        style={{
          fontSize: "2.35rem",
        }}
      >
        {props.title}
      </a>
      <p className="text-xl opacity-70 font-medium mt-2 mb-3">
        {moment(props.date).fromNow()} in {props.section}
      </p>
      <p className="text-lg opacity-70">{props.subtitle}</p>
      <div className="mt-8">
        <a
          href={"/" + props.path}
          className="px-5 py-3 rounded-md text-base text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition-all"
        >
          <span className="font-medium">Read Story &rarr;</span>
        </a>
      </div>
    </div>
  );
}
function Article(props: {
  title: string;
  subtitle: string;
  path: string;
  section: string;
  date: Date;
}) {
  return (
    <div className="border-b pt-9 pb-11 px-8">
      <div className="relative w-full">
        <a
          className="font-semibold tracking-tight text-3xl hover:opacity-80 transition-all"
          href={"/" + props.path}
        >
          {props.title}
        </a>
        <p className="absolute top-0 right-0 opacity-80 font-medium mt-2 mb-3">
          {moment(props.date).fromNow()} in {props.section}
        </p>
        <p className="text-lg mt-2 opacity-70">{props.subtitle}</p>
        <div className="mt-8">
          <a
            href={"/" + props.path}
            className="px-5 py-3 rounded-md text-base text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-300 transition-all"
          >
            <span className="font-medium">Read Story &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home({ posts, tab }: any) {
  const mainPosts = tab === "home" ? posts.slice(1) : posts;
  return (
    <Container>
      <Head>
        <title>{`${config.title} – ${config.subtitle}`}</title>
        <meta name="description" content={config.description} />
      </Head>
      <ResponsiveContainer>
        <div className="border-l border-r h-full grow pb-10">
          {tab === "home" && (
            <>
              {posts[0] && (
                <FeaturedArticle
                  title={posts[0].title}
                  subtitle={posts[0].excerpt}
                  path={posts[0].path}
                  section={
                    posts[0].primary_tag.name === "opinions"
                      ? "opinions"
                      : "facts"
                  }
                  date={posts[0].updated_at}
                />
              )}
            </>
          )}
          {mainPosts.map((post: any, i: number) => (
            <Article
              key={i}
              title={post.title}
              subtitle={post.excerpt}
              path={post.path}
              section={
                post.primary_tag.name === "opinions" ? "opinions" : "facts"
              }
              date={post.updated_at}
            />
          ))}
        </div>
      </ResponsiveContainer>
    </Container>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  const api = new GhostContentAPI({
    url: "https://bua-now.ghost.io",
    key: "417badf22041f4f6d16a27aaee",
    version: "v5.0",
  });

  // fetch 5 posts, including related tags and authors
  const tab = (query?.tab as string) || "home";
  let posts = Array.from(
    await api.posts.browse({
      limit: 1000000,
      // @ts-ignore
      include: "tags,authors,-html",
    })
  );
  posts = posts.map((e, i) => ({
    ...e,
    excerpt: (e.excerpt || "No description").slice(0, 200) + "...",
    path: btoa((posts.length - i).toString())
      .split("=")
      .join(""),
  }));
  if (["facts", "opinions"].includes(tab)) {
    posts = posts.filter((e) => e?.primary_tag?.name === tab);
  }
  return { props: { posts, tab } };
}
