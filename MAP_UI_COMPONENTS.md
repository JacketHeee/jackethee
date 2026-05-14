# 🗺️ MapBox Components - UI Layer

## 📁 Struktur File

```
src/components/atomic/organisms/Map/MapBox/
├── MapBox.tsx                 # Main map component
├── MapControlsPanel.tsx       # Left panel với tất cả controls
├── MarkerPopup.tsx           # Popup khi click marker
├── MeasurementPanel.tsx      # Panel cho công cụ đo đạc
├── ExportPanel.tsx           # Panel để export map
├── constants.ts              # Constants (styles, modes, units)
└── index.ts                  # Exports
```

---

## 🎨 UI Components

### 1. **MapControlsPanel** 📱

Vị trí: **Top-left của map**

**Tính năng:**

- 🔍 **Search Box** - Tìm kiếm địa điểm
- 🎨 **Map Style Selector** - Chọn kiểu bản đồ (5 options)
- ✏️ **Drawing Tools Menu** - Chế độ vẽ (Point, Line, Polygon, Circle)
- 📐 **Measurement Tool** - Bật công cụ đo đạc
- 💾 **Export Button** - Xuất bản đồ
- ⚙️ **Layer Controls**
  - 🎯 Clustering toggle
  - 🔥 Heatmap toggle

### 2. **MarkerPopup** 📍

Vị trí: **Trên marker khi được click**

**Tính năng:**

- Hiển thị tiêu đề marker
- Hiển thị mô tả
- Nút Edit (✏️)
- Nút Delete (🗑️)

### 3. **MeasurementPanel** 📐

Vị trí: **Bottom-left của map** (khi active)

**Tính năng:**

- Chọn đơn vị (km, miles, meters, feet)
- Hướng dẫn sử dụng
- Danh sách phép đo
- Nút làm mới (🔄)
- Nút lưu (💾)

### 4. **ExportPanel** 💾

Vị trí: **Bottom-right của map** (khi active)

**Tính năng:**

- Chọn định dạng (PNG, JPG, SVG, GeoJSON)
- Slider chất lượng (10-100%)
- Checkbox options:
  - ✅ Bao gồm Markers
  - ✅ Bao gồm Controls
  - ☐ Bao gồm Legend
- Nút tải xuống (⬇️)

---

## 🎛️ Map Styles

```javascript
MAP_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v12', // 🛣️ Streets
  outdoors: 'mapbox://styles/mapbox/outdoors-v12', // 🏞️ Outdoors
  light: 'mapbox://styles/mapbox/light-v11', // ☀️ Light
  dark: 'mapbox://styles/mapbox/dark-v11', // 🌙 Dark
  satellite: 'mapbox://styles/mapbox/satellite-v9', // 🛰️ Satellite
}
```

---

## 🖌️ Drawing Modes

```javascript
DRAWING_MODES = {
  NONE: 'none', // Không vẽ
  POINT: 'point', // 📍 Điểm
  LINE: 'line', // 📏 Đường
  POLYGON: 'polygon', // 🔷 Đa giác
  CIRCLE: 'circle', // ⭕ Tròn
}
```

---

## 📏 Measurement Units

```javascript
MEASUREMENT_UNITS = {
  KM: 'km', // Kilômét
  MILES: 'miles', // Dặm
  METERS: 'm', // Mét
  FEET: 'ft', // Feet
}
```

---

## 🎯 State Management

MapBox component quản lý các state:

```typescript
const [currentStyle, setCurrentStyle] = useState(MAP_STYLES.streets.url)
const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
const [showMeasurement, setShowMeasurement] = useState(false)
const [showExport, setShowExport] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
const [drawingMode, setDrawingMode] = useState('none')
```

---

## 💾 Props Interface

```typescript
interface MapBoxProps {
  latitude?: number // Vĩ độ ban đầu
  longitude?: number // Kinh độ ban đầu
  zoom?: number // Mức zoom ban đầu
  onMapLoad?: (map: any) => void
  markers?: Array<{
    id: string
    latitude: number
    longitude: number
    title?: string
    description?: string // Mới thêm
  }>
}
```

---

## 🔄 User Interactions

### Marker Interactions

- **Click marker** → Bật Popup
- **Click marker lại** → Tắt Popup
- **Edit button** → Chỉnh sửa marker (logic cần thêm)
- **Delete button** → Xóa marker (logic cần thêm)

### Search

- **Nhập search query** → Filter markers theo tên
- **Hiển thị kết quả** → Indicator ở bottom-right

### Drawing

- **Chọn drawing mode** → Indicator ở top-right
- **Click map** → Draw shape (logic cần thêm)
- **Hoàn thành shape** → Save shape (logic cần thêm)

### Measurement

- **Click "Đo Đạc"** → Bật panel
- **Chọn unit** → Đổi đơn vị
- **Click map** → Thêm point đo
- **Hoàn thành** → Tính toán khoảng cách/diện tích (logic cần thêm)

### Export

- **Click "Xuất Bản Đồ"** → Bật panel
- **Chọn format & options** → Config export
- **Click "Tải xuống"** → Export map (logic cần thêm)

---

## 🎨 Styling

Tất cả component sử dụng **Tailwind CSS**:

- Không có CSS files
- Responsive design tự động
- Dark/Light mode ready
- Shadow & gradient effects

---

## 🚀 Tính Năng Ready for Implementation

| Feature       | UI Status | Logic Status |
| ------------- | --------- | ------------ |
| Search        | ✅ Done   | ⏳ Pending   |
| Map Style     | ✅ Done   | ✅ Done      |
| Drawing Tools | ✅ Done   | ⏳ Pending   |
| Markers       | ✅ Done   | ✅ Partial   |
| Popup         | ✅ Done   | ⏳ Pending   |
| Measurement   | ✅ Done   | ⏳ Pending   |
| Export        | ✅ Done   | ⏳ Pending   |
| Clustering    | ✅ UI     | ⏳ Pending   |
| Heatmap       | ✅ UI     | ⏳ Pending   |

---

## 📝 Next Steps

1. **Search Logic** - Integrate geocoding API
2. **Drawing Tools** - Add draw/edit functionality
3. **Measurement** - Implement distance/area calculation
4. **Export** - Add image/geojson export
5. **Clustering** - Implement marker clustering
6. **Heatmap** - Add heatmap visualization
7. **Popup Actions** - Implement Edit/Delete markers
8. **Geolocation** - Filter markers by current location

---

## 🔗 References

- Components Location: `src/components/atomic/organisms/Map/MapBox/`
- Constants File: `constants.ts`
- Main Wrapper: `MapPage.tsx`
- Documentation: `MAP_FEATURES_DOCUMENTATION.md`
