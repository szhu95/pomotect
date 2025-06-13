#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p assets/images/webp

# Convert each image to WebP format
cwebp -q 80 assets/images/flyer-1.jpg -o assets/images/webp/flyer-1.webp
cwebp -q 80 assets/images/flash-flyer.jpg -o assets/images/webp/flash-flyer.webp
cwebp -q 80 assets/images/cellar.jpg -o assets/images/webp/cellar.webp
cwebp -q 80 assets/images/million-goods.jpg -o assets/images/webp/million-goods.webp
cwebp -q 80 assets/images/cellar-2.jpg -o assets/images/webp/cellar-2.webp 