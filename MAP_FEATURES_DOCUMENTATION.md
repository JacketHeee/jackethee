# 🗺️ MapBox Component - Documentation

## Tổng Quan

MapBox Component là một React component tích hợp MapBox GL JS thông qua thư viện `react-map-gl`. Component hỗ trợ hiển thị bản đồ tương tác với các tính năng như markers, geolocation, navigation controls, và nhiều hơn.

---

## 📋 Tính Năng Hiện Có

### 1. **Map Controls (Điều khiển Bản đồ)**

#### 🧭 Navigation Control

- **Vị trí**: `bottom-right`
- **Tính năng**:
  - Nút zoom in/out
  - Nút rotate bản đồ
  - Nút reset về hướng mặc định (North)
- **Cách dùng**: Đã được bao gồm mặc định

#### 📍 Geolocation Control

- **Vị trí**: `bottom-right`
- **Tính năng**:
  - Cho phép người dùng xem vị trí hiện tại của họ
  - Tự động center bản đồ tới vị trí người dùng
  - Yêu cầu quyền truy cập location
- **Cách dùng**: Click icon định vị

#### 🗺️ Fullscreen Control

- **Vị trí**: `bottom-right`
- **Tính năng**:
  - Phóng to bản đồ toàn màn hình
  - Yêu cầu Fullscreen API browser hỗ trợ
- **Cách dùng**: Click icon fullscreen

#### 📏 Scale Control

- **Vị trí**: `bottom-right`
- **Tính năng**:
  - Hiển thị thang đo (km/miles)
  - Giúp ước lượng khoảng cách trên bản đồ
- **Cách dùng**: Hiển thị tự động

### 2. **Markers (Điểm Đánh Dấu)**

#### Marker Properties

```typescript
interface Marker {
  id: string // ID duy nhất cho marker
  latitude: number // Vĩ độ
  longitude: number // Kinh độ
  title?: string // Tiêu đề (tooltip)
}
```

#### Tính Năng Marker

- ✅ Hiển thị marker tại vị trí cụ thể
- ✅ Màu sắc tùy chỉnh (hiện tại: `hsl(259, 100%, 50%)` - tím)
- ✅ Tooltip hiển thị khi hover
- ✅ Drag & drop marker (có thể thêm)
- ✅ Popup thông tin (có thể thêm)

#### Cách Sử Dụng

```tsx
<MapBox
  markers={[
    {
      id: '1',
      latitude: 21.0285,
      longitude: 105.8542,
      title: 'Hà Nội',
    },
  ]}
/>
```

### 3. **Map Initialization**

#### Map Props

```typescript
interface MapBoxProps {
  latitude?: number // Vĩ độ ban đầu (default: 21.0285)
  longitude?: number // Kinh độ ban đầu (default: 105.8542)
  zoom?: number // Mức zoom ban đầu (default: 10)
  onMapLoad?: Function // Callback khi map load xong
  markers?: MarkerArray // Mảng markers
}
```

#### Map Styles (Có sẵn từ Mapbox)

- ✅ `mapbox://styles/mapbox/streets-v12` (Hiện tại)
- 🔷 `mapbox://styles/mapbox/outdoors-v12` (Ngoài trời)
- 🔷 `mapbox://styles/mapbox/light-v11` (Sáng)
- 🔷 `mapbox://styles/mapbox/dark-v11` (Tối)
- 🔷 `mapbox://styles/mapbox/satellite-v9` (Vệ tinh)

### 4. **Styling**

#### Tailwind CSS Classes

- `w-full h-full` - Full width & height
- `overflow-hidden` - Ẩn overflow
- `shadow-lg` - Box shadow

#### Responsive

- Component tự động responsive theo parent size
- Hỗ trợ mobile, tablet, desktop

---

## 🚀 Tính Năng Có Thể Thêm

### Advanced Features

#### 1. **Popup / Info Window**

