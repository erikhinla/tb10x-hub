export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString();
    const contentType = req.headers["content-type"] || "application/x-www-form-urlencoded";

    const forwardResponse = await fetch("https://webhook.site/9693d678-5bf8-4432-baa9-f5fbd95e23df", {
      method: "POST",
      headers: {
        "Content-Type": contentType
      },
      body: rawBody
    });

    if (!forwardResponse.ok) {
      res.status(502).json({ success: false, message: "Lead destination unavailable" });
      return;
    }

    res.status(200).json({ success: true, message: "Lead captured" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lead capture failed" });
  }
}
