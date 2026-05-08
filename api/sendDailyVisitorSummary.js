import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const visitsQuery = query(
      collection(db, 'visits'),
      where('timestamp', '>=', Timestamp.fromDate(yesterday))
    );
    const visitsSnapshot = await getDocs(visitsQuery);
    const visits = visitsSnapshot.docs.map(doc => doc.data());

    const formsQuery = query(
      collection(db, 'formSubmissions'),
      where('timestamp', '>=', Timestamp.fromDate(yesterday))
    );
    const formsSnapshot = await getDocs(formsQuery);
    const forms = formsSnapshot.docs.map(doc => doc.data());

    const uniqueIps = new Set(visits.map(v => v.ip)).size;
    const mobileVisits = visits.filter(v => v.isMobile).length;

    const emailContent = `
      <h2>Portfolio Daily Summary</h2>
      <h3>${yesterday.toLocaleDateString()} - ${now.toLocaleDateString()}</h3>
      <h3>Statistics</h3>
      <ul>
        <li><b>Total Visits:</b> ${visits.length}</li>
        <li><b>Unique Visitors:</b> ${uniqueIps}</li>
        <li><b>Mobile Visits:</b> ${mobileVisits}</li>
        <li><b>Form Submissions:</b> ${forms.length}</li>
      </ul>
      ${forms.length > 0 ? `<h3>New Submissions</h3><ul>${forms.map(f => `<li><b>${f.name}</b> (${f.email}): ${f.message.substring(0, 50)}...</li>`).join('')}</ul>` : ''}
    `;

    await sgMail.send({
      to: 'abhinavjsearch@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Portfolio Daily Summary - ${new Date().toLocaleDateString()}`,
      html: emailContent,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
}
