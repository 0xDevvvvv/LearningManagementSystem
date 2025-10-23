export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, position, resumeLink, message } = body;

    if (!name || !email || !position) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Here you can store the application in your DB
    // Example: insert into PostgreSQL / MongoDB
    // await db.collection("applications").insertOne({ name, email, position, resumeLink, message, date: new Date() });

    return new Response(
      JSON.stringify({ success: true, message: "Application submitted!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
