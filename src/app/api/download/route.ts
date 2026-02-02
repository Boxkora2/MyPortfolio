import { NextRequest, NextResponse } from "next/server";
import youtubeDl from "youtube-dl-exec";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const execAsync = promisify(exec);

export const maxDuration = 300; // 5 minutes for large downloads
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

    const { url, formatId, quality, isAudio } = await request.json();

    if (!url || !formatId) {
      return NextResponse.json({ error: "URL and format are required" }, { status: 400 });
    }

    console.log('[Download API] Starting download for:', url, 'Format:', formatId, 'IsAudio:', isAudio);

    // Get video info first for filename
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      skipDownload: true,
      noWarnings: true,
      noPlaylist: true,
    });

    const title = info.title || "video";
    const safeTitle = title.replace(/[^a-z0-9\s-]/gi, '_').substring(0, 100);
    
    let format = formatId;
    let ext = 'mp4';
    
    if (isAudio) {
      // For audio, use best audio 
      format = 'bestaudio';
      ext = 'mp3';
    } else {
      // For video, use the exact format ID (already has video+audio combined)
      const videoFormat = info.formats?.find((f: any) => f.format_id === formatId);
      if (videoFormat) {
        ext = videoFormat.ext || 'mp4';
        format = formatId; // Use exact format ID, no merging
      }
    }

    const filename = `${safeTitle}.${ext}`;

    console.log('[Download API] Format:', format, 'Extension:', ext, 'IsAudio:', isAudio);
    console.log('[Download API] Getting direct URL...');

    // Get direct download URL with optimized flags
    let downloadUrl;
    
    try {
      if (isAudio) {
        // For audio, use bestaudio format
        downloadUrl = await ytDlp(url, {
          format: 'bestaudio',
          getUrl: true,
          noCheckCertificates: true,
          noWarnings: true,
          noPlaylist: true,
        });
      } else {
        // For video, use specified format
        downloadUrl = await ytDlp(url, {
          format: format,
          getUrl: true,
          noCheckCertificates: true,
          noWarnings: true,
          noPlaylist: true,
        });
      }

      // If downloadUrl is an array, take the first URL
      const finalUrl = Array.isArray(downloadUrl) ? downloadUrl[0] : downloadUrl;
      
      console.log('[Download API] URL obtained:', finalUrl ? 'Yes' : 'No');
      console.log('[Download API] URL length:', finalUrl?.length || 0);

      if (!finalUrl || finalUrl.length < 50) {
        throw new Error('Invalid download URL received');
      }

      if (!finalUrl || finalUrl.length < 50) {
        throw new Error('Invalid download URL received');
      }

      console.log('[Download API] Success! Returning download info for:', filename);

      return NextResponse.json({
        success: true,
        downloadUrl: finalUrl,
        filename,
        quality,
        isAudio,
      });
    } catch (urlError: any) {
      console.error('[Download API] Error getting URL:', urlError);
      throw urlError;
    }

  } catch (error: any) {
    console.error("[Download API] Error:", error);
    console.error("[Download API] Error message:", error.message);
    
    return NextResponse.json(
      { error: "Failed to generate download link. Please try again." },
      { status: 500 }
    );
  }
}
