const UserTracking = require("../Models/UserTracking");
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");
const axios = require("axios");

const trackUser = async (req) => {
  try {
    if (!req) {
      console.error("❌ Request object is missing.");
      return;
    }

    const headers = req.headers || {};
    const ip = headers["x-forwarded-for"]?.split(",")[0] || req.ip || requestIp.getClientIp(req) || "Unknown";
    const userAgentString = headers["user-agent"] || "Unknown";

    let userAgent = { browser: { name: "Unknown" }, os: { name: "Unknown" }, device: { type: "Unknown" } };
    if (userAgentString !== "Unknown") {
      const parser = new UAParser();
      parser.setUA(userAgentString);
      userAgent = parser.getResult();
    }

    const browser = userAgent.browser.name || "Unknown";
    const os = userAgent.os.name || "Unknown";
    const device = userAgent.device.type || "Unknown";
    const isBot = /bot|crawl|spider|slurp|headless/i.test(userAgentString) || userAgent.device.type === "bot";

    const userId = req.trackUserId || null; // Get userId from req
    // console.log("🟢 Tracking User:", { userId });

    // Fetch geolocation safely
    let latitude = null, longitude = null;
    try {
      const geoRes = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.GEOAPIFY_API_KEY}`);
      if (geoRes.data?.location) {
        latitude = geoRes.data.location.latitude;
        longitude = geoRes.data.location.longitude;
      }
    } catch (geoErr) {
      console.error("❌ Geolocation API Error:", geoErr.message);
    }

    // Store in database
    const trackingData = {
      userId,
      ip,
      browser,
      os,
      device,
      referrer: headers.referer || "Direct",
      language: headers["accept-language"] || "Unknown",
      isBot,
      pagesVisited: JSON.stringify([req.originalUrl]),
      latitude,
      longitude,
    };

    // console.log("🟢 Saving to Database:", trackingData);

    await UserTracking.create(trackingData);
    console.log("✅ Data saved successfully");

    // next();
  } catch (error) {
    console.error("❌ User tracking failed:", error);
    // next();
  }
};

module.exports = trackUser;