```tsx
import { Popup } from 'react-map-gl/mapbox'

;<Popup
  latitude={marker.latitude}
  longitude={marker.longitude}
  onClose={handlePopupClose}
>
  <div>{marker.title}</div>
</Popup>
```

#### 2. **Layer (Lớp Bản đồ)**

```tsx
import { Layer, Source } from 'react-map-gl/mapbox'

<Source id="my-source" type="geojson" data={geojsonData}>
  <Layer id="my-layer" type="fill" paint={{...}} />
</Source>
```

#### 3. **GeoJSON Support**

- Hiển thị hình dạng phức tạp (polygon, line, point)
- Styling cho từng feature
- Interactive features

#### 4. **Drawing Tools**

- Draw polygon, line, point
- Edit existing shapes
- Delete features

#### 5. **Search / Geocoding**

- Tìm địa điểm theo tên
- Reverse geocoding (tìm tên từ toạ độ)

#### 6. **Clustering**

- Nhóm markers gần nhau khi zoom out
- Tự động expand khi zoom in
- Giảm performance impact

#### 7. **Heatmap**

- Visualize density của data points
- Tô màu dựa trên mật độ

#### 8. **Street View**

- Tích hợp Mapbox Streets
- View từ góc người đi bộ

#### 9. **Terrain**

- Hiển thị độ cao/địa hình
- 3D visualization

#### 10. **Animation**

- Smooth zoom/pan
- Animated routes
- Fly to location

#### 11. **Export**

- Export map as image
- Export data as GeoJSON
- Print map

#### 12. **Measurement**

- Đo khoảng cách
- Đo diện tích

---

## 🔧 Configuration

### Environment Variables

```bash
VITE_MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoi..." # Từ .env file
```

### MapBox Token

- Lấy từ https://account.mapbox.com/tokens/
- Free tier: 50,000 requests/tháng
- Cần add domain vào allowlist

---

## 📱 Mobile Support

- ✅ Touch gesture: Pinch to zoom, two-finger drag to rotate
- ✅ Responsive design
- ✅ Geolocation access
- ✅ Fullscreen support

---

## 🎨 Customization Examples

### Custom Marker Color

```tsx
<Marker
  latitude={21.0285}
  longitude={105.8542}
  color="hsl(200, 100%, 50%)" // Thay đổi màu
/>
```

### Custom Map Style

```tsx
<Map
  mapStyle="mapbox://styles/mapbox/dark-v11"
  {...props}
>
```

### Custom Control Position

```tsx
<NavigationControl position="top-left" />    // top-left
<NavigationControl position="top-right" />   // top-right
<NavigationControl position="bottom-left" />  // bottom-left
<NavigationControl position="bottom-right" /> // bottom-right
```

---

## 📊 Performance Tips

1. **Lazy load markers**: Chỉ load markers cần thiết
2. **Use clustering**: Nhóm markers khi có nhiều
3. **Limit layer count**: Giới hạn số lượng layers
4. **Optimize GeoJSON**: Simplify geometries
5. **Use WebGL**: Leverage hardware acceleration

---

## 🐛 Troubleshooting

| Problem                     | Solution                         |
| --------------------------- | -------------------------------- |
| Bản đồ không hiển thị       | Kiểm tra Mapbox token trong .env |
| Geolocation không hoạt động | Kiểm tra quyền truy cập location |
| Performance chậm            | Giảm số lượng markers/layers     |
| Map blur trên mobile        | Dùng `devicePixelRatio` option   |

---

## 🔗 Resources

- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/)
- [Mapbox Styles](https://docs.mapbox.com/api/maps/styles/)
- [GeoJSON Specification](https://geojson.org/)

---

## 📝 Version Info

- **react-map-gl**: 8.1.1
- **mapbox-gl**: 3.23.1
- **React**: 19.2.6
- **Tailwind CSS**: 4.3.0

---

## 🚀 Next Steps

1. Thêm Popup cho markers
2. Implement marker clustering
3. Thêm search/geocoding functionality
4. Thêm drawing tools
5. Thêm heatmap visualization
