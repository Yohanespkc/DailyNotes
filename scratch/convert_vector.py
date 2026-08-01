import numpy as np
from PIL import Image
import xml.etree.ElementTree as ET

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    dmax = 0.0
    index = 0
    end = len(points) - 1
    p1 = points[0]
    p2 = points[end]
    for i in range(1, end):
        p = points[i]
        if p1[0] == p2[0] and p1[1] == p2[1]:
            d = np.hypot(p[0] - p1[0], p[1] - p1[1])
        else:
            d = np.abs((p2[1]-p1[1])*p[0] - (p2[0]-p1[0])*p[1] + p2[0]*p1[1] - p2[1]*p1[0]) / np.hypot(p2[1]-p1[1], p2[0]-p1[0])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        rec_results1 = rdp(points[:index+1], epsilon)
        rec_results2 = rdp(points[index:], epsilon)
        return rec_results1[:-1] + rec_results2
    else:
        return [p1, p2]

def find_contours(mask):
    H, W = mask.shape
    visited = np.zeros((H, W), dtype=bool)
    contours = []
    
    # 8 directions
    dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
    
    for r in range(H):
        for c in range(W):
            if mask[r, c] and not visited[r, c]:
                # Check if it's a boundary pixel
                is_boundary = False
                for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                    nr, nc = r + dr, c + dc
                    if nr < 0 or nr >= H or nc < 0 or nc >= W or not mask[nr, nc]:
                        is_boundary = True
                        break
                if not is_boundary:
                    continue
                
                # Trace boundary loop
                curr = (c, r) # (x, y)
                contour = [curr]
                visited[r, c] = True
                
                # Directional search
                d_idx = 0
                max_steps = H * W
                steps = 0
                start = curr
                
                while steps < max_steps:
                    steps += 1
                    found = False
                    for i in range(8):
                        c_idx = (d_idx + i) % 8
                        dr, dc = dirs[c_idx]
                        nr, nc = curr[1] + dr, curr[0] + dc
                        if 0 <= nr < H and 0 <= nc < W and mask[nr, nc]:
                            next_pt = (nc, nr)
                            contour.append(next_pt)
                            visited[nr, nc] = True
                            curr = next_pt
                            d_idx = (c_idx + 6) % 8
                            found = True
                            break
                    if not found or (len(contour) > 2 and curr == start):
                        break
                
                if len(contour) >= 5:
                    contours.append(contour)
                    
    return contours

def convert_png_to_svg(png_path, svg_path):
    img = Image.open(png_path).convert('RGBA')
    W, H = img.size
    
    # Quantize colors to 16 dominant colors
    # First smooth slightly to reduce high frequency noise
    from PIL import ImageFilter
    smoothed = img.filter(ImageFilter.SMOOTH_MORE)
    
    q_img = smoothed.convert('RGB').quantize(colors=16)
    palette = q_img.getpalette()
    q_data = np.array(q_img)
    alpha = np.array(img)[:, :, 3]
    
    svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': f'0 0 {W} {H}',
        'width': str(W),
        'height': str(H)
    })
    
    path_count = 0
    
    for idx in range(12):
        r_val = palette[idx*3]
        g_val = palette[idx*3+1]
        b_val = palette[idx*3+2]
        
        # Skip pure background / transparent
        color_mask = (q_data == idx) & (alpha > 40)
        if not np.any(color_mask):
            continue
            
        hex_color = f'#{r_val:02x}{g_val:02x}{b_val:02x}'
        
        contours = find_contours(color_mask)
        
        for contour in contours:
            # Simplify polygon using RDP
            simplified = rdp(contour, epsilon=1.2)
            if len(simplified) < 3:
                continue
                
            path_data = f"M {simplified[0][0]} {simplified[0][1]}"
            for pt in simplified[1:]:
                path_data += f" L {pt[0]} {pt[1]}"
            path_data += " Z"
            
            ET.SubElement(svg, 'path', {
                'd': path_data,
                'fill': hex_color,
                'stroke': hex_color,
                'stroke-width': '0.5',
                'stroke-linejoin': 'round'
            })
            path_count += 1
            
    tree = ET.ElementTree(svg)
    ET.indent(tree, space="  ")
    tree.write(svg_path, encoding='utf-8', xml_declaration=True)
    print(f"Generated SVG with {path_count} vector paths at: {svg_path}")

if __name__ == '__main__':
    convert_png_to_svg(
        '/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/logo_gasing 1.png',
        '/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/Excalidraw/logo_gasing.svg'
    )
