import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@softmadchildren.com" },
    update: {},
    create: {
      email: "admin@softmadchildren.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Created admin user:", adminUser.email);

  // Create sample content
  await prisma.content.create({
    data: {
      type: "PAGE",
      title: "About Us",
      slug: "about",
      content: `# About Soft Mad Children

We are a theatrical rock band creating immersive experiences through music and performance.

## Our Story

Founded in 2020, we've been pushing the boundaries of live performance, combining raw musical energy with theatrical elements that transport our audiences to another dimension.

## The Band

- **Lead Vocals & Guitar** - Pascal Storm
- **Bass & Backing Vocals** - Job Rivers
- **Drums & Percussion** - Finn Thunder
- **Keys & Synth** - Gerald Blaze
- **Rhythm Guitar** - Willem Blaze`,
      excerpt: "Learn about our journey and the people behind the music",
      published: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  });

  console.log("✅ Created about page");

  // Create sample news post
  await prisma.content.create({
    data: {
      type: "NEWS",
      title: 'New Album "Theatrical Dreams" Coming Soon!',
      slug: "new-album-theatrical-dreams",
      content: `We're thrilled to announce our upcoming album "Theatrical Dreams" - a sonic journey through light and shadow.

## Track List Preview

1. Opening Act
2. Mysterious Shadows
3. Theatrical Dreams
4. Smoke and Mirrors
5. Final Curtain

Stay tuned for more updates!`,
      excerpt: "Get ready for our most ambitious project yet",
      published: true,
      featured: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  });

  console.log("✅ Created sample news post");

  // Create sample venue
  const venue = await prisma.venue.create({
    data: {
      name: "The Grand Theater",
      address: "123 Music Street",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      zipCode: "90001",
      capacity: 2500,
      website: "https://grandtheater.example.com",
      description: "Historic venue with incredible acoustics",
    },
  });

  console.log("✅ Created sample venue");

  // Create sample events
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 2);

  await prisma.event.create({
    data: {
      title: "Theatrical Dreams Album Release Show",
      description: "Join us for the official album release celebration!",
      date: futureDate,
      doors: new Date(futureDate.getTime() - 60 * 60 * 1000), // 1 hour before
      startTime: futureDate,
      venueId: venue.id,
      ticketUrl: "https://tickets.example.com",
      price: "$35",
      ageLimit: "All Ages",
      status: "CONFIRMED",
      published: true,
      featured: true,
      setlist: [
        "Opening Act",
        "Mysterious Shadows",
        "Old Favorites Medley",
        "Theatrical Dreams",
        "Encore: Final Curtain",
      ],
    },
  });

  console.log("✅ Created sample event");

  // Create site settings
  const settings = [
    {
      key: "site_name",
      value: "Soft Mad Children Official",
      type: "TEXT" as const,
      category: "general",
    },
    {
      key: "social_instagram",
      value: "https://instagram.com/softmadchildren",
      type: "TEXT" as const,
      category: "social",
    },
    {
      key: "social_spotify",
      value: "https://spotify.com/artist/softmadchildren",
      type: "TEXT" as const,
      category: "social",
    },
    {
      key: "social_youtube",
      value: "https://youtube.com/@softmadchildren",
      type: "TEXT" as const,
      category: "social",
    },
    {
      key: "contact_email",
      value: "contact@softmadchildren.com",
      type: "TEXT" as const,
      category: "contact",
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("✅ Created site settings");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
