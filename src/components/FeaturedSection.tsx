"use client";

import { useState, useRef } from "react";
import { FaGithub, FaInstagram, FaExternalLinkAlt, FaPhone, FaEnvelope } from "react-icons/fa";

interface Project {
  title: string;
  url: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
}

export function FeaturedSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Placeholder data - you can replace with your actual projects
  const projects: Project[] = [
    {
      title: "Coffee Store Menu",
      url: "https://cfstore.korachoco.cv/", // Replace with your project URL
      videoUrl: "/demo_project_video/project1.mp4", // Replace with your video path
      thumbnailUrl: "/demo_project_video/project1-thumb.png", // Replace with your thumbnail
      description: "Description of your first project"
    },
    {
      title: "NexLearn - On going project",
      url: "https://courses.korachoco.cv/", // Replace with your project URL
      videoUrl: "/demo_project_video/project2.mp4", // Replace with your video path
      thumbnailUrl: "/demo_project_video/project2-thumb.png", // Replace with your thumbnail
      description: "Description of your second project"
    }
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredProject(index);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => console.log("Autoplay prevented:", err));
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredProject(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="w-full bg-[var(--color-lunar-card)] border border-[var(--color-lunar-border)] rounded-2xl p-8 shadow-2xl">
      {/* Social Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 pb-8 border-b border-[var(--color-lunar-border)]">
        <a
          href="https://github.com/Boxkora2"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start justify-center gap-1 px-5 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-[var(--color-lunar-primary)] hover:bg-[var(--color-lunar-primary)]/10 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm text-[var(--color-lunar-muted)]">GitHub</span>
          </div>
          <span className="font-mono text-sm truncate w-full">@Boxkora2</span>
        </a>
        
        <a
          href="https://www.instagram.com/box_kora/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start justify-center gap-1 px-5 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FaInstagram className="text-lg text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm text-[var(--color-lunar-muted)]">Instagram</span>
          </div>
          <span className="font-mono text-sm truncate w-full">@box_kora</span>
        </a>

        <div
          className="group flex flex-col items-start justify-center gap-1 px-5 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FaPhone className="text-lg text-green-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm text-[var(--color-lunar-muted)]">Phone</span>
          </div>
          <span className="font-mono text-sm select-all cursor-text">+84 942 577 724</span>
        </div>

        <div
          className="group flex flex-col items-start justify-center gap-1 px-5 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-lg text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm text-[var(--color-lunar-muted)]">Email</span>
          </div>
          <span className="font-mono text-xs sm:text-sm select-all cursor-text break-all">vothanhphat0710@gmail.com</span>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-lunar-primary)] to-[var(--color-lunar-gold)]">
          Featured Projects
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-xl overflow-hidden hover:border-[var(--color-lunar-gold)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-lunar-gold)]/20 block"
            >
              {/* Video Container */}
              <div 
                className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Video */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={project.videoUrl}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Thumbnail */}
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} thumbnail`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    hoveredProject === index ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--color-lunar-gold)] transition-colors">
                  {project.title}
                </h4>
                <p className="text-[var(--color-lunar-muted)] text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div
                  className="inline-flex items-center gap-2 text-[var(--color-lunar-primary)] group-hover:text-[var(--color-lunar-gold)] font-medium transition-colors"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  View Project <FaExternalLinkAlt className="text-sm" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
