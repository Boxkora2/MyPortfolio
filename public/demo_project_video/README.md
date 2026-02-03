# Demo Project Videos

Place your project demo videos and thumbnails in this folder.

## Required Files

For each project, you need:
- A video file (e.g., `project1.mp4`, `project2.mp4`)
- A thumbnail image (e.g., `project1-thumb.jpg`, `project2-thumb.jpg`)

## Supported Formats

### Videos:
- `.mp4` (recommended)
- `.webm`
- `.ogg`

### Thumbnails:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Example Structure:
```
demo_project_video/
├── project1.mp4
├── project1-thumb.jpg
├── project2.mp4
└── project2-thumb.jpg
```

## How to Update

After adding your videos, update the project data in:
`src/components/FeaturedSection.tsx`

Update the `projects` array with your actual:
- Project titles
- Project URLs
- Video paths
- Thumbnail paths
- Descriptions

Also update:
- GitHub URL (line ~54)
- Facebook URL (line ~64)
