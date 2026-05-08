import { google } from 'googleapis';

const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const GOOGLE_SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_SERVICE_ACCOUNT,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed=false`,
      pageSize: 100,
      fields: 'files(id, name, webViewLink, mimeType, createdTime)',
      orderBy: 'createdTime desc',
    });

    const certificates = response.data.files
      .filter(file => !file.mimeType.includes('folder'))
      .map(file => ({
        id: file.id,
        name: file.name.replace(/\.(pdf|jpg|png|jpeg)$/i, ''),
        webViewLink: file.webViewLink,
        mimeType: file.mimeType,
        createdTime: file.createdTime,
      }))
      .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

    res.status(200).json({ certificates });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
}
