/** @type {import('next').NextConfig} */

// QR campaign codes. Each printed QR points at https://www.saunaamore.it/<code>;
// the hit is bounced to the homepage tagged with UTM params so it shows up in
// Vercel Analytics (filter by utm_campaign). Add a line here per new QR run.
const qrCampaigns = [
  { code: 'ca1', medium: 'print' },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'share.baltresto.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return qrCampaigns.map(({ code, medium }) => ({
      source: `/${code}`,
      // Temporary on purpose: a permanent (308) redirect gets cached by the
      // scanner's browser forever, so the code could never be repointed.
      permanent: false,
      destination: `/?utm_source=qr&utm_medium=${medium}&utm_campaign=${code}`,
    }));
  },
};

export default nextConfig;
