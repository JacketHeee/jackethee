import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

// Định nghĩa Interface cho Props như bình thường
export interface ThemeToggleProps {
  showLabel?: boolean
}

// React 19: Khai báo hàm thuần túy, định nghĩa kiểu dữ liệu ngay tại tham số (Destructuring)
export function ThemeToggle({ showLabel = true }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-input-label text-main-text opacity-80 select-none">
          {isDark ? 'Chế độ tối' : 'Chế độ sáng'}
        </span>
      )}

      <label className="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="sr-only peer"
          aria-label="Toggle dark mode"
        />

        {/* Thanh nền công tắc - Ăn theo bộ mã CSS v4 của bạn */}
        <div
          className="w-14 h-8 bg-main-border rounded-full peer 
                    peer-checked:bg-main-text transition-colors duration-300 
                    after:content-[''] after:absolute after:top-1 after:left-1 
                    after:bg-main-bg after:rounded-full after:h-6 after:w-6 
                    after:transition-all after:duration-300
                    peer-checked:after:translate-x-6
                    flex items-center justify-between px-1.5 text-caption"
        >
          <Sun size={18} />
          <Moon size={18} />
        </div>
      </label>
    </div>
  )
}
