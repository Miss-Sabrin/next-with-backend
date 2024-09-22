import prisma from "@/app/lib/primsa";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const res = await request.json();
    const { title, content } = res;

    // Log the data to ensure it's received correctly
    console.log({ formData: res });

    // If title or content is missing, return an error
    if (!title || !content) {
      return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
    }

    // Create a new post and author
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published:true,
        author: {
          create: {
            name: "Sabrina",
          },
        },
      },
    });

    // Return the result
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
