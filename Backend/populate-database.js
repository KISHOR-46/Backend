const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/productModel');

// Import products from frontend data.js
const products = {
  // Mobile Phones
  s23: {
    id: "s23",
    title: "Samsung S23 Ultra",
    img: "https://tse2.mm.bing.net/th/id/OIP.FIJ6f_sm4dSfyAi3oHUn1wHaHa?pid=Api&P=0&h=180",
    desc: "200MP quad-camera, Snapdragon 8 Gen 2, 5000mAh battery, 120Hz AMOLED display, S-Pen support.",
    price: "₹79,999",
    category: "phone"
  },
  iphone15: {
    id: "iphone15",
    title: "iPhone 15 Pro Max",
    img: "https://tse3.mm.bing.net/th/id/OIP.0vG8_FUIhejk5KJNExa-ZgHaHa?pid=Api&P=0&h=180",
    desc: "A17 Pro chip, 48MP camera system, titanium design, USB-C, 6.7-inch display.",
    price: "₹1,34,900",
    category: "phone"
  },
  pixel8: {
    id: "pixel8",
    title: "Google Pixel 8 Pro",
    img: "https://tse4.mm.bing.net/th/id/OIP.4nm9l5gLjD0F25Na_s0eDAHaEK?pid=Api&P=0&h=180",
    desc: "Google Tensor G3, AI photography, 50MP triple camera, 6.7-inch LTPO OLED.",
    price: "₹1,06,999",
    category: "phone"
  },
  oneplus12: {
    id: "oneplus12",
    title: "OnePlus 12",
    img: "https://tse1.mm.bing.net/th/id/OIP._40HvU02HxyEUaNDbEonBAHaEK?pid=Api&P=0&h=180",
    desc: "Snapdragon 8 Gen 3, 100W fast charging, Hasselblad camera, 120Hz display.",
    price: "₹64,999",
    category: "phone"
  },
  xiaomi14: {
    id: "xiaomi14",
    title: "Xiaomi 14 Ultra",
    img: "https://tse3.mm.bing.net/th/id/OIP.u0SVzYi_iH1bEGPUMO5IzQHaEI?pid=Api&P=0&h=180",
    desc: "Leica quad camera, Snapdragon 8 Gen 3, 90W charging, premium build.",
    price: "₹89,999",
    category: "phone"
  },
  nothing2: {
    id: "nothing2",
    title: "Nothing Phone 2",
    img: "https://tse3.mm.bing.net/th/id/OIP.nunTj8qiOKr49_lV7iNW3QHaE6?pid=Api&P=0&h=180",
    desc: "Glyph interface, Snapdragon 8+ Gen 1, unique transparent design, 120Hz.",
    price: "₹44,999",
    category: "phone"
  },

  // Laptops
  mac: {
    id: "mac",
    title: "MacBook Pro M3",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    desc: "16-inch Liquid Retina XDR display, M3 processor, 16GB unified memory, 1TB SSD.",
    price: "₹2,49,900",
    category: "laptop"
  },
  dell: {
    id: "dell",
    title: "Dell XPS 13",
    img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
    desc: "Intel Core i7, 16GB RAM, 512GB SSD, 13.4-inch InfinityEdge display.",
    price: "₹1,24,999",
    category: "laptop"
  },
  hp: {
    id: "hp",
    title: "HP Spectre x360",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    desc: "2-in-1 convertible, Intel Evo platform, 16GB RAM, OLED touchscreen.",
    price: "₹1,39,999",
    category: "laptop"
  },
  lenovo: {
    id: "lenovo",
    title: "Lenovo ThinkPad X1",
    img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    desc: "Business laptop, Intel vPro, 32GB RAM, carbon fiber build, security features.",
    price: "₹1,89,999",
    category: "laptop"
  },
  asus: {
    id: "asus",
    title: "ASUS ROG Zephyrus",
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    desc: "Gaming laptop, RTX 4080, AMD Ryzen 9, 240Hz display, RGB keyboard.",
    price: "₹2,24,999",
    category: "laptop"
  },
  surface: {
    id: "surface",
    title: "Microsoft Surface Pro",
    img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=300&fit=crop",
    desc: "2-in-1 tablet, Intel Core i7, detachable keyboard, Surface Pen support.",
    price: "₹1,09,999",
    category: "laptop"
  },

  // Headphones
  sony: {
    id: "sony",
    title: "Sony WH-1000XM5",
    img: "https://soyacincau.com/wp-content/uploads/2022/12/221223-sony-wh-1000xm5-review-malaysia.jpg",
    desc: "Best-in-class ANC, 30hr battery, ultra-soft comfort pads, dual-device connectivity.",
    price: "₹29,990",
    category: "headphone"
  },
  bose: {
    id: "bose",
    title: "Bose QuietComfort Ultra",
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    desc: "Spatial audio, world-class noise cancellation, 24hr battery, premium comfort.",
    price: "₹34,500",
    category: "headphone"
  },
  airpods: {
    id: "airpods",
    title: "Apple AirPods Pro 2",
    img: "https://i0.wp.com/www.ear-fidelity.com/wp-content/uploads/2022/10/P1054788s-1-scaled.jpg?resize=1290%2C860&ssl=1",
    desc: "H2 chip, adaptive transparency, personalized spatial audio, MagSafe charging.",
    price: "₹24,900",
    category: "headphone"
  },
  sennheiser: {
    id: "sennheiser",
    title: "Sennheiser Momentum 4",
    img: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop",
    desc: "Audiophile sound, 60hr battery, adaptive noise cancellation, premium materials.",
    price: "₹34,990",
    category: "headphone"
  },
  skullcandy: {
    id: "skullcandy",
    title: "SkullCandy Crusher Evo",
    img: "https://tse3.mm.bing.net/th/id/OIP.GQyE6SJCFx8RnPxmh8dNvgHaHa?pid=Api&P=0&h=180",
    desc: "Sensory bass, 40hr battery, rapid charge, personal sound customization.",
    price: "₹14,999",
    category: "headphone"
  },
  jbl: {
    id: "jbl",
    title: "JBL Live 660NC",
    img: "https://tse2.mm.bing.net/th/id/OIP.4KlZIHvh2KvGGu1Jf6hcxgHaHa?pid=Api&P=0&h=180",
    desc: "Active noise cancelling, JBL signature sound, 50hr battery, voice assistant.",
    price: "₹9,999",
    category: "headphone"
  },

  // Smart Home
  hub: {
    id: "hub",
    title: "Smart Home Hub Pro",
    img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop",
    desc: "Connects all smart devices, voice-assistant compatible, secure encryption.",
    price: "₹9,999",
    category: "smart"
  },
  alexa: {
    id: "alexa",
    title: "Amazon Echo Studio",
    img: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop",
    desc: "Premium smart speaker, 3D audio, Dolby Atmos, smart home control.",
    price: "₹22,999",
    category: "smart"
  },
  nest: {
    id: "nest",
    title: "Google Nest Hub Max",
    img: "https://tse2.mm.bing.net/th/id/OIP.jKMSsifT5iVInj1vG9ggIwHaHa?pid=Api&P=0&h=180",
    desc: "10-inch display, video calling, smart home control, Google Assistant.",
    price: "₹22,900",
    category: "smart"
  },
  ring: {
    id: "ring",
    title: "Ring Video Doorbell Pro",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop",
    desc: "1080p HD video, motion detection, two-way talk, night vision.",
    price: "₹24,900",
    category: "smart"
  },
  philips: {
    id: "philips",
    title: "Philips Hue Starter Kit",
    img: "https://tse1.mm.bing.net/th/id/OIP.pbZ2C3FzAqB5wa8KkX6K0AHaGS?pid=Api&P=0&h=180",
    desc: "Smart lighting system, 16 million colors, voice control, app control.",
    price: "₹12,999",
    category: "smart"
  },
  tp: {
    id: "tp",
    title: "TP-Link Kasa Cam",
    img: "https://tse4.mm.bing.net/th/id/OIP.AloDdoczXYSJyukPxYiWZAHaE8?pid=Api&P=0&h=180",
    desc: "Indoor security camera, 1080p, night vision, motion alerts, cloud storage.",
    price: "₹3,999",
    category: "smart"
  },

  // Storage
  ssd: {
    id: "ssd",
    title: "Samsung 980 PRO 2TB",
    img: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop",
    desc: "NVMe PCIe 4.0, 7000MB/s read speed, heat spreader, 5-year warranty.",
    price: "₹18,999",
    category: "storage"
  },
  wd: {
    id: "wd",
    title: "WD Black SN850X 1TB",
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    desc: "Gaming SSD, PCIe Gen4, up to 7300MB/s, RGB heatsink, game mode.",
    price: "₹12,499",
    category: "storage"
  },
  crucial: {
    id: "crucial",
    title: "Crucial MX4 4TB",
    img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop",
    desc: "SATA SSD, 560MB/s read, reliable storage, 5-year warranty.",
    price: "₹32,999",
    category: "storage"
  },
  seagate: {
    id: "seagate",
    title: "Seagate FireCuda 2TB",
    img: "https://tse1.mm.bing.net/th/id/OIP.oZAXFfl2NOq52eMAW2R02AHaEX?pid=Api&P=0&h=180",
    desc: "Hybrid drive, SSD performance, HDD capacity, gaming optimized.",
    price: "₹8,999",
    category: "storage"
  },
  sandisk: {
    id: "sandisk",
    title: "SanDisk Extreme Pro 1TB",
    img: "https://tse1.mm.bing.net/th/id/OIP.33GJfpxiCt4u6sLZX7fyDwHaFM?pid=Api&P=0&h=180",
    desc: "Portable SSD, 2000MB/s, rugged design, password protection.",
    price: "₹14,999",
    category: "storage"
  },
  kingston: {
    id: "kingston",
    title: "Kingston NV2 500GB",
    img: "https://tse4.mm.bing.net/th/id/OIP.Wg3US03lPfzWp9ms4uep_wHaFj?pid=Api&P=0&h=180",
    desc: "Budget NVMe SSD, PCIe 4.0, 3500MB/s read, reliable performance.",
    price: "₹3,499",
    category: "storage"
  },

  // Smartwatches
  applewatch: {
    id: "applewatch",
    title: "Apple Watch Series 9",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop",
    desc: "S9 chip, Always-On Retina display, health monitoring, GPS, cellular option.",
    price: "₹41,900",
    category: "watch"
  },
  galaxy: {
    id: "galaxy",
    title: "Samsung Galaxy Watch 6",
    img: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400&h=300&fit=crop",
    desc: "Wear OS, health tracking, 40mm display, sleep monitoring, water resistant.",
    price: "₹29,999",
    category: "watch"
  },
  garmin: {
    id: "garmin",
    title: "Garmin Forerunner 965",
    img: "https://static.runnea.com/images/202303/garmin-forerunner-965-2-800x800x80.jpg?1",
    desc: "GPS running watch, AMOLED display, training metrics, 23-day battery.",
    price: "₹59,990",
    category: "watch"
  },
  fitbit: {
    id: "fitbit",
    title: "Fitbit Versa 4",
    img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    desc: "Fitness tracker, built-in GPS, 6+ day battery, health insights, Alexa.",
    price: "₹22,999",
    category: "watch"
  },
  amazfit: {
    id: "amazfit",
    title: "Amazfit GTR 4",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    desc: "1.43 AMOLED, 14-day battery, 150+ sports modes, health monitoring.",
    price: "₹12,999",
    category: "watch"
  },
  fossil: {
    id: "fossil",
    title: "Fossil Gen 6",
    img: "https://tse4.mm.bing.net/th/id/OIP.hZGyjmgu_bvb0BGxCnf3QAHaIz?pid=Api&P=0&h=180",
    desc: "Wear OS, Snapdragon 4100+, heart rate tracking, customizable dials.",
    price: "₹24,995",
    category: "watch"
  },

  // Earbuds
  airpodspro: {
    id: "airpodspro",
    title: "Apple AirPods Pro 2",
    img: "https://i0.wp.com/www.ear-fidelity.com/wp-content/uploads/2022/10/P1054788s-1-scaled.jpg?resize=1290%2C860&ssl=1",
    desc: "H2 chip, adaptive transparency, personalized spatial audio, MagSafe charging.",
    price: "₹24,900",
    category: "earbuds"
  },
  galaxybuds: {
    id: "galaxybuds",
    title: "Samsung Galaxy Buds2 Pro",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    desc: "360 Audio, ANC, seamless switching, IPX7 water resistant, 8hr battery.",
    price: "₹17,999",
    category: "earbuds"
  },
  sonybuds: {
    id: "sonybuds",
    title: "Sony WF-1000XM4",
    img: "https://tse3.mm.bing.net/th/id/OIP.pCy7GKMmgCOIjoD5jhO82wHaEK?pid=Api&P=0&h=180",
    desc: "Industry-leading noise canceling, LDAC codec, 8hr + 16hr case battery.",
    price: "₹19,990",
    category: "earbuds"
  },
  jabra: {
    id: "jabra",
    title: "Jabra Elite 85t",
    img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
    desc: "Advanced ANC, multipoint Bluetooth, customizable sound, 5.5hr battery.",
    price: "₹15,999",
    category: "earbuds"
  },
  oneplus: {
    id: "oneplus",
    title: "OnePlus Buds Pro 2",
    img: "https://tse4.mm.bing.net/th/id/OIP.K3SidWXxGZ-QdGIGG-xy7gHaE7?pid=Api&P=0&h=180",
    desc: "Spatial audio, smart ANC, 39hr total battery, fast charging, IP55 rated.",
    price: "₹11,999",
    category: "earbuds"
  },
  nothing: {
    id: "nothing",
    title: "Nothing Ear (2)",
    img: "https://tse3.mm.bing.net/th/id/OIP.Us-quXJhHh51d5MpmbCMAwHaFC?pid=Api&P=0&h=180",
    desc: "Transparent design, Hi-Res audio, ANC, personalized sound profile.",
    price: "₹9,999",
    category: "earbuds"
  }
};

async function populateDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Cleared existing products\n');

    // Insert all products
    console.log('📦 Inserting products...');
    const productArray = Object.values(products);
    await Product.insertMany(productArray);
    console.log(`✅ Successfully inserted ${productArray.length} products!\n`);

    // Display summary
    const categories = [...new Set(productArray.map(p => p.category))];
    console.log('📊 Summary:');
    for (const category of categories) {
      const count = productArray.filter(p => p.category === category).length;
      console.log(`   ${category}: ${count} products`);
    }

    console.log('\n🎉 Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateDatabase();
