import prisma from "../lib/prismadb";

export default async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderby: {
        createdAt: "desc",
      },
    });
    const safeBlogs = blogs.map((blog: any) => {
      return {
        ...blog,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
      };
    });
    return safeBlogs;
  } catch (error: any) {
    throw new Error(error);
  }
}
