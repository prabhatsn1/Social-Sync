import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:3000/api/oauth2callback" // Adjust as needed
  );

  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Save the tokens securely (e.g., in a database or session)
    res.status(200).json({ message: "OAuth 2.0 authentication successful!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate.", details: error });
  }
}
