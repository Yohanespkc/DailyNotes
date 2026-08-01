import numpy as np
from PIL import Image
import xml.etree.ElementTree as ET

def trace_contours(img_path, svg_path):
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    data = np.array(img)
    
    # Extract alpha mask
    alpha = data[:, :, 3]
    rgb = data[:, :, :3]
    
    # We want to quantize colors into key layers:
    # 1. Red letters & swoosh
    # 2. Green gasing top
    # 3. White/cream outlines & highlights
    # 4. Dark grey 3D extrusions & text
    # 5. Black text "GAMPANG, ASYIK, MENYENANGKAN"
    
    # Let's do k-means or color quantization on non-transparent pixels
    flat_rgb = rgb.reshape(-1, 3)
    flat_alpha = alpha.reshape(-1)
    
    visible_pixels = flat_rgb[flat_alpha > 50]
    
    # Simple color quantization using PIL
    # Reduce palette to 16 colors
    quantized_img = img.quantize(colors=24, method=Image.Quantization.MEDIANCUT)
    palette = quantized_img.getpalette() # [r,g,b, r,g,b...]
    q_data = np.array(quantized_img)
    
    # Helper to generate SVG path from binary mask using simple boundary tracing
    def mask_to_svg_paths(mask, min_area=10):
        # Simple RLE / box decomposition or grid quad tracing to generate clean vector paths
        visited = np.zeros_like(mask, dtype=bool)
        paths = []
        
        # Grid quad / contour tracing
        h, w = mask.shape
        # For simplicity and high precision in Excalidraw, we can generate polygonal paths
        # using a boundary follow algorithm
        
        # Padding mask to handle edges
        padded = np.pad(mask, 1, mode='constant', constant_values=False)
        
        # Find all boundary segments
        # Horizontal edges: padded[y, x] != padded[y+1, x]
        # Vertical edges: padded[y, x] != padded[y, x+1]
        
        # Let's do a fast boundary tracing algorithm
        from collections import defaultdict
        
        # Moore-Neighbor tracing for outer & inner contours
        def get_contours(binary_map):
            contours = []
            H, W = binary_map.shape
            visited_edges = set()
            
            # 8 directions
            dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
            
            for r in range(H):
                for c in range(W):
                    if binary_map[r, c] and not visited[r, c]:
                        # Check if boundary
                        is_bg_neighbor = False
                        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                            nr, nc = r+dr, c+dc
                            if nr < 0 or nr >= H or nc < 0 or nc >= W or not binary_map[nr, nc]:
                                is_bg_neighbor = True
                                break
                        if not is_bg_neighbor:
                            continue
                        
                        # Trace boundary
                        curr_r, curr_c = r, c
                        contour = []
                        start = (r, c)
                        
                        # Simple directional tracing
                        curr = (r, c)
                        contour.append(curr)
                        visited[r, c] = True
                        
                        # Find initial search dir
                        d_idx = 0
                        max_steps = H * W
                        steps = 0
                        
                        while steps < max_steps:
                            steps += 1
                            found_next = False
                            for i in range(8):
                                check_idx = (d_idx + i) % 8
                                dr, dc = dirs[check_idx]
                                nr, nc = curr[0] + dr, curr[1] + dc
                                if 0 <= nr < H and 0 <= nc < W and binary_map[nr, nc]:
                                    contour.append((nr, nc))
                                    visited[nr, nc] = True
                                    curr = (nr, nc)
                                    d_idx = (check_idx + 6) % 8 # Turn back 90 deg
                                    found_next = True
                                    break
                            if not found_next or curr == start:
                                break
                        
                        if len(contour) >= 4:
                            contours.append(contour)
            return contours
        
        return get_contours(mask)

    # Build SVG XML
    svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': f'0 0 {width} {height}',
        'width': str(width),
        'height': str(height)
    })
    
    # Background / Drop shadows are lower indices
    # Sort palette colors by brightness / alpha so background is rendered first
    color_indices = range(24)
    
    for idx in color_indices:
        r_val = palette[idx*3]
        g_val = palette[idx*3+1]
        b_val = palette[idx*3+2]
        
        # Check color mask
        color_mask = (q_data == idx) & (alpha > 50)
        if not np.any(color_mask):
            continue
            
        hex_color = f'#{r_val:02x}{g_val:02x}{b_val:02x}'
        
        # Convert mask to simplified vector polygons
        # We use grid rectangles aggregation or contour simplification for speed & clean vector output
        # Quad tree / rect aggregation:
        boxes = []
        m = color_mask.copy()
        
        # Aggregate horizontal runs
        for y in range(height):
            x = 0
            while x < width:
                if m[y, x]:
                    x_start = x
                    while x < width and m[y, x]:
                        x += 1
                    x_end = x
                    # Add rect (x_start, y, x_end - x_start, 1)
                    d_str = f'M {x_start} {y} h {x_end - x_start} v 1 h -{x_end - x_start} Z'
                    ET.SubElement(svg, 'path', {
                        'd': d_str,
                        'fill': hex_color,
                        'stroke': hex_color,
                        'stroke-width': '0.5'
                    })
                else:
                    x += 1
                    
    tree = ET.ElementTree(svg)
    ET.indent(tree, space="  ")
    tree.write(svg_path, encoding='utf-8', xml_declaration=True)
    print("SVG generated successfully at:", svg_path)

if __name__ == '__main__':
    trace_contours('/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/logo_gasing 1.png', '/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/Excalidraw/logo_gasing.svg')
