import numpy as np
from PIL import Image
import xml.etree.ElementTree as ET

def generate_svg(png_path, svg_path):
    img = Image.open(png_path).convert('RGBA')
    orig_w, orig_h = img.size
    
    # Downsample slightly for fast processing (e.g. max dimension 250px)
    scale = 0.5
    proc_w = int(orig_w * scale)
    proc_h = int(orig_h * scale)
    
    small_img = img.resize((proc_w, proc_h), Image.Resampling.BILINEAR)
    
    # Quantize to 16 colors
    rgb_img = small_img.convert('RGB')
    q_img = rgb_img.quantize(colors=16)
    palette = q_img.getpalette()
    q_data = np.array(q_img)
    alpha = np.array(small_img)[:, :, 3]
    
    svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': f'0 0 {orig_w} {orig_h}',
        'width': str(orig_w),
        'height': str(orig_h)
    })
    
    # Outer group with scale transformation back to original size
    g = ET.SubElement(svg, 'g', {'transform': f'scale({1/scale:.2f})'})
    
    # Iterate through quantized colors
    for idx in range(16):
        r = palette[idx*3]
        g_c = palette[idx*3+1]
        b = palette[idx*3+2]
        
        # Color mask
        mask = (q_data == idx) & (alpha > 40)
        if not np.any(mask):
            continue
            
        hex_color = f'#{r:02x}{g_c:02x}{b:02x}'
        
        # Merge horizontal runs into rects for clean SVG
        path_segments = []
        for y in range(proc_h):
            x = 0
            while x < proc_w:
                if mask[y, x]:
                    x_start = x
                    while x < proc_w and mask[y, x]:
                        x += 1
                    x_end = x
                    path_segments.append(f"M {x_start} {y} h {x_end - x_start} v 1 h -{x_end - x_start} Z")
                else:
                    x += 1
                    
        if path_segments:
            d_combined = " ".join(path_segments)
            ET.SubElement(g, 'path', {
                'd': d_combined,
                'fill': hex_color,
                'stroke': hex_color,
                'stroke-width': '0.2'
            })
            
    tree = ET.ElementTree(svg)
    ET.indent(tree, space="  ")
    tree.write(svg_path, encoding='utf-8', xml_declaration=True)
    print(f"SVG created successfully at {svg_path} (Size: {orig_w}x{orig_h})")

if __name__ == '__main__':
    generate_svg(
        '/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/logo_gasing 1.png',
        '/Users/yohanessurya/Documents/Development/Gasing-obs/Gasing/Excalidraw/logo_gasing.svg'
    )
