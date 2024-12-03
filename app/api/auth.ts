import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "http://localhost:3000/api/oauth2callback" // Adjust as per your setup
    );

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    // Dynamically import `open`
    const { default: open } = await import("open");
    open(url);

    res.status(200).json({ message: "Authorization URL opened in browser." });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
