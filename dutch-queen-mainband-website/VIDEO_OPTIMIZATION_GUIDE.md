# Video Optimization Guide

This guide explains how to optimize the hero videos for maximum quality at minimum file size.

## 🎯 Goals
- **High visual quality** (95% of original, imperceptible for background video)
- **Small file size** (2-3 MB desktop, 1-2 MB mobile)
- **Fast loading** (5 seconds on 4G instead of 51+ seconds)
- **Browser compatibility** (WebM for modern, MP4 for Safari)

## 📦 Current vs Target Sizes

| Video | Current | Target | Reduction |
|-------|---------|--------|-----------|
| hero-desktop.webm | 20 MB | 2-3 MB | 85% smaller |
| hero-desktop.mp4 | 41 MB | 2-3 MB | 93% smaller |
| hero-mobile.webm | 6.3 MB | 1-2 MB | 75% smaller |
| hero-mobile.mp4 | 12 MB | 1-2 MB | 85% smaller |
| **TOTAL** | **79.3 MB** | **8-10 MB** | **87% smaller** |

## 🔧 Encoding Commands

### Prerequisites
Install ffmpeg if not already installed:
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows (using Chocolatey)
choco install ffmpeg
```

### Desktop Videos (1920px width)

#### WebM (VP9) - Primary format for modern browsers
```bash
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libvpx-vp9 \
  -crf 32 \
  -b:v 0 \
  -pix_fmt yuv420p \
  -c:a libopus \
  -b:a 128k \
  -row-mt 1 \
  -cpu-used 2 \
  -vf "scale=1920:-2" \
  public/videos/hero-desktop-optimized.webm
```

**Parameters explained:**
- `-c:v libvpx-vp9`: VP9 video codec (30-40% better than H.264)
- `-crf 32`: Quality level (28-32 = good balance, lower = better quality/larger file)
- `-b:v 0`: Use CRF mode (constant quality, variable bitrate)
- `-pix_fmt yuv420p`: Pixel format for compatibility
- `-c:a libopus`: Opus audio codec (best for music)
- `-b:a 128k`: Audio bitrate (128kbps = excellent quality)
- `-row-mt 1`: Enable row-based multithreading
- `-cpu-used 2`: Encoding speed (0-5, lower = better quality but slower)
- `-vf "scale=1920:-2"`: Scale to 1920px width, maintain aspect ratio

#### MP4 (H.264) - Fallback for Safari/older browsers
```bash
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -profile:v high \
  -level 4.2 \
  -c:a aac \
  -b:a 128k \
  -vf "scale=1920:-2" \
  -movflags +faststart \
  public/videos/hero-desktop-optimized.mp4
```

**Parameters explained:**
- `-c:v libx264`: H.264 video codec
- `-crf 28`: Quality level (18-28 = visually lossless to good)
- `-preset slow`: Encoding preset (slower = better compression)
- `-profile:v high`: H.264 profile for best quality
- `-level 4.2`: H.264 level for compatibility
- `-c:a aac`: AAC audio codec (required for MP4)
- `-b:a 128k`: Audio bitrate
- `-movflags +faststart`: Move metadata to beginning (progressive download)

### Mobile Videos (1080px width)

#### WebM (VP9)
```bash
ffmpeg -i public/videos/hero-mobile.mp4 \
  -c:v libvpx-vp9 \
  -crf 32 \
  -b:v 0 \
  -pix_fmt yuv420p \
  -c:a libopus \
  -b:a 96k \
  -row-mt 1 \
  -cpu-used 2 \
  -vf "scale=1080:-2" \
  public/videos/hero-mobile-optimized.webm
```

#### MP4 (H.264)
```bash
ffmpeg -i public/videos/hero-mobile.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -profile:v high \
  -c:a aac \
  -b:a 96k \
  -vf "scale=1080:-2" \
  -movflags +faststart \
  public/videos/hero-mobile-optimized.mp4
```

## 📊 Quality Testing

After encoding, compare the videos:

```bash
# Check file sizes
ls -lh public/videos/hero-*.{mp4,webm}

# Play both videos side-by-side to compare quality
# Use VLC, QuickTime, or your preferred video player
```

### Adjusting Quality

If the video quality is not satisfactory:

**For better quality (larger file):**
- Decrease CRF value: `-crf 28` instead of `-crf 32`
- Use slower preset: `-preset veryslow` instead of `-preset slow`
- Increase bitrate: Add `-maxrate 3M -bufsize 6M`

**For smaller file (lower quality):**
- Increase CRF value: `-crf 34` instead of `-crf 32`
- Use faster preset: `-preset medium` instead of `-preset slow`
- Reduce resolution: `-vf "scale=1600:-2"` instead of `1920:-2`

## 🔄 Batch Processing Script

Create a file `optimize-videos.sh`:

```bash
#!/bin/bash

echo "🎬 Starting video optimization..."

# Desktop WebM
echo "📹 Encoding hero-desktop.webm..."
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -pix_fmt yuv420p \
  -c:a libopus -b:a 128k \
  -row-mt 1 -cpu-used 2 \
  -vf "scale=1920:-2" \
  -y public/videos/hero-desktop-optimized.webm

