/* Contact channels and shared business facts, taken from the live numberfirst.pro site. */
export const site = {
  name: "Numbers First",
  url: "https://numberfirst.pro",
  phone: "+966598565877",
  phoneDisplay: "+966 59 856 5877",
  whatsapp: "966598565877",
  email: "info@numberfirst.pro",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const clients = [
  { src: "/assets/client-01.png", name: "Point", w: 300, h: 300 },
  { src: "/assets/client-02.png", name: "AIKA Physical Therapy Clinic", w: 316, h: 298 },
  { src: "/assets/client-03.png", name: "APEX Management", w: 202, h: 87 },
  { src: "/assets/client-04.png", name: "Boundless", w: 640, h: 205 },
  { src: "/assets/client-05.png", name: "BOX iQ", w: 295, h: 300 },
  { src: "/assets/client-06.png", name: "B-Padel", w: 331, h: 300 },
  { src: "/assets/client-07.png", name: "Broots Coffee & Cocoa", w: 250, h: 267 },
  { src: "/assets/client-08.png", name: "Elite Medical Service", w: 284, h: 112 },
  { src: "/assets/client-09.png", name: "Haya Design Studio", w: 326, h: 300 },
  { src: "/assets/client-10.png", name: "Kalibr", w: 300, h: 300 },
  { src: "/assets/client-11.png", name: "Nokhal Studios", w: 502, h: 300 },
  { src: "/assets/client-12.png", name: "Origin", w: 600, h: 187 },
] as const;

export const samples = [
  { src: "/assets/sample-2.jpg", w: 1500, h: 812 },
  { src: "/assets/sample-3.jpg", w: 1500, h: 844 },
  { src: "/assets/sample-7.jpg", w: 1500, h: 844 },
] as const;
