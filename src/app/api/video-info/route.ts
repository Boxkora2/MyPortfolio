import { NextRequest, NextResponse } from "next/server";
import youtubeDl from "youtube-dl-exec";
import { existsSync } from "fs";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Configure youtube-dl-exec to use system yt-dlp
const binaryPath = 'C:\\Users\\kurot\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe';
const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const binaryExists = !isProduction && existsSync(binaryPath);

const ytDlp = (url: string, options: any) => {
  if (!binaryExists) {
    throw new Error('yt-dlp binary not available in this environment');
  }
  return youtubeDl.create(binaryPath)(url, options);
};

export async function POST(request: NextRequest) {
  try {
    // Check if we're on Vercel/Production where yt-dlp isn't available
    if (isProduction || !binaryExists) {
      return NextResponse.json({
        error: "Video converter is not available on Vercel deployment. This feature requires yt-dlp binary which cannot run in serverless environments. Please run this locally or deploy to a platform that supports Docker/VPS (Railway, Render, DigitalOcean)."
      }, { status: 501 });
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|facebook\.com|fb\.watch|tiktok\.com|instagram\.com|vimeo\.com|twitter\.com|x\.com)\/.+$/;
    if (!urlRegex.test(url)) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    console.log("[API] Fetching video info for:", url);

    // Get video info using yt-dlp with optimized flags
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      skipDownload: true,
      noCheckCertificates: true,
      noWarnings: true,
      noPlaylist: true,
      flatPlaylist: true,
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0",
      ],
    });

    console.log("[API] Video info fetched successfully");

    // Extract formats for audio and video (optimized)
    const formats = info.formats || [];
    
    // Audio formats - MP3 only, use best audio
    const audioFormats = [
      {
        format_id: 'bestaudio',
        ext: 'mp3',
        quality: "Best Quality",
        filesize: null,
        format_note: "MP3 Audio",
      }
    ];

    // Video formats - Only get PROGRESSIVE formats (not HLS/DASH) with both video AND audio
    // Progressive formats have direct URLs and can be downloaded as single files
    const videoQualities = [2160, 1440, 1080, 720, 480, 360, 240, 144];
    const videoFormats: any[] = [];
    
    // Filter for progressive formats only (no streaming protocols)
    const progressiveFormats = formats.filter((f: any) => 
      f.vcodec !== "none" && 
      f.acodec !== "none" && // Must have both video and audio
      f.protocol === "https" && // Direct HTTPS download
      !f.format_note?.toLowerCase().includes("dash") && // No DASH
      !f.format_note?.toLowerCase().includes("hls") && // No HLS
      f.ext === "mp4" && // MP4 only for best compatibility
      !f.url?.includes("manifest") // No manifest URLs
    );
    
    console.log("[API] Found", progressiveFormats.length, "progressive formats");
    
    // Get formats for each quality
    for (const quality of videoQualities) {
      const format = progressiveFormats.find((f: any) => f.height === quality);
      
      if (format && videoFormats.length < 6) {
        videoFormats.push({
          format_id: format.format_id,
          ext: format.ext || 'mp4',
          resolution: `${format.height}p`,
          quality: `${format.height}p`,
          filesize: format.filesize || format.filesize_approx || null,
          format_note: format.format_note || "",
          hasAudio: true,
        });
      }
    }
    
    // If we still don't have enough, add any remaining progressive formats
    if (videoFormats.length < 3) {
      const additionalFormats = progressiveFormats
        .filter((f: any) => !videoFormats.find(vf => vf.format_id === f.format_id))
        .sort((a: any, b: any) => (b.height || 0) - (a.height || 0))
        .slice(0, 6 - videoFormats.length)
        .map((f: any) => ({
          format_id: f.format_id,
          ext: f.ext || 'mp4',
          resolution: f.height ? `${f.height}p` : "SD",
          quality: f.height ? `${f.height}p` : "SD",
          filesize: f.filesize || f.filesize_approx || null,
          format_note: f.format_note || "",
          hasAudio: true,
        }));
      
      videoFormats.push(...additionalFormats);
    }
    
    console.log("[API] Returning", videoFormats.length, "video formats");

    // Other formats (webm, 3gp, etc.) - simplified
    const otherExts = ["webm", "3gp"];
    const otherFormats = otherExts
      .map(ext => formats.find((f: any) => f.ext === ext && f.vcodec !== "none"))
      .filter(Boolean)
      .slice(0, 2)
      .map((f: any) => ({
        format_id: f.format_id,
        ext: f.ext,
        quality: f.height ? `${f.height}p` : "Auto",
        filesize: f.filesize || f.filesize_approx || null,
        format_note: f.format_note || "",
      }));

    return NextResponse.json({
      success: true,
      data: {
        title: info.title || "Unknown Title",
        thumbnail: info.thumbnail || null,
        duration: info.duration || 0,
        uploader: info.uploader || "Unknown",
        platform: info.extractor || "Unknown",
        videoId: info.id || null,
        audioFormats,
        videoFormats,
        otherFormats,
      },
    });

  } catch (error: any) {
    console.error("[API] Error fetching video info:", error);
    console.error("[API] Error message:", error.message);
    console.error("[API] Error stack:", error.stack);
    
    // Handle common errors
    if (error.message?.includes("Unsupported URL")) {
      return NextResponse.json({ error: "This platform is not supported" }, { status: 400 });
    }
    
    if (error.message?.includes("Video unavailable") || error.message?.includes("Private video")) {
      return NextResponse.json({ error: "Video is unavailable or private" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch video information. Please check the URL and try again." },
      { status: 500 }
    );
  }
}
