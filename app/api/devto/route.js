export const runtime = "nodejs";

export async function GET() {
  const url = "https://dev.to/api/articles?per_page=10"; // top 10 posts

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Dev.to posts");
    
    const data = await res.json();

    const posts = data.map((post) => ({
      title: post.title,
      url: post.url,
      description: post.description,
      cover_image: post.cover_image,
      published_at: post.published_at,
      user: post.user.name,
    }));

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