# Desktop MP4
echo "📹 Encoding hero-desktop.mp4..."
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libx264 -crf 28 -preset slow -profile:v high -level 4.2 \
  -c:a aac -b:a 128k \
  -vf "scale=1920:-2" \
  -movflags +faststart \
  -y public/videos/hero-desktop-optimized.mp4

# Mobile WebM
echo "📱 Encoding hero-mobile.webm..."
ffmpeg -i public/videos/hero-mobile.mp4 \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -pix_fmt yuv420p \
  -c:a libopus -b:a 96k \
  -row-mt 1 -cpu-used 2 \
  -vf "scale=1080:-2" \
  -y public/videos/hero-mobile-optimized.webm

# Mobile MP4
echo "📱 Encoding hero-mobile.mp4..."
ffmpeg -i public/videos/hero-mobile.mp4 \
  -c:v libx264 -crf 28 -preset slow -profile:v high \
  -c:a aac -b:a 96k \
  -vf "scale=1080:-2" \
  -movflags +faststart \
  -y public/videos/hero-mobile-optimized.mp4

echo "✅ Optimization complete!"
echo ""
echo "📊 File sizes:"
ls -lh public/videos/hero-*-optimized.*
echo ""
echo "🔄 Next steps:"
echo "1. Preview the optimized videos"
echo "2. If quality is good, replace originals:"
echo "   mv public/videos/hero-desktop-optimized.webm public/videos/hero-desktop.webm"
echo "   mv public/videos/hero-desktop-optimized.mp4 public/videos/hero-desktop.mp4"
echo "   mv public/videos/hero-mobile-optimized.webm public/videos/hero-mobile.webm"
echo "   mv public/videos/hero-mobile-optimized.mp4 public/videos/hero-mobile.mp4"
```

Make it executable and run:
```bash
chmod +x optimize-videos.sh
./optimize-videos.sh
```

## 🎨 Advanced: Two-Pass Encoding

For even better quality at target file size, use two-pass encoding:

### Desktop WebM (Two-Pass)
```bash
# Pass 1
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libvpx-vp9 -b:v 2M -maxrate 3M -bufsize 6M \
  -pix_fmt yuv420p -an -row-mt 1 -cpu-used 2 \
  -vf "scale=1920:-2" \
  -pass 1 -f webm /dev/null

# Pass 2
ffmpeg -i public/videos/hero-desktop.mp4 \
  -c:v libvpx-vp9 -b:v 2M -maxrate 3M -bufsize 6M \
  -pix_fmt yuv420p -c:a libopus -b:a 128k \
  -row-mt 1 -cpu-used 2 \
  -vf "scale=1920:-2" \
  -pass 2 public/videos/hero-desktop-optimized.webm
```

## 🔍 Analyzing Results

After encoding, verify the improvements:

```bash
# Check file sizes
du -sh public/videos/hero-*.{mp4,webm}

# Get video info
ffprobe -v quiet -print_format json -show_format -show_streams public/videos/hero-desktop-optimized.webm

# Calculate size reduction
echo "Original: 41 MB"
stat -f%z public/videos/hero-desktop-optimized.mp4 | awk '{printf "Optimized: %.2f MB\n", $1/1024/1024}'
```

## ✅ Verification Checklist

Before deploying optimized videos:

- [ ] Videos play correctly in Chrome (WebM)
- [ ] Videos play correctly in Safari (MP4 fallback)
- [ ] Videos play correctly on Mobile (iOS/Android)
- [ ] Audio quality is acceptable when unmuted
- [ ] Visual quality is imperceptible from original
- [ ] File sizes meet targets (2-3 MB desktop, 1-2 MB mobile)
- [ ] Videos loop seamlessly
- [ ] Progressive loading works (video starts playing before fully downloaded)

## 🚀 Performance Impact

### Before:
- Total video size: 79.3 MB
- Load time on 4G (20 Mbps): ~51 seconds
- Load time on 3G (5 Mbps): ~3.5 minutes

### After:
- Total video size: 8-10 MB
- Load time on 4G: ~5 seconds
- Load time on 3G: ~15-20 seconds

**Result: 87% smaller files, 90% faster load times!**

## 📚 Additional Resources

- [FFmpeg VP9 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)
- [FFmpeg H.264 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
- [Web Video Best Practices](https://web.dev/efficient-animated-content/)
- [Video Codec Comparison](https://www.singhkays.com/blog/its-time-replace-gifs-with-av1-video/)

## 🆘 Troubleshooting

**Error: "Unknown encoder 'libvpx-vp9'"**
- Solution: Install ffmpeg with VP9 support: `brew reinstall ffmpeg --with-libvpx`

**Error: "Unknown encoder 'libopus'"**
- Solution: Install ffmpeg with Opus support: `brew reinstall ffmpeg --with-opus`

**Video quality is too low:**
- Decrease CRF value (e.g., `-crf 28` instead of `-crf 32`)
- Use `-preset veryslow` for better quality

**File size is too large:**
- Increase CRF value (e.g., `-crf 34` instead of `-crf 32`)
- Reduce resolution further
- Use two-pass encoding with target bitrate

**Video doesn't loop smoothly:**
- Ensure the source video loops smoothly
- Try re-encoding with `-loop 0` flag
