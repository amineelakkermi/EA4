export default function getBaseUrl() {
  // Récupère l'URL depuis l'environnement
  let url = process.env.NEXT_PUBLIC_BASE_URL;

  // Si non définie ou vide, fallback selon l'environnement
  if (!url) {
    if (process.env.VERCEL_URL) {
      url = `https://${process.env.VERCEL_URL}`;
    } else {
      url = 'http://localhost:3000';
    }
  }

  // Ajoute https:// si manquant
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  return url;
}
