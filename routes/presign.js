const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const s3Client = new S3Client({
  region: process.env.DIGITALOCEAN_SPACES_REGION,
  endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
  },
});

router.post("/get-presigned-urls", async (req, res) => {
  const { files } = req.body;
  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "Files must be a non-empty array." });
  }

  try {
    const urls = await Promise.all(
      files.map(async ({ filename, contentType }) => {
        const key = `uploads/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
          Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET,
          Key: key,
          ContentType: contentType,
          ACL: "public-read",
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes

        return {
          filename,
          key,
          url,
        };
      })
    );

    res.json({ urls });
  } catch (err) {
    console.error("Error generating signed URLs:", err);
    res.status(500).json({ error: "Could not generate signed URLs" });
  }
});

module.exports = router;
