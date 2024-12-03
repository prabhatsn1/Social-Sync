import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import { IncomingForm } from "formidable";

const upload = multer({ dest: "./uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "http://localhost:3000/api/oauth2callback"
      );

      const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
      });

      const responses = [];
      const uploadedFiles = Array.isArray(files.videos)
        ? files.videos
        : [files.videos];

      for (const file of uploadedFiles) {
        if (!file) continue;

        const videoPath = file.filepath;

        const response = await youtube.videos.insert({
          part: ["snippet", "status"],
          requestBody: {
            snippet: {
              title: file.originalFilename || "Untitled",
              description: "Uploaded via API",
            },
            status: { privacyStatus: "private" },
          },
          media: { body: fs.createReadStream(videoPath) },
        });

        responses.push(response.data);
        fs.unlinkSync(videoPath); // Clean up file
      }

      res
        .status(200)
        .json({ message: "Videos uploaded successfully!", responses });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to upload videos", details: error });
    }
  });
}
