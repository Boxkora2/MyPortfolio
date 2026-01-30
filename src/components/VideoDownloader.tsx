"use client";

import { useState } from "react";
import { FaYoutube, FaDownload, FaMusic, FaVideo, FaFile, FaSpinner } from "react-icons/fa";

type TabType = "audio" | "video" | "other";

interface VideoFormat {
  format_id: string;
  ext: string;
  quality: string;
  filesize: number | null;
  resolution?: string;
  format_note?: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string | null;
  duration: number;
  uploader: string;
  platform: string;
  videoId: string | null;
  audioFormats: VideoFormat[];
  videoFormats: VideoFormat[];
  otherFormats: VideoFormat[];
}

export function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("audio");

  const checkLink = async () => {
    setLoading(true);
    setVideoInfo(null);
    setError("");

    try {
      const response = await fetch("/api/video-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch video info");
      }

      setVideoInfo(data.data);
    } catch (err: any) {
      setError(err.message || "Oops! That link looks like it wandered off the map. Please feed me a valid link!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (formatId: string, quality: string, isAudio: boolean = false) => {
    setDownloading(formatId);
    
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, formatId, quality, isAudio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate download link");
      }

      console.log("Starting download for:", data.filename);

      // Use our proxy endpoint to download the file (avoids CORS)
      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(data.downloadUrl)}&filename=${encodeURIComponent(data.filename)}`;
      
      // Create download link that points to our proxy
      const link = document.createElement('a');
      link.href = proxyUrl;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      
      console.log("Download started for:", data.filename);
    } catch (err: any) {
      console.error("Download error:", err);
      alert(err.message || "Failed to download. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Auto";
    const mb = bytes / (1024 * 1024);
    return mb > 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
            Video Downloader
        </h1>
        <p className="text-[var(--color-lunar-muted)]">
            Download videos from YouTube, Facebook, TikTok, Instagram & more in high quality.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-xl p-2 sm:p-4 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Search or paste link here..."
                className="flex-1 bg-transparent border border-[var(--color-lunar-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--color-lunar-gold)] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && checkLink()}
            />
            <button 
                onClick={checkLink}
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? "Checking..." : "Start"}
                {!loading && <span className="text-xl">➔</span>}
            </button>
        </div>
        {(error || videoInfo) && !loading && (
             <div className="mt-2 text-center text-sm">
                {error && <span className="text-red-400 font-medium">{error}</span>}
             </div>
        )}
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="funny-loader text-6xl mb-4 animate-bounce">🦖</div>
            <p className="text-[var(--color-lunar-muted)] animate-pulse">Running to fetch your video...</p>
        </div>
      )}

      {/* Result Section */}
      {videoInfo && !loading && (
        <div className="bg-[var(--color-lunar-card)] border border-[var(--color-lunar-border)] rounded-lg overflow-hidden shadow-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Thumbnail */}
                <div className="lg:w-1/3">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-md group">
                        {videoInfo.thumbnail ? (
                            <img 
                                src={videoInfo.thumbnail} 
                                alt="Video Thumbnail" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                                <span>No Preview</span>
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaYoutube className="text-red-600 text-5xl" />
                        </div>
                    </div>
                    <div className="mt-4 text-center lg:text-left">
                        <h3 className="font-bold text-lg mb-1 line-clamp-2" title={videoInfo.title}>
                             {videoInfo.title}
                        </h3>
                        <p className="text-sm text-[var(--color-lunar-muted)]">
                          {videoInfo.uploader} • {videoInfo.platform}
                        </p>
                    </div>
                </div>

                {/* Right: Download Options */}
                <div className="lg:w-2/3">
                    {/* Tabs */}
                    <div className="flex border-b border-[var(--color-lunar-border)] mb-4">
                        <button 
                            onClick={() => setActiveTab("audio")}
                            className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
                                activeTab === "audio" 
                                ? "border-red-500 text-red-500" 
                                : "border-transparent text-[var(--color-lunar-muted)] hover:text-[var(--color-lunar-text)]"
                            }`}
                        >
                            <FaMusic /> Audio
                        </button>
                        <button 
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
                                activeTab === "video" 
                                ? "border-red-500 text-red-500" 
                                : "border-transparent text-[var(--color-lunar-muted)] hover:text-[var(--color-lunar-text)]"
                            }`}
                        >
                            <FaVideo /> Video
                        </button>
                        <button 
                            onClick={() => setActiveTab("other")}
                            className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors ${
                                activeTab === "other" 
                                ? "border-red-500 text-red-500" 
                                : "border-transparent text-[var(--color-lunar-muted)] hover:text-[var(--color-lunar-text)]"
                            }`}
                        >
                            <FaFile /> Other
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 gap-4 mb-2 text-sm font-semibold text-[var(--color-lunar-muted)] px-4">
                        <div>File type</div>
                        <div>File Size</div>
                        <div className="text-right">Action</div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {activeTab === "audio" && videoInfo.audioFormats.length > 0 && (
                            <>
                                {videoInfo.audioFormats.map((format) => (
                                    <DownloadRow
                                        key={format.format_id}
                                        fileType={`${format.ext.toUpperCase()} - ${format.quality}`}
                                        size={formatFileSize(format.filesize)}
                                        isDownloading={downloading === format.format_id}
                                        onDownload={() => handleDownload(format.format_id, format.quality, true)}
                                    />
                                ))}
                            </>
                        )}
                        {activeTab === "video" && videoInfo.videoFormats.length > 0 && (
                            <>
                                {videoInfo.videoFormats.map((format) => (
                                    <DownloadRow
                                        key={format.format_id}
                                        fileType={`${format.quality} (.${format.ext})`}
                                        size={formatFileSize(format.filesize)}
                                        isDownloading={downloading === format.format_id}
                                        onDownload={() => handleDownload(format.format_id, format.quality)}
                                    />
                                ))}
                            </>
                        )}
                         {activeTab === "other" && videoInfo.otherFormats.length > 0 && (
                            <>
                                {videoInfo.otherFormats.map((format) => (
                                    <DownloadRow
                                        key={format.format_id}
                                        fileType={`${format.ext.toUpperCase()} - ${format.quality}`}
                                        size={formatFileSize(format.filesize)}
                                        isDownloading={downloading === format.format_id}
                                        onDownload={() => handleDownload(format.format_id, format.quality)}
                                    />
                                ))}
                            </>
                        )}
                        {((activeTab === "audio" && videoInfo.audioFormats.length === 0) ||
                          (activeTab === "video" && videoInfo.videoFormats.length === 0) ||
                          (activeTab === "other" && videoInfo.otherFormats.length === 0)) && (
                            <div className="text-center py-8 text-[var(--color-lunar-muted)]">
                              No formats available for this type
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

function DownloadRow({ fileType, size, isDownloading, onDownload }: { 
  fileType: string; 
  size: string; 
  isDownloading: boolean;
  onDownload: () => void;
}) {
    return (
        <div className="grid grid-cols-3 gap-4 items-center p-4 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-md hover:border-[var(--color-lunar-gold)] transition-colors">
            <div className="font-medium">{fileType}</div>
            <div className="text-[var(--color-lunar-muted)]">{size}</div>
            <div className="text-right">
                <button 
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-2 px-4 rounded transition-colors inline-flex items-center gap-2"
                >
                    {isDownloading ? (
                        <>
                            <FaSpinner className="animate-spin" /> Loading...
                        </>
                    ) : (
                        <>
                            <FaDownload /> Download
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
