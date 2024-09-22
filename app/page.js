import { PrismaClient } from "@prisma/client"; // Correct import
import Link from "next/link";
import Post from "./components/Post";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function getPost() {
  // Correctly use prisma.post to query the posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return posts;
}

export default async function Home() {
  const posts = await getPost();
  console.log({ posts });

  return (
    <main style={styles.main}>
      <h1>Hi, Sabrine Omar</h1>

      {/* Centered Add Post Link */}
      <div style={styles.addPostContainer}>
        <Link href={'/add-post'} style={styles.addPostLink}>
          Add Post
        </Link>
      </div>

      {/* Posts */}
      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author?.name} // Accessing author name correctly
          />
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers content horizontally
    justifyContent: "flex-start", // Aligns content at the top
    minHeight: "100vh",
    padding: "20px",
  },
  addPostContainer: {
    margin: "20px 0", // Adds space around the link
    textAlign: "center",
  },
  addPostLink: {
  
    color: "#007bff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  addPostLinkHover: {
    backgroundColor: "#0056b3", // Change background color on hover
  },
  postsContainer: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Adds space between each post
  },
};
